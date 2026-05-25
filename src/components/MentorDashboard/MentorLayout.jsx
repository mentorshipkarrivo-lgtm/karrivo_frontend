

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//     Home, CalendarCheck, Users, Clock, Star, X, Menu,
//     Headphones, ChevronRight, Plus, Trash2, Loader2, Eye, CheckCircle,
//     Calendar, Briefcase, Award, FileText, Globe, AlertCircle, Pencil,
//     MessageCircle, Video, Trophy, BadgeCheck, Target, Upload, Camera,
//     HelpCircle, User, ChevronDown, Lock, ArrowUpRight, Copy,
//     CheckSquare, Mail, Wallet, Share2, BookOpen, Wrench, Bug,
//     Settings, UserCircle,
//     TrendingUp,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorProfile/mentorprofileapi";
// import Loader from "../../global/Loader";
// import Karrivo from "../../assets/karrivoSymbol.png"
// // ── Constants ──────────────────────────────────────────────────────────────────
// const F = `"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif`;
// const MAX_MB = 5;
// const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// const NAV_ORDER = ["overview", "experience", "engagement", "mentorship", "achievements"];
// // ── Color tokens ───────────────────────────────────────────────────────────────
// const T = {
//     primary: "#0098cc",
//     btn: "#1a1a2e",
//     bg: "#ffffff",
//     surface: "#f5f7fa",
//     border: "#e2e6ec",
//     borderMed: "#cdd3dc",
//     textDark: "#111827",
//     textMid: "#4b5563",
//     textLight: "#9ca3af",
//     success: "#16a34a",
//     warning: "#d97706",
//     error: "#dc2626",
//     successBg: "#f0fdf4",
//     warningBg: "#fffbeb",
//     errorBg: "#fef2f2",
//     primaryBg: "#e8f6fc",
//     primaryBd: "#bae3f5",
//     navActive: "#2563eb",
//     navActiveBg: "#eff6ff",
// };

// // ── Helpers ────────────────────────────────────────────────────────────────────
// const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; };
// const splitCSV = (str) => (str || "").split(",").map((s) => s.trim()).filter(Boolean);
// const joinCSV = (arr) => arr.join(", ");
// const slotCount = (s, e) => {
//     const [sh, sm] = s.split(":").map(Number), [eh, em] = e.split(":").map(Number);
//     return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30);
// };

// // ── Profile completion ─────────────────────────────────────────────────────────
// const calcCompletion = (fd) => {
//     const fields = [
//         fd?.fullName, fd?.currentRole, fd?.location, fd?.whyMentor,
//         fd?.currentSkills, fd?.yearsOfExperience, fd?.hourlyRate,
//         fd?.companyName, fd?.languages?.length, fd?.guidanceAreas?.length,
//         fd?.certifications?.length, fd?.accomplishments?.length,
//         fd?.profilePhoto, fd?.linkedinUrl,
//     ];
//     return Math.round((fields.filter((v) => v && v !== "" && v !== 0).length / fields.length) * 100);
// };

// // ── Shared styles ──────────────────────────────────────────────────────────────
// const inp = (err) => ({
//     fontFamily: F, width: "100%", padding: "9px 12px", boxSizing: "border-box",
//     border: `1.5px solid ${err ? T.error : T.borderMed}`, borderRadius: 8,
//     fontSize: 13, color: T.textDark, background: T.bg, outline: "none", lineHeight: 1.6,
// });
// const lbl = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 5px", display: "block" };
// const secHead = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 5 };

// // ── Pill ───────────────────────────────────────────────────────────────────────
// const PILL_PALETTES = {
//     blue: { bg: T.primaryBg, bd: T.primaryBd, c: T.primary },
//     amber: { bg: "#fef3c7", bd: "#fcd34d", c: "#b45309" },
//     teal: { bg: "#f0fdf4", bd: "#86efac", c: "#15803d" },
//     purple: { bg: "#f5f3ff", bd: "#c4b5fd", c: "#7c3aed" },
// };
// const Pill = ({ label, onRemove, col = "blue" }) => {
//     const p = PILL_PALETTES[col] || PILL_PALETTES.blue;
//     return (
//         <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px 3px 11px", borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: "nowrap" }}>
//             {label}
//             {onRemove && <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: 0.6, display: "flex", alignItems: "center" }}>×</button>}
//         </span>
//     );
// };

// const TagRow = ({ placeholder, valKey, field, isArr, tagInputs, setTagInp, addArr, addCSV }) => (
//     <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//         <input
//             value={tagInputs[valKey]}
//             onChange={(e) => setTagInp(valKey, e.target.value)}
//             onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); isArr ? addArr(field, valKey) : addCSV(field, valKey); } }}
//             placeholder={placeholder}
//             style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: "8px 11px", border: `1.5px solid ${T.borderMed}`, borderRadius: 7, color: T.textDark, background: T.bg, outline: "none", boxSizing: "border-box" }}
//         />
//         <button type="button" onClick={() => isArr ? addArr(field, valKey) : addCSV(field, valKey)}
//             style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Add</button>
//     </div>
// );

// const FieldErr = ({ msg }) => msg ? (
//     <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: T.error }}>
//         <AlertCircle size={10} />{msg}
//     </div>
// ) : null;

// const CompletionBar = ({ pct }) => (
//     <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, background: T.surface }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//             <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px" }}>Profile Completion</span>
//             <span style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error }}>{pct}%</span>
//         </div>
//         <div style={{ height: 6, background: T.border, borderRadius: 100, overflow: "hidden" }}>
//             <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error, borderRadius: 100, transition: "width .4s ease" }} />
//         </div>
//         {pct < 100 && <p style={{ fontFamily: F, fontSize: 10, color: T.textLight, margin: "5px 0 0" }}>Complete your profile to get more bookings</p>}
//     </div>
// );


// function EditMentorProfile({ onClose, initialTab = "overview" }) {
//     const [formData, setFormData] = useState({ availability: [] });
//     const [email, setEmail] = useState("");
//     const [modalTab, setModalTab] = useState(initialTab);
//     const [modalErrors, setModalErrors] = useState({});
//     const [tagInputs, setTagInputs] = useState({ skill: "", lang: "", guid: "", cert: "", accomp: "" });
//     const [availDateFrom, setAvailDateFrom] = useState("");
//     const [availDateTo, setAvailDateTo] = useState("");
//     const [availWeekdays, setAvailWeekdays] = useState(true);
//     const [availBlockStart, setAvailBlockStart] = useState("09:00");
//     const [availBlockEnd, setAvailBlockEnd] = useState("12:00");
//     const [availTimeBlocks, setAvailTimeBlocks] = useState([]);
//     const [availErr, setAvailErr] = useState("");
//     const [photoProgress, setPhotoProgress] = useState(0);
//     const [photoStatus, setPhotoStatus] = useState("idle");
//     const [photoErrMsg, setPhotoErrMsg] = useState("");
//     const [photoPreview, setPhotoPreview] = useState("");
//     const [photoDragging, setPhotoDragging] = useState(false);
//     const photoInputRef = useRef(null);
//     const serverRef = useRef(null);


//     // Mentorship Delivery states
//     const [ltmMenteeLimit, setLtmMenteeLimit] = useState("3");
//     const [sessionsFrequency, setSessionsFrequency] = useState("");
//     const [mentorshipPitch, setMentorshipPitch] = useState("");

//     // Mentee Preference states
//     const [primaryExpertise, setPrimaryExpertise] = useState("");
//     const [secondaryExpertise, setSecondaryExpertise] = useState("");
//     const [personaFreshers, setPersonaFreshers] = useState(false);
//     const [personaExperienced, setPersonaExperienced] = useState(false);

//     // Trial Preference states
//     const [trialDuration, setTrialDuration] = useState("");
//     const [trialSessionFrequency, setTrialSessionFrequency] = useState("");
//     const [trialMenteeLimit, setTrialMenteeLimit] = useState("1");


//     const [getMentorDetails, { data, isLoading }] = useGetMentorDetailsMutation();
//     const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

//     useEffect(() => { const ud = localStorage.getItem("userData"); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
//     useEffect(() => { if (email) getMentorDetails(email); }, [email]);
//     useEffect(() => {
//         if (data?.data) {
//             serverRef.current = data.data;
//             setFormData({ ...data.data });
//             // Load mentorship data
//             setLtmMenteeLimit(data.data.ltmMenteeLimit || "3");
//             setSessionsFrequency(data.data.sessionsFrequency || "");
//             setMentorshipPitch(data.data.mentorshipPitch || "");
//             setPrimaryExpertise(data.data.primaryExpertise || "");
//             setSecondaryExpertise(data.data.secondaryExpertise || "");
//             setPersonaFreshers(data.data.personaFreshers || false);
//             setPersonaExperienced(data.data.personaExperienced || false);
//             setTrialDuration(data.data.trialDuration || "");
//             setTrialSessionFrequency(data.data.trialSessionFrequency || "");
//             setTrialMenteeLimit(data.data.trialMenteeLimit || "1");
//         }
//     }, [data]); useEffect(() => { if (formData.profilePhoto && photoStatus === "idle") setPhotoPreview(formData.profilePhoto); }, [formData.profilePhoto]);

//     const completion = calcCompletion(formData);
//     const skills = splitCSV(formData.currentSkills);
//     const langs = Array.isArray(formData.languages) ? formData.languages : [];
//     const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
//     const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
//     const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
//     const availFlat = (formData.availability || []).filter((s) => s.date).map((s) => ({ ...s, ds: new Date(s.date).toISOString().split("T")[0] })).sort((a, b) => new Date(a.ds) - new Date(b.ds));

//     const set = (f, v) => setFormData((p) => ({ ...p, [f]: v }));
//     const setTagInp = (k, v) => setTagInputs((p) => ({ ...p, [k]: v }));
//     const addCSV = (field, key) => { const v = tagInputs[key].trim(); if (!v) return; const arr = splitCSV(formData[field]); if (!arr.includes(v)) set(field, joinCSV([...arr, v])); setTagInp(key, ""); };
//     const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter((s) => s !== val)));
//     const addArr = (field, key) => { const v = tagInputs[key].trim(); if (!v) return; const arr = Array.isArray(formData[field]) ? formData[field] : []; if (!arr.includes(v)) set(field, [...arr, v]); setTagInp(key, ""); };
//     const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter((x) => x !== val));
//     const tagRowShared = { tagInputs, setTagInp, addArr, addCSV };

//     const handleClose = () => { if (serverRef.current) setFormData({ ...serverRef.current }); onClose?.(); };
//     const handleSave = async (shouldClose = true) => {
//         try {
//             const enriched = {
//                 ...formData,


//                 ltmMenteeLimit,
//                 sessionsFrequency,
//                 mentorshipPitch,
//                 primaryExpertise,
//                 secondaryExpertise,
//                 personaFreshers,
//                 personaExperienced,
//                 trialDuration,
//                 trialSessionFrequency,
//                 trialMenteeLimit,
//                 availability: (formData.availability || []).map((slot) => { if (slot.day) return slot; const ds = new Date(slot.date).toISOString().split("T")[0]; return { ...slot, day: new Date(ds + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" }) }; })
//             };
//             await updateMentorDetails({ email, ...enriched }).unwrap();
//             if (shouldClose) onClose?.();
//             getMentorDetails(email);
//         } catch { }
//     };

//     useEffect(() => {
//         if (initialTab) {
//             setModalTab(initialTab);
//             setModalErrors({});
//         }
//     }, [initialTab]);

//     const validate = (tab) => {
//         const e = {};
//         if (tab === "overview") { if (!formData.fullName?.trim()) e.fullName = "Required."; if (!formData.currentRole?.trim()) e.role = "Required."; }
//         if (tab === "experience") { if (!formData.yearsOfExperience) e.yoe = "Required."; if (!formData.hourlyRate) e.rate = "Required."; }
//         setModalErrors(e); return !Object.keys(e).length;
//     };

//     const handleModalSave = async () => { if (!validate(modalTab)) return; await handleSave(true); };
//     const handleModalNext = async () => {
//         if (!validate(modalTab)) return;
//         await handleSave(false);
//         const idx = NAV_ORDER.indexOf(modalTab);
//         if (idx < NAV_ORDER.length - 1) { setModalTab(NAV_ORDER[idx + 1]); setModalErrors({}); }
//     };

//     const handlePhotoFile = useCallback((file) => {
//         if (!file) return;
//         if (!ALLOWED_TYPES.includes(file.type)) { setPhotoErrMsg("Only JPG, PNG, WebP or GIF."); setPhotoStatus("error"); return; }
//         if (file.size > MAX_MB * 1024 * 1024) { setPhotoErrMsg(`Max ${MAX_MB} MB.`); setPhotoStatus("error"); return; }
//         const reader = new FileReader();
//         setPhotoStatus("uploading"); setPhotoProgress(0); setPhotoErrMsg("");
//         reader.onprogress = (e) => { if (e.lengthComputable) setPhotoProgress(Math.round((e.loaded / e.total) * 100)); };
//         reader.onload = (e) => { const base64 = e.target.result; setPhotoPreview(base64); setPhotoProgress(100); setPhotoStatus("done"); set("profilePhoto", base64); try { const ud = JSON.parse(localStorage.getItem("userData") || "{}"); ud.profilePhoto = base64; localStorage.setItem("userData", JSON.stringify(ud)); } catch { } };
//         reader.onerror = () => { setPhotoErrMsg("Failed to read file."); setPhotoStatus("error"); };
//         reader.readAsDataURL(file);
//     }, []);

//     const clearPhoto = (e) => { e?.stopPropagation(); setPhotoPreview(""); setPhotoStatus("idle"); setPhotoProgress(0); setPhotoErrMsg(""); set("profilePhoto", ""); if (photoInputRef.current) photoInputRef.current.value = ""; try { const ud = JSON.parse(localStorage.getItem("userData") || "{}"); delete ud.profilePhoto; localStorage.setItem("userData", JSON.stringify(ud)); } catch { } };

//     const availChunkBlock = (start, end) => {
//         const chunks = []; let [h, m] = start.split(":").map(Number); const [eh, em] = end.split(":").map(Number);
//         while (h * 60 + m < eh * 60 + em) { const s = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`; m += 30; if (m >= 60) { h++; m -= 60; } chunks.push({ startTime: s, endTime: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` }); }
//         return chunks;
//     };

//     const availTotalDays = (() => { if (!availDateFrom || !availDateTo) return 0; let count = 0, cur = new Date(availDateFrom), to = new Date(availDateTo); while (cur <= to) { const d = cur.getDay(); if (!availWeekdays || (d !== 0 && d !== 6)) count++; cur.setDate(cur.getDate() + 1); } return count; })();
//     const availTotalSlots = availTotalDays * availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0);

//     const availAddBlock = () => {
//         setAvailErr("");
//         const [sh, sm] = availBlockStart.split(":").map(Number), [eh, em] = availBlockEnd.split(":").map(Number);
//         if (sh * 60 + sm >= eh * 60 + em) { setAvailErr("End must be after start."); return; }
//         if (slotCount(availBlockStart, availBlockEnd) < 1) { setAvailErr("Block must be ≥ 30 min."); return; }
//         for (const b of availTimeBlocks) { const [bsh, bsm] = b.start.split(":").map(Number), [beh, bem] = b.end.split(":").map(Number); if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setAvailErr(`Overlaps with ${b.start}–${b.end}`); return; } }
//         setAvailTimeBlocks((p) => [...p, { start: availBlockStart, end: availBlockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
//         setAvailBlockStart("09:00"); setAvailBlockEnd("12:00");
//     };

//     const availGenerate = () => {
//         setAvailErr("");
//         if (!availDateFrom || !availDateTo) { setAvailErr("Select a date range."); return; }
//         if (!availTimeBlocks.length) { setAvailErr("Add at least one time block."); return; }

//         // Build the full set of dates this generation would cover
//         const coveredDates = new Set();
//         let cur = new Date(availDateFrom), to = new Date(availDateTo);
//         while (cur <= to) {
//             const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0];
//             if (!availWeekdays || (dow !== 0 && dow !== 6)) coveredDates.add(dateStr);
//             cur.setDate(cur.getDate() + 1);
//         }

//         // Check if any existing BOOKED slot falls inside the date+time range being generated
//         const conflictingBooked = (formData.availability || []).filter((s) => {
//             if (!s.isBooked) return false;
//             const ds = new Date(s.date).toISOString().split("T")[0];
//             if (!coveredDates.has(ds)) return false;
//             // check if this booked slot's time overlaps any of the new time blocks
//             const [bh, bm] = s.startTime.split(":").map(Number);
//             const bMins = bh * 60 + bm;
//             return availTimeBlocks.some((block) => {
//                 const [sh, sm] = block.start.split(":").map(Number);
//                 const [eh, em] = block.end.split(":").map(Number);
//                 return bMins >= sh * 60 + sm && bMins < eh * 60 + em;
//             });
//         });

//         if (conflictingBooked.length > 0) {
//             const examples = conflictingBooked.slice(0, 3).map((s) => {
//                 const d = new Date(new Date(s.date).toISOString().split("T")[0] + "T00:00:00");
//                 return `${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at ${s.startTime}`;
//             });
//             const more = conflictingBooked.length > 3 ? ` +${conflictingBooked.length - 3} more` : "";
//             setAvailErr(`Cannot regenerate — ${conflictingBooked.length} booked slot${conflictingBooked.length > 1 ? "s" : ""} fall in this range: ${examples.join(", ")}${more}. Remove the booked dates from your range or contact support to cancel those bookings first.`);
//             return;
//         }

//         const newSlots = [];
//         cur = new Date(availDateFrom); to = new Date(availDateTo);
//         while (cur <= to) { const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0]; if (!availWeekdays || (dow !== 0 && dow !== 6)) for (const block of availTimeBlocks) for (const chunk of availChunkBlock(block.start, block.end)) newSlots.push({ date: dateStr, startTime: chunk.startTime, endTime: chunk.endTime, isBooked: false }); cur.setDate(cur.getDate() + 1); }
//         const seen = new Set();
//         const unique = newSlots.filter((s) => { const k = `${s.date}_${s.startTime}`; if (seen.has(k)) return false; seen.add(k); return true; });
//         setFormData((p) => ({ ...p, availability: [...(p.availability || []).filter((s) => s.isBooked), ...unique] }));
//         setAvailDateFrom(""); setAvailDateTo(""); setAvailTimeBlocks([]); setAvailErr("");
//     };

//     const availRemoveSlot = (ds, startTime) => { const target = (formData.availability || []).find((s) => new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime); if (target?.isBooked) { setAvailErr(`Slot on ${ds} at ${startTime} is already booked by a mentee and cannot be removed.`); return; } setFormData((p) => ({ ...p, availability: (p.availability || []).filter((s) => !(new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime)) })); };
//     const inputSt = { fontFamily: F, fontSize: 12, width: "100%", boxSizing: "border-box", border: `1.5px solid ${T.borderMed}`, borderRadius: 7, padding: "8px 10px", color: T.textDark, background: T.bg, outline: "none", colorScheme: "light" };

//     const modalNav = [
//         { id: "overview", label: "Profile", icon: User },
//         { id: "experience", label: "Experience", icon: Briefcase },
//         { id: "engagement", label: "Engagement", icon: MessageCircle },
//         { id: "mentorship", label: "Mentorship", icon: Users },
//         { id: "achievements", label: "Achievements", icon: Trophy },
//     ];

//     if (isLoading || Object.keys(formData).length < 2)
//         return (
//             <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Loader />
//             </div>
//         );

//     return (
//         <>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
//         *,*::before,*::after{box-sizing:border-box}
//         @keyframes spin{to{transform:rotate(360deg)}}
//         @keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
//         .edit-modal input:focus,.edit-modal textarea:focus,.edit-modal select:focus{border-color:${T.primary}!important;outline:none;box-shadow:0 0 0 3px ${T.primaryBg}}
//         .em-nav-btn.em-active:Experienced
// hover{background:#1a1a2e!important;color:#fff!important;}
// .em-nav-btn:not(.em-active):hover{background:${T.primaryBg}!important;color:${T.primary}!important;}
//         .edit-modal ::-webkit-scrollbar{width:5px}
//         .edit-modal ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
//         .edit-modal ::placeholder{color:${T.textLight}!important}
//         .edit-modal input[type="time"]::-webkit-calendar-picker-indicator,
//         .edit-modal input[type="date"]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
//         .modal-card{animation:fadeIn .2s ease}

//         /* ── Responsive overrides ───────────────────────── */

//         /* Overlay: no padding on mobile, slide-up from bottom */
//         .em-overlay { padding: 20px 60px; align-items: center; }
//         @media (max-width: 640px) {
//           .em-overlay { padding: 0 !important; align-items: flex-end !important; }
//         }

//         /* Card: rounded bottom-sheet on mobile */
//         .em-card { border-radius: 18px; max-width: 820px; max-height: 92vh; }
//         @media (max-width: 640px) {
//           .em-card {
//             max-width: 100% !important;
//             border-radius: 20px 20px 0 0 !important;
//             max-height: 96dvh !important;
//             height: 96dvh !important;
//           }
//         }

//         /* Body row → column on mobile */
//         .em-body { display: flex; flex: 1; min-height: 0; overflow: hidden; }
//         @media (max-width: 640px) { .em-body { flex-direction: column; } }

//         /* Sidebar: vertical desktop → horizontal tab strip mobile */
//         .em-sidebar {
//           background: ${T.surface};
//           border-right: 1px solid ${T.border};
//           width: 180px; flex-shrink: 0;
//           display: flex; flex-direction: column;
//         }
//         @media (max-width: 640px) {
//           .em-sidebar {
//             width: 100% !important;
//             border-right: none !important;
//             border-bottom: 1px solid ${T.border};
//             flex-direction: row;
//           }
//         }

//         /* Nav list → horizontal row */
//         .em-nav {
//           display: flex; flex-direction: column;
//           gap: 3px; padding: 14px 10px;
//           flex: 1; overflow: auto;
//         }
//         @media (max-width: 640px) {
//           .em-nav {
//             flex-direction: row !important;
//             gap: 0 !important; padding: 0 !important;
//             overflow-x: auto; overflow-y: hidden;
//             -webkit-overflow-scrolling: touch;
//             scrollbar-width: none;
//           }
//           .em-nav::-webkit-scrollbar { display: none; }
//         }

//         /* Individual tab button */
//         .em-nav-btn {
//           display: flex; align-items: center; gap: 8px;
//           padding: 10px 12px; border-radius: 9px;
//           font-size: 12.5px; font-weight: 700; font-family: ${F};
//           cursor: pointer; white-space: nowrap; transition: all .15s;
//         }
//         @media (max-width: 640px) {
//           .em-nav-btn {
//             flex: 1; justify-content: center; flex-direction: column;
//             gap: 4px !important; border-radius: 0 !important;
//             padding: 10px 6px !important; font-size: 10px !important;
//             border: none !important;
//             border-bottom: 2.5px solid transparent !important;
//             background: transparent !important;
//           }
//           .em-nav-btn.em-active {
//             border-bottom-color: ${T.primary} !important;
//             color: ${T.primary} !important;
//             background: ${T.primaryBg} !important;
//           }
//           /* hide the chevron on mobile */
//           .em-nav-chevron { display: none !important; }
//         }

//         /* Hide completion bar in sidebar on mobile (% already in header) */
//         .em-completion-bar { display: block; }
//         @media (max-width: 640px) { .em-completion-bar { display: none; } }

//         /* Content padding */
//         .em-content { flex: 1; overflow: auto; padding: 24px; }
//         @media (max-width: 640px) { .em-content { padding: 16px !important; } }

//         /* Grids → single column on mobile */
//         .em-grid-main  { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; }
//         .em-grid-edu   { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
//         .em-grid-2col  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//         .em-grid-date  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
//         @media (max-width: 640px) {
//           .em-grid-main, .em-grid-edu, .em-grid-2col { grid-template-columns: 1fr !important; gap: 12px !important; }
//         }
//         @media (max-width: 480px) {
//           .em-grid-date { grid-template-columns: 1fr !important; }
//         }

//         /* Availability slot cards: 5 → 3 → 2 cols */
//         .em-avail-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px; }
//         @media (max-width: 640px) { .em-avail-grid { grid-template-columns: repeat(3, 1fr) !important; } }
//         @media (max-width: 380px) { .em-avail-grid { grid-template-columns: repeat(2, 1fr) !important; } }

//         /* Time block row wraps on small screens */
//         .em-time-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-end; margin-bottom: 10px; }
//         @media (max-width: 480px) { .em-time-row > div { flex: 1 1 40%; min-width: 80px; } }

//         /* Footer: stack buttons full-width on mobile, hide Cancel */
//         .em-footer {
//           display: flex; gap: 8px; padding: 14px 20px;
//           border-top: 1px solid ${T.border}; background: ${T.surface};
//           flex-shrink: 0; justify-content: space-between;
//           align-items: center; flex-wrap: wrap;
//         }
//         .em-footer-actions { display: flex; gap: 8px; }
//         @media (max-width: 640px) {
//           .em-footer { padding: 10px 14px !important; }
//           .em-cancel-btn { display: none !important; }
//           .em-footer-actions { width: 100%; }
//           .em-footer-actions button { flex: 1; justify-content: center; }
//         }
//       `}</style>

//             {/* ── Overlay ── */}
//             <div className="edit-modal em-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", justifyContent: "center" }}>

//                 {/* ── Card ── */}
//                 <div className="modal-card em-card" style={{ background: T.bg, width: "100%", display: "flex", flexDirection: "column", boxShadow: "0 32px 100px rgba(0,0,0,0.3)", border: `1px solid ${T.border}`, overflow: "hidden" }}>

//                     {/* Header — unchanged */}
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: `1px solid ${T.border}`, flexShrink: 0, background: T.surface }}>
//                         <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
//                             <Pencil size={15} color={T.primary} /> Edit Profile
//                         </h2>
//                         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                             <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: completion >= 80 ? T.success : completion >= 50 ? T.warning : T.error, background: completion >= 80 ? T.successBg : completion >= 50 ? T.warningBg : T.errorBg, border: `1px solid ${completion >= 80 ? "#86efac" : completion >= 50 ? "#fcd34d" : "#fca5a5"}`, borderRadius: 20, padding: "3px 10px" }}>
//                                 {completion}% complete
//                             </div>
//                             <button onClick={handleClose} disabled={isSaving} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center" }}><X size={16} /></button>
//                         </div>
//                     </div>

//                     {/* ── Body ── */}
//                     <div className="em-body">

//                         {/* ── Sidebar / Tab Strip ── */}
//                         <div className="em-sidebar">
//                             <nav className="em-nav">
//                                 {modalNav.map(({ id, label, icon: Icon }) => (
//                                     <button
//                                         key={id}
//                                         type="button"
//                                         onClick={() => { setModalTab(id); setModalErrors({}); }}
//                                         className={`em-nav-btn${modalTab === id ? " em-active" : ""}`}
//                                         style={{
//                                             background: modalTab === id ? T.btn : "transparent",
//                                             color: modalTab === id ? "#fff" : T.textMid,
//                                             border: `1px solid ${modalTab === id ? T.btn : "transparent"}`,
//                                         }}
//                                     >
//                                         <Icon size={14} />
//                                         {label}
//                                         <ChevronRight size={12} className="em-nav-chevron" style={{ marginLeft: "auto" }} />
//                                     </button>
//                                 ))}
//                             </nav>
//                             <div className="em-completion-bar">
//                                 <CompletionBar pct={completion} />
//                             </div>
//                         </div>

//                         {/* ── Content ── */}
//                         <div className="em-content">
//                             {modalTab === "overview" && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//                                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Basic Information</h3>
//                                     <div>
//                                         <span style={lbl}>Profile Photo</span>
//                                         <div onDrop={(e) => { e.preventDefault(); setPhotoDragging(false); handlePhotoFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => { e.preventDefault(); setPhotoDragging(true); }} onDragLeave={() => setPhotoDragging(false)} onClick={() => photoStatus !== "uploading" && photoInputRef.current?.click()} style={{ borderRadius: 12, border: `2px dashed ${photoDragging ? T.primary : photoStatus === "error" ? T.error : T.borderMed}`, background: photoDragging ? T.primaryBg : T.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: photoStatus === "uploading" ? "not-allowed" : "pointer", overflow: "hidden", minHeight: 70 }}>
//                                             <input ref={photoInputRef} type="file" accept={ALLOWED_TYPES.join(",")} style={{ display: "none" }} onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
//                                             {photoPreview ? (
//                                                 <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%" }}>
//                                                     <div style={{ position: "relative", flexShrink: 0 }}>
//                                                         <img src={photoPreview} alt="preview" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: `2px solid ${photoStatus === "done" ? T.success : T.borderMed}`, display: "block" }} onError={(e) => (e.target.style.display = "none")} />
//                                                         {photoStatus === "done" && <div style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: T.success, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle size={9} color="#fff" /></div>}
//                                                     </div>
//                                                     <div style={{ flex: 1, minWidth: 0 }}>
//                                                         {photoStatus === "uploading" ? (<><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}><Loader2 size={11} color={T.primary} style={{ animation: "spin .9s linear infinite" }} /><span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Uploading… {photoProgress}%</span></div><div style={{ height: 3, background: T.border, borderRadius: 100, overflow: "hidden" }}><div style={{ height: "100%", width: `${photoProgress}%`, background: T.primary, borderRadius: 100, transition: "width .2s" }} /></div></>) : (<><span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: photoStatus === "done" ? T.success : T.textMid }}>{photoStatus === "done" ? "Uploaded!" : "Ready"}</span><p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>Click to replace</p></>)}
//                                                     </div>
//                                                     {photoStatus !== "uploading" && <button type="button" onClick={clearPhoto} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>}
//                                                 </div>
//                                             ) : (
//                                                 <div style={{ textAlign: "center", padding: "20px" }}>
//                                                     <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{photoDragging ? <Upload size={17} color={T.primary} /> : <Camera size={17} color={T.primary} />}</div>
//                                                     <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textMid, margin: "0 0 3px" }}>{photoDragging ? "Drop to upload" : "Upload Profile Photo"}</p>
//                                                     <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {photoStatus === "error" && photoErrMsg && (<div style={{ display: "flex", alignItems: "center", gap: 5, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 7, padding: "7px 11px", fontFamily: F, fontSize: 11, color: T.error, marginTop: 6 }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{photoErrMsg}</div>)}
//                                     </div>
//                                     {/* ← className replaces inline gridTemplateColumns */}
//                                     <div className="em-grid-main">
//                                         <div><span style={lbl}>Full Name *</span><input style={inp(modalErrors.fullName)} value={formData.fullName || ""} onChange={(e) => { set("fullName", e.target.value); if (modalErrors.fullName) setModalErrors((p) => ({ ...p, fullName: "" })); }} placeholder="Your full name" /><FieldErr msg={modalErrors.fullName} /></div>
//                                         <div><span style={lbl}>Professional Title *</span><input style={inp(modalErrors.role)} value={formData.currentRole || ""} onChange={(e) => { set("currentRole", e.target.value); if (modalErrors.role) setModalErrors((p) => ({ ...p, role: "" })); }} placeholder="e.g. Senior Engineer" /><FieldErr msg={modalErrors.role} /></div>
//                                         <div><span style={lbl}>Location</span><input style={inp()} value={formData.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" /></div>
//                                         <div><span style={lbl}>Phone</span><input style={inp()} value={formData.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+91 1234567890" /></div>
//                                         <div><span style={lbl}>LinkedIn</span><input style={inp()} value={formData.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
//                                         <div><span style={lbl}>Mentoring Style</span><input style={inp()} value={formData.mentoringStyle || ""} onChange={(e) => set("mentoringStyle", e.target.value)} placeholder="e.g. Collaborative" /></div>
//                                     </div>
//                                     <div><span style={lbl}>Bio / About</span><textarea style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }} rows={3} value={formData.whyMentor || ""} onChange={(e) => set("whyMentor", e.target.value)} placeholder="Share your professional journey…" /></div>
//                                     <div>
//                                         <span style={lbl}>Specialisations / Domains</span>
//                                         <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "0 0 2px" }}>e.g. Data Science, Cloud Computing</p>
//                                         <TagRow placeholder="Add a specialisation…" valKey="skill" field="currentSkills" {...tagRowShared} />
//                                         {skills.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV("currentSkills", s)} />)}</div>}
//                                     </div>
//                                 </div>
//                             )}

//                             {modalTab === "experience" && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//                                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Professional Background</h3>
//                                     <div className="em-grid-main">
//                                         <div><span style={lbl}>Organisation</span><input style={inp()} value={formData.companyName || ""} onChange={(e) => set("companyName", e.target.value)} placeholder="e.g. Google" /></div>
//                                         <div><span style={lbl}>Position</span><input style={inp()} value={formData.currentPosition || ""} onChange={(e) => set("currentPosition", e.target.value)} placeholder="e.g. Principal Engineer" /></div>
//                                         <div><span style={lbl}>Years of Experience *</span><input type="number" style={inp(modalErrors.yoe)} value={formData.yearsOfExperience || ""} onChange={(e) => { set("yearsOfExperience", e.target.value); if (modalErrors.yoe) setModalErrors((p) => ({ ...p, yoe: "" })); }} placeholder="e.g. 8" /><FieldErr msg={modalErrors.yoe} /></div>
//                                         <div><span style={lbl}>Hourly Rate (₹) *</span><input type="number" style={inp(modalErrors.rate)} value={formData.hourlyRate || ""} onChange={(e) => { set("hourlyRate", e.target.value); if (modalErrors.rate) setModalErrors((p) => ({ ...p, rate: "" })); }} placeholder="e.g. 1500" /><FieldErr msg={modalErrors.rate} /></div>
//                                     </div>
//                                     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
//                                         <p style={{ ...secHead, marginBottom: 12 }}><Award size={11} color={T.primary} /> Educational Background</p>
//                                         <div className="em-grid-edu">
//                                             <div><span style={lbl}>Highest Degree</span><select value={formData.highestDegree || ""} onChange={(e) => set("highestDegree", e.target.value)} style={{ ...inp(), background: T.bg }}><option value="">Select degree</option>{["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}</select></div>
//                                             <div><span style={lbl}>Field of Study</span><input style={inp()} value={formData.fieldOfStudy || ""} onChange={(e) => set("fieldOfStudy", e.target.value)} placeholder="e.g. Computer Science" /></div>
//                                             <div><span style={lbl}>Institution</span><input style={inp()} value={formData.schoolName || ""} onChange={(e) => set("schoolName", e.target.value)} placeholder="e.g. IIT Bombay" /></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {modalTab === "engagement" && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//                                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Engagement</h3>
//                                     <div>
//                                         <p style={secHead}><Calendar size={11} color={T.primary} /> Availability</p>
//                                         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                                             <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: "14px 16px" }}>
//                                                 <p style={{ ...secHead, marginBottom: 10 }}><Calendar size={10} color={T.primary} /> Date Range</p>
//                                                 <div className="em-grid-date">
//                                                     <div><span style={lbl}>From</span><input type="date" value={availDateFrom} min={tomorrow()} onChange={(e) => { setAvailDateFrom(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
//                                                     <div><span style={lbl}>To</span><input type="date" value={availDateTo} min={availDateFrom || tomorrow()} onChange={(e) => { setAvailDateTo(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
//                                                 </div>
//                                                 <button type="button" onClick={() => setAvailWeekdays((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
//                                                     <div style={{ width: 34, height: 18, borderRadius: 100, background: availWeekdays ? T.primary : T.border, position: "relative", transition: "background .2s", flexShrink: 0 }}><div style={{ position: "absolute", top: 2, left: availWeekdays ? 16 : 2, width: 10, height: 10, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} /></div>
//                                                     <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
//                                                 </button>
//                                                 {availDateFrom && availDateTo && <div style={{ marginTop: 10, padding: "7px 11px", borderRadius: 7, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600 }}>📅 {availTotalDays} day{availTotalDays !== 1 ? "s" : ""} selected{availWeekdays ? " (weekdays only)" : " (incl. weekends)"}</div>}
//                                             </div>
//                                             <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: "14px 16px" }}>
//                                                 <p style={{ ...secHead, marginBottom: 10 }}><Clock size={10} color={T.primary} /> Time Blocks</p>
//                                                 <div className="em-time-row">
//                                                     <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>Start</span><input type="time" value={availBlockStart} onChange={(e) => setAvailBlockStart(e.target.value)} style={inputSt} /></div>
//                                                     <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>End</span><input type="time" value={availBlockEnd} onChange={(e) => setAvailBlockEnd(e.target.value)} style={inputSt} /></div>
//                                                     {availBlockStart && availBlockEnd && slotCount(availBlockStart, availBlockEnd) > 0 && <div style={{ padding: "7px 10px", borderRadius: 7, background: T.successBg, border: "1px solid #86efac", fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, alignSelf: "flex-end", flexShrink: 0 }}>{slotCount(availBlockStart, availBlockEnd)} slots</div>}
//                                                     <button type="button" onClick={availAddBlock} style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-end", flexShrink: 0 }}><Plus size={13} /> Add Block</button>
//                                                 </div>
//                                                 {availTimeBlocks.length > 0 ? (
//                                                     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                                                         {availTimeBlocks.map((b, i) => (
//                                                             <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, background: T.primaryBg, border: `1px solid ${T.primaryBd}` }}>
//                                                                 <Clock size={12} color={T.primary} style={{ flexShrink: 0 }} />
//                                                                 <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, flex: 1 }}>{b.start} — {b.end}</span>
//                                                                 <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, background: T.successBg, border: "1px solid #86efac", padding: "2px 8px", borderRadius: 20 }}>{slotCount(b.start, b.end)} × 30 min/day</span>
//                                                                 <button type="button" onClick={() => setAvailTimeBlocks((p) => p.filter((_, j) => j !== i))} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 6, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 ) : <div style={{ textAlign: "center", padding: 12, background: T.bg, border: `1px dashed ${T.border}`, borderRadius: 8 }}><p style={{ fontFamily: F, fontSize: 11.5, color: T.textLight, margin: 0 }}>Add blocks above — e.g. 9:00–12:00</p></div>}
//                                             </div>
//                                             {availTimeBlocks.length > 0 && availDateFrom && availDateTo && (
//                                                 <div style={{ padding: "12px 16px", borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
//                                                     <div>
//                                                         <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.textDark, margin: "0 0 2px" }}>⚡ {availTotalSlots} slots will be generated</p>
//                                                         <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>{availTotalDays} days × {availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day · Duplicates skipped</p>
//                                                     </div>
//                                                     <button type="button" onClick={availGenerate} style={{ padding: "9px 18px", background: T.btn, color: "#fff", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}><CheckCircle size={13} /> Generate</button>
//                                                 </div>
//                                             )}
//                                             {availErr && <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontFamily: F, fontSize: 11.5, color: T.error }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{availErr}</div>}
//                                             {availFlat.length > 0 && (
//                                                 <div>
//                                                     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
//                                                         <span style={{ fontFamily: F, fontSize: 11, color: T.primary, fontWeight: 700 }}>{availFlat.length} total</span>
//                                                         <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700 }}>● {availFlat.filter((s) => !s.isBooked).length} available</span>
//                                                         {availFlat.filter((s) => s.isBooked).length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: T.warning, fontWeight: 700 }}>● {availFlat.filter((s) => s.isBooked).length} booked</span>}
//                                                     </div>
//                                                     <div className="em-avail-grid">
//                                                         {availFlat.map((slot) => {
//                                                             const d = new Date(slot.ds + "T00:00:00");
//                                                             return (
//                                                                 <div key={`${slot.ds}_${slot.startTime}`} style={{ position: "relative", padding: "9px 6px", borderRadius: 9, textAlign: "center", background: slot.isBooked ? T.warningBg : T.primaryBg, border: `1px solid ${slot.isBooked ? "#fcd34d" : T.primaryBd}`, display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
//                                                                     <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: ".4px" }}>{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
//                                                                     <div style={{ fontFamily: "DM Mono, monospace", fontSize: 18, fontWeight: 700, color: T.textDark, lineHeight: 1 }}>{d.getDate()}</div>
//                                                                     <span style={{ fontFamily: F, fontSize: 8.5, color: T.textLight }}>{d.toLocaleDateString("en-IN", { month: "short" })} {d.getFullYear().toString().slice(2)}</span>
//                                                                     <div style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: slot.isBooked ? T.warning : T.primary, background: T.bg, border: `1px solid ${slot.isBooked ? "#fcd34d" : T.primaryBd}`, borderRadius: 5, padding: "2px 5px", width: "100%", boxSizing: "border-box" }}>{slot.startTime}</div>
//                                                                     <span style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: slot.isBooked ? T.warning : T.success }}>{slot.isBooked ? "Booked" : ""}</span>
//                                                                     {!slot.isBooked && <button onClick={() => availRemoveSlot(slot.ds, slot.startTime)} style={{ position: "absolute", top: 3, right: 3, background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 3, width: 15, height: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}><X size={8} /></button>}
//                                                                 </div>
//                                                             );
//                                                         })}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><Globe size={11} color={T.primary} /> Languages</p>
//                                         <TagRow placeholder="e.g. English, Hindi" valKey="lang" field="languages" isArr {...tagRowShared} />
//                                         {langs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr("languages", l)} />)}</div>}
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><Video size={11} color={T.primary} /> Mentorship Format</p>
//                                         <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                                             {["Online", "Group Sessions", "One-on-One"].map((fmt) => {
//                                                 const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
//                                                 return (
//                                                     <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set("mentorshipFormat", joinCSV(sel ? c.filter((s) => s !== fmt) : [...c, fmt])); }}
//                                                         style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
//                                                         <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.primary : T.borderMed }} />{fmt}
//                                                     </button>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><MessageCircle size={11} color={T.primary} /> Contact / Booking</p>
//                                         <div className="em-grid-2col">
//                                             <div><span style={lbl}>Platform Messaging</span><input style={inp()} value={formData.platformMessaging || ""} onChange={(e) => set("platformMessaging", e.target.value)} placeholder="@username" /></div>
//                                             <div><span style={lbl}>Calendar / Booking Link</span><input style={inp()} value={formData.calendarLink || ""} onChange={(e) => set("calendarLink", e.target.value)} placeholder="https://calendly.com/…" /></div>
//                                         </div>
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><Target size={11} color={T.primary} /> Areas of Guidance</p>
//                                         <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
//                                             {["Career Prep", "Interview Coaching", "Technical Skills", "Soft Skills", "Leadership", "Resume Review", "Startup Guidance"].map((g) => {
//                                                 const sel = guidAreas.includes(g);
//                                                 return (
//                                                     <button key={g} type="button" onClick={() => set("guidanceAreas", sel ? guidAreas.filter((x) => x !== g) : [...guidAreas, g])}
//                                                         style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 8, border: `1.5px solid ${sel ? T.success : T.borderMed}`, background: sel ? T.successBg : T.bg, color: sel ? T.success : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
//                                                         <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.success : T.borderMed }} />{g}
//                                                     </button>
//                                                 );
//                                             })}
//                                         </div>
//                                         <TagRow placeholder="Custom guidance area…" valKey="guid" field="guidanceAreas" isArr {...tagRowShared} />
//                                         {guidAreas.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr("guidanceAreas", g)} />)}</div>}
//                                     </div>
//                                 </div>
//                             )}

//                             {modalTab === "achievements" && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//                                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Achievements & Credentials</h3>
//                                     <div>
//                                         <p style={secHead}><Trophy size={11} color={T.primary} /> Key Accomplishments</p>
//                                         <TagRow placeholder="e.g. Led team that scaled to 1M users" valKey="accomp" field="accomplishments" isArr {...tagRowShared} />
//                                         {accomps.length > 0 && (
//                                             <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
//                                                 {accomps.map((a, i) => (
//                                                     <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9 }}>
//                                                         <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
//                                                         <span style={{ fontFamily: F, fontSize: 12.5, color: T.textMid, flex: 1, wordBreak: "break-word" }}>{a}</span>
//                                                         <button onClick={() => rmArr("accomplishments", a)} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 5, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><Trash2 size={11} /></button>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><BadgeCheck size={11} color={T.primary} /> Certifications</p>
//                                         <TagRow placeholder="e.g. AWS Certified Solutions Architect" valKey="cert" field="certifications" isArr {...tagRowShared} />
//                                         {certs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr("certifications", c)} />)}</div>}
//                                     </div>
//                                     <div style={{ height: 1, background: T.border }} />
//                                     <div>
//                                         <p style={secHead}><FileText size={11} color={T.primary} /> Portfolio / Media Links</p>
//                                         <div style={{ background: T.warningBg, border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 14px", fontFamily: F, fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.7 }}>Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.</div>
//                                         {[{ label: "Portfolio", field: "portfolioLink", placeholder: "https://drive.google.com/…" }, { label: "Intro Video", field: "videoLink", placeholder: "https://youtube.com/…" }].map(({ label, field, placeholder }) => (
//                                             <div key={field} style={{ marginBottom: 12 }}>
//                                                 <span style={lbl}>{label}</span>
//                                                 <input style={inp()} value={formData[field] || ""} onChange={(e) => set(field, e.target.value)} placeholder={placeholder} />
//                                                 {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 5, textDecoration: "none" }}><Eye size={11} /> Preview →</a>}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {modalTab === "mentorship" && (
//                                 <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//                                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Mentorship Settings</h3>

//                                     {/* MENTORSHIP DELIVERY SECTION */}
//                                     <div>
//                                         <p style={secHead}><Users size={11} color={T.primary} /> Mentorship Delivery</p>
//                                         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                                             <div>
//                                                 <span style={lbl}>Active LTM Mentee Limit *</span>
//                                                 <select value={ltmMenteeLimit} onChange={(e) => setLtmMenteeLimit(e.target.value)} style={{ ...inp(), background: T.bg }}>
//                                                     <option value="">Select limit</option>
//                                                     {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n.toString()}>{`Max ${n} Mentees`}</option>)}
//                                                 </select>
//                                                 <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>This helps is limiting the no if LTM mentee that you can have. When this limit is reached, trials will auto-turn off</p>
//                                             </div>

//                                             <div>
//                                                 <span style={lbl}>Sessions Frequency *</span>
//                                                 <select value={sessionsFrequency} onChange={(e) => setSessionsFrequency(e.target.value)} style={{ ...inp(), background: T.bg }}>
//                                                     <option value="">Select...</option>
//                                                     <option value="weekly">Weekly</option>
//                                                     <option value="bi-weekly">Bi-Weekly</option>
//                                                     <option value="monthly">Monthly</option>
//                                                     <option value="as-needed">As Needed</option>
//                                                 </select>
//                                                 <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Mention how often you plan to meet your mentees on a weekly basis</p>
//                                             </div>

//                                             <div>
//                                                 <span style={lbl}>Mentorship Pitch *</span>
//                                                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//                                                     <span style={{ fontFamily: F, fontSize: 11, color: T.textLight }}>Your mentorship pitch for the mentees</span>
//                                                     <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: T.textMid }}>{mentorshipPitch.length}/1000</span>
//                                                 </div>
//                                                 <textarea
//                                                     style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }}
//                                                     rows={4}
//                                                     value={mentorshipPitch}
//                                                     onChange={(e) => setMentorshipPitch(e.target.value.slice(0, 1000))}
//                                                     placeholder="Your mentorship pitch for the mentees"
//                                                     maxLength="1000"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div style={{ height: 1, background: T.border }} />

//                                     {/* MENTEE PREFERENCES SECTION */}
//                                     <div>
//                                         <p style={secHead}><Users size={11} color={T.primary} /> Mentee Preferences</p>
//                                         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                                             <div>
//                                                 <span style={lbl}>Select Primary Expertise *</span>
//                                                 <select value={primaryExpertise} onChange={(e) => setPrimaryExpertise(e.target.value)} style={{ ...inp(), background: T.bg }}>
//                                                     <option value="">Select...</option>
//                                                     <option value="frontend">Frontend Developer</option>
//                                                     <option value="backend">Backend Developer</option>
//                                                     <option value="fullstack">Full Stack Developer</option>
//                                                     <option value="devops">DevOps Engineer</option>
//                                                     <option value="datascience">Data Science</option>
//                                                     <option value="ui-ux">UI/UX Designer</option>
//                                                     <option value="product">Product Manager</option>
//                                                 </select>
//                                                 <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Your primary domain</p>
//                                             </div>

//                                             <div>
//                                                 <span style={lbl}>Select Secondary Expertise</span>
//                                                 <select value={secondaryExpertise} onChange={(e) => setSecondaryExpertise(e.target.value)} style={{ ...inp(), background: T.bg }}>
//                                                     <option value="">Select...</option>
//                                                     <option value="frontend">Frontend Developer</option>
//                                                     <option value="backend">Backend Developer</option>
//                                                     <option value="fullstack">Full Stack Developer</option>
//                                                     <option value="devops">DevOps Engineer</option>
//                                                     <option value="datascience">Data Science</option>
//                                                     <option value="ui-ux">UI/UX Designer</option>
//                                                     <option value="product">Product Manager</option>
//                                                 </select>
//                                                 <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Other domains from which you can cater mentees</p>
//                                             </div>

//                                             <div>
//                                                 <span style={lbl}>Persona *</span>
//                                                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => setPersonaFreshers(!personaFreshers)}
//                                                         style={{
//                                                             padding: 16,
//                                                             border: `2px solid ${personaFreshers ? T.primary : T.borderMed}`,
//                                                             borderRadius: 10,
//                                                             background: personaFreshers ? T.primaryBg : T.bg,
//                                                             cursor: "pointer",
//                                                             display: "flex",
//                                                             alignItems: "flex-start",
//                                                             gap: 10,
//                                                             transition: "all .15s"
//                                                         }}
//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={personaFreshers}
//                                                             onChange={() => { }}
//                                                             style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0, marginTop: 2 }}
//                                                         />
//                                                         <div style={{ textAlign: "left", flex: 1 }}>
//                                                             <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>Freshers</p>
//                                                             <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "4px 0 0" }}>Mentees currently in college or seeking their first job.</p>
//                                                         </div>
//                                                     </button>

//                                                     <button
//                                                         type="button"
//                                                         onClick={() => setPersonaExperienced(!personaExperienced)}
//                                                         style={{
//                                                             padding: 16,
//                                                             border: `2px solid ${personaExperienced ? T.primary : T.borderMed}`,
//                                                             borderRadius: 10,
//                                                             background: personaExperienced ? T.primaryBg : T.bg,
//                                                             cursor: "pointer",
//                                                             display: "flex",
//                                                             alignItems: "flex-start",
//                                                             gap: 10,
//                                                             transition: "all .15s"
//                                                         }}
//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={personaExperienced}
//                                                             onChange={() => { }}
//                                                             style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0, marginTop: 2 }}
//                                                         />
//                                                         <div style={{ textAlign: "left", flex: 1 }}>
//                                                             <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>Experienced</p>
//                                                             <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "4px 0 0" }}>Mentees aiming for career growth or considering domain change.</p>
//                                                         </div>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div style={{ height: 1, background: T.border }} />

//                                 </div>
//                             )}

//                         </div>
//                     </div>

//                     {/* ── Footer ── */}
//                     <div className="em-footer">
//                         <button type="button" className="em-cancel-btn" onClick={handleClose} disabled={isSaving} style={{ fontFamily: F, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer" }}>Cancel</button>
//                         <div className="em-footer-actions">
//                             <button type="button" onClick={handleModalSave} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
//                                 {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : "Save"}
//                             </button>
//                             {modalTab !== NAV_ORDER[NAV_ORDER.length - 1] && (
//                                 <button type="button" onClick={handleModalNext} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 8, color: "#fff", background: T.btn, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
//                                     {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // Navigation items — matches image exactly
// // ═══════════════════════════════════════════════════════════════════════════════
// const navigationItems = [
//     { id: "home", label: "Home", icon: Home, route: "/mentor/dashboard" },
//     { id: "sessions", label: "Sessions", icon: BookOpen, route: "/mentor/dashboard/sessions" },
//     { id: "Subscriptions & Sessions", label: "Subscriptions & Sessions", icon: Users, route: "/mentor/dashboard/my-mentee-sessions" },
//     { id: "Pricing", label: " Pricing", icon: Wallet, route: "/mentor/dashboard/pricing" },
//     {
//         id: "manage_availability",
//         label: "Manage Availability",
//         icon: Calendar,
//         route: "/mentor/dashboard/Manage_Availability"
//     },
//     { id: "Earnings", label: "Earnings", icon: Star, route: "/mentor/dashboard/Earnings" },

//     { id: "testimonials", label: "Testimonials", icon: Star, route: "/mentor/dashboard/reviews" },
//     { id: "support", label: "Help Request", icon: Headphones, route: "/mentor-dashboard/support" },
// ];

// // ── Logout Modal ───────────────────────────────────────────────────────────────
// const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
//     if (!isOpen) return null;
//     return (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "0 16px" }}>
//             <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
//                 <h2 style={{ fontFamily: F, color: T.primary, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Confirm Logout</h2>
//                 <p style={{ fontFamily: F, color: T.textMid, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>Are you sure you want to logout? You'll need to sign in again to access your account.</p>
//                 <div style={{ display: "flex", gap: 12 }}>
//                     <button onClick={onClose} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: `1px solid ${T.btn}`, color: T.btn, background: "#fff", fontFamily: F, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Cancel</button>
//                     <button onClick={onConfirm} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: "none", background: T.btn, color: "#fff", fontFamily: F, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Logout</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ── Profile Dropdown ───────────────────────────────────────────────────────────
// const ProfileDropdown = ({ onLogoutClick, isOpen, onClose, onEditProfile }) => {
//     const navigate = useNavigate();
//     const [userinfo, setuserinfo] = useState(null);
//     const dropdownRef = useRef(null);

//     useEffect(() => { const ud = localStorage.getItem("userData"); if (ud) setuserinfo(JSON.parse(ud)); }, []);
//     useEffect(() => {
//         if (!isOpen) return;
//         const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onClose?.(); };
//         document.addEventListener("mousedown", handleClick);
//         return () => document.removeEventListener("mousedown", handleClick);
//     }, [isOpen, onClose]);

//     const handleViewProfile = () => {
//         const ud = localStorage.getItem("userData");
//         if (ud) { try { const parsed = JSON.parse(ud); const mentorId = parsed._id || parsed.id; if (mentorId) { navigate(`/mentor-profile/${mentorId}`, { state: { type: "mentor" } }); onClose?.(); } } catch { } }
//     };

//     if (!isOpen) return null;
//     return (
//         <div ref={dropdownRef} style={{ position: "absolute", right: 0, top: 52, width: 240, background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden" }}>
//             <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={{ width: 36, height: 36, background: T.btn, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 13, flexShrink: 0, overflow: "hidden" }}>
//                     {userinfo?.profilePhoto ? <img src={userinfo.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : userinfo?.name?.charAt(0) || "U"}
//                 </div>
//                 <div style={{ minWidth: 0 }}>
//                     <p style={{ fontFamily: F, color: T.primary, fontSize: 13, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.name || "User"}</p>
//                     <p style={{ fontFamily: F, color: T.textLight, fontSize: 11, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.email || ""}</p>
//                 </div>
//             </div>
//             <div style={{ padding: 6 }}>
//                 {[
//                     { label: "View Profile", onClick: handleViewProfile, color: T.textDark },
//                     { label: "Edit Profile", onClick: () => { onEditProfile?.(); onClose?.(); }, color: T.textDark, icon: <Pencil size={12} color={T.primary} /> },
//                     { label: "Logout", onClick: onLogoutClick, color: T.error },
//                 ].map(({ label, onClick, color, icon }) => (
//                     <button key={label} onClick={onClick}
//                         style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 7, fontFamily: F, fontSize: 13, color, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
//                         {icon}{label}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // ── Need Help Panel — matches image (blue tab on right edge) ───────────────────
// const NeedHelpPanel = () => {
//     const [open, setOpen] = useState(false);
//     return (
//         <>


//             <div style={{ position: "fixed", right: open ? 0 : -270, top: 0, bottom: 0, width: 270, background: "#fff", borderLeft: `1px solid ${T.border}`, zIndex: 999, transition: "right .25s ease", boxShadow: "-4px 0 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
//                 <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div>
//                         <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: 0 }}>Feeling Stuck?</p>
//                         <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>We're here to help</p>
//                     </div>
//                     <button onClick={() => setOpen(false)} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex" }}><X size={14} /></button>
//                 </div>
//                 <div style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
//                     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
//                         <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 8px" }}>Your POC</p>
//                         <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Karrivo</p>
//                         <p style={{ fontFamily: F, fontSize: 12, color: T.primary, margin: "0 0 10px", fontWeight: 600 }}>+91 9699039801</p>
//                         <p style={{ fontFamily: F, fontSize: 11, color: T.textMid, margin: 0, lineHeight: 1.6 }}>Reach out whenever you need assistance or have questions.</p>
//                     </div>
//                     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
//                         <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 10px" }}>Quick Help</p>
//                         {["How to set up pricing?", "Managing your sessions", "Getting more bookings", "Profile best practices"].map((label) => (
//                             <a key={label} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontFamily: F, fontSize: 12, color: T.textDark, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>
//                                 {label} <ChevronRight size={13} color={T.textLight} />
//                             </a>
//                         ))}
//                     </div>
//                     <a href="/mentor-dashboard/support" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", background: T.btn, color: "#fff", borderRadius: 10, fontFamily: F, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
//                         <Headphones size={15} /> Submit Support Request
//                     </a>
//                 </div>
//             </div>
//         </>
//     );
// };

// // ── Sidebar ────────────────────────────────────────────────────────────────────
// const SidebarContent = ({ collapsed = false, isActiveRoute, onNavClick }) => {
//     const navigate = useNavigate();
//     return (
//         <div style={{ display: "flex", flexDirection: "column", height: "80%", background: "#fff" }}>
//             {/* Logo — matches "preplaced" with colorful icon */}
//             <div
//                 style={{
//                     height: 56,
//                     display: "flex",
//                     alignItems: "center",
//                     borderBottom: `1px solid ${T.border}`,
//                     padding: collapsed ? "0 16px" : "0 20px",
//                     flexShrink: 0,
//                 }}
//             >
//                 {!collapsed && (
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                         <img
//                             src={Karrivo}
//                             alt="Logo"
//                             style={{
//                                 width: 68,
//                                 height: 68,
//                                 objectFit: "contain",
//                                 borderRadius: 8,
//                             }}
//                         />
//                         <span
//                             style={{
//                                 fontFamily: F,
//                                 fontSize: 15,
//                                 fontWeight: 600,
//                                 color: "#111827",
//                             }}
//                         >
//                             Mentor Hub
//                         </span>
//                     </div>
//                 )}
//                 {collapsed && (
//                     <div
//                         style={{
//                             width: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                     >
//                         <img
//                             src={Karrivo}
//                             alt="Logo"
//                             style={{
//                                 width: 90,
//                                 height: 90,
//                                 objectFit: "contain",
//                                 borderRadius: 8,
//                             }}
//                         />
//                     </div>
//                 )}
//             </div>
//             {/* Nav items */}
//             <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 1, scrollbarWidth: "none", msOverflowStyle: "none" }}>                {navigationItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = isActiveRoute(item.route);
//                 return (
//                     <button key={item.id} onClick={() => { navigate(item.route); onNavClick?.(); }}
//                         style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, padding: "9px 12px", borderRadius: 8, border: "none", background: isActive ? T.navActiveBg : "transparent", color: isActive ? T.navActive : T.textMid, cursor: "pointer", fontFamily: F, fontSize: 13, fontWeight: isActive ? 600 : 400, justifyContent: collapsed ? "center" : "flex-start", width: "100%", transition: "background .12s" }}>
//                         <Icon size={16} style={{ flexShrink: 0 }} />
//                         {!collapsed && (
//                             <>
//                                 <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
//                                 {item.badge && (
//                                     <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d", borderRadius: 20, padding: "1px 7px" }}>{item.badge}</span>
//                                 )}
//                             </>
//                         )}
//                     </button>
//                 );
//             })}
//             </nav>
//         </div >
//     );
// };

// const RightPanel = () => {
//     const [copied, setCopied] = useState(false);

//     const handleCopy = () => {
//         navigator.clipboard.writeText("+919699039801");
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };
//     const mentorGrowth = [
//         {
//             title: "Build Your Personal Brand",
//             subtitle: "Create trust and visibility with your profile",
//             icon: UserCircle,
//         },
//         {
//             title: "Increase Session Bookings",
//             subtitle: "Optimize your profile to attract more mentees",
//             icon: TrendingUp,
//         },
//         {
//             title: "Deliver Better Mentorship",
//             subtitle: "Engage smarter and improve student outcomes",
//             icon: Target,
//         },
//     ];

//     const handleNavigate = () => {
//         window.open("https://karrivo.in/explore-mentors/", "_blank");
//     };

//     return (
//         <div className="right-panel" style={{ width: 296, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
//             {/* Mentor Growth Section */}
//             <div style={{ padding: "20px 20px 16px" }}>
//                 <p
//                     style={{
//                         fontFamily: F,
//                         fontSize: 14,
//                         fontWeight: 600,
//                         color: T.textDark,
//                         margin: "0 0 4px",
//                     }}
//                 >
//                     Grow as a Mentor
//                 </p>

//                 <p
//                     style={{
//                         fontFamily: F,
//                         fontSize: 12,
//                         color: T.textLight,
//                         margin: "0 0 16px",
//                         lineHeight: 1.5,
//                     }}
//                 >
//                     Improve your visibility, engagement, and mentorship journey.
//                 </p>
//                 {mentorGrowth.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                         <div
//                             key={item.title}
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 12,
//                                 padding: "12px",
//                                 border: `1px solid ${T.border}`,
//                                 borderRadius: 10,
//                                 marginBottom: 10,
//                                 cursor: "pointer",
//                                 transition: "0.2s",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     width: 38,
//                                     height: 38,
//                                     borderRadius: "50%",
//                                     background: "#1a1a2e",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     flexShrink: 0,
//                                 }}
//                             >
//                                 <Icon size={18} color="#ffffff" />
//                             </div>

//                             <div style={{ flex: 1 }}>
//                                 <p
//                                     style={{
//                                         fontFamily: F,
//                                         fontSize: 13,
//                                         fontWeight: 600,
//                                         color: T.textDark,
//                                         margin: 0,
//                                     }}
//                                 >
//                                     {item.title}
//                                 </p>

//                                 <p
//                                     style={{
//                                         fontFamily: F,
//                                         fontSize: 12,
//                                         color: T.textLight,
//                                         margin: "2px 0 0",
//                                     }}
//                                 >
//                                     {item.subtitle}
//                                 </p>
//                             </div>

//                             <ArrowUpRight size={14} color={T.textLight} />
//                         </div>
//                     );
//                 })}

//             </div>

//             <div style={{ height: 1, background: T.border }} />

//             {/* Support Section */}
//             <div style={{ padding: "20px" }}>
//                 <p
//                     style={{
//                         fontFamily: F,
//                         fontSize: 14,
//                         fontWeight: 600,
//                         color: T.textDark,
//                         margin: "0 0 6px",
//                     }}
//                 >
//                     Any Queries?
//                 </p>

//                 <p
//                     style={{
//                         fontFamily: F,
//                         fontSize: 12,
//                         color: T.textLight,
//                         margin: "0 0 14px",
//                         lineHeight: 1.6,
//                     }}
//                 >
//                     Reach out to your support team anytime for profile help,
//                     Any guidance, or onboarding assistance.
//                 </p>

//                 <p
//                     style={{
//                         fontFamily: F,
//                         fontSize: 13,
//                         color: T.textDark,
//                         margin: "0 0 2px",
//                         fontWeight: 500,
//                     }}
//                 >
//                     Karrivo Support
//                 </p>

//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                     }}
//                 >
//                     <p
//                         style={{
//                             fontFamily: F,
//                             fontSize: 14,
//                             fontWeight: 600,
//                             color: T.textDark,
//                             margin: 0,
//                         }}
//                     >
//                         +91 7702 193 487                    </p>

//                     <button
//                         onClick={handleCopy}
//                         style={{
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                             color: copied ? T.success : T.textLight,
//                             display: "flex",
//                             alignItems: "center",
//                         }}
//                     >
//                         {copied ? (
//                             <CheckCircle size={15} />
//                         ) : (
//                             <Copy size={15} />
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
// // ── Center Content — onboarding checklist with clickable navigation to EditProfile ──────────────
// const CenterContent = ({ children, isHome, onEditProfileOpen, onSetEditTab }) => {
//     const navigate = useNavigate();
//     const setupSteps = [
//         {
//             label: "Setup Your Mentor Profile",
//             done: false,
//             locked: false,
//             icon: User,
//             tab: "overview",  // ✅ Matches EditProfile modalNav "overview"
//             description: "Complete your basic information"
//         },

//         {
//             label: "Setup Your Mentorship Pricing",
//             done: false,
//             locked: false,
//             icon: Wallet,
//             route: "/mentor/dashboard/pricing", // ✅ Add route
//             description: "Set your hourly rate and experience"
//         },
//         {
//             label: "Setup Your Availability",
//             done: true,
//             locked: false,
//             icon: Calendar,
//             route: "/mentor/dashboard/Manage_Availability", // ✅ Navigate here
//             description: "Set your availability slots"
//         },
//         {
//             label: "Create a Mentorship Curriculum",
//             done: false,
//             locked: false,
//             icon: BookOpen,
//             tab: "achievements",  // ✅ Matches EditProfile modalNav "achievements"
//             description: "Add your achievements & certifications"
//         },
//     ];

//     const handleStepClick = (step) => {
//         if (step.locked) return;

//         // ✅ Navigate to pricing page
//         if (step.route) {
//             navigate(step.route);
//             return;
//         }

//         onSetEditTab?.(step.tab);
//         onEditProfileOpen?.();
//     };;

//     if (!isHome) return <div style={{ flex: 1, padding: "12px 12px", overflowY: "auto", background: "#fff", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
//         {children}</div>;

//     return (
//         <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto", background: "#fff" }}>
//             {/* Step 1 — Profile created */}
//             <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 10, background: "#fff" }}>
//                 <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                     <User size={17} color={T.textLight} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                     <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Create Your Mentor Profile</p>
//                     <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>You have successfully created your account</p>
//                 </div>
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid #16a34a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                     <CheckCircle size={16} color="#16a34a" />
//                 </div>
//             </div>

//             {/* Step 2 — Long term mentorship setup */}
//             <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
//                     <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                         <Users size={17} color={T.textLight} />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                         <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Setting Up Your Long Term Mentorship</p>
//                         <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>Let's get started with these essential setup steps.</p>
//                     </div>
//                 </div>

//                 {/* Sub-steps — NOW CLICKABLE */}
//                 {setupSteps.map((step, i) => {
//                     const StepIcon = step.icon;
//                     return (
//                         <div
//                             key={i}
//                             onClick={() => handleStepClick(step)}
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                                 padding: "13px 20px",
//                                 borderBottom: i < setupSteps.length - 1 ? `1px solid ${T.border}` : "none",
//                                 cursor: step.locked ? "not-allowed" : "pointer",
//                                 background: step.locked ? T.surface : "transparent",
//                                 transition: "background .15s",
//                                 opacity: step.locked ? 0.6 : 1,
//                             }}
//                             onMouseEnter={(e) => {
//                                 if (!step.locked) e.currentTarget.style.background = T.surface;
//                             }}
//                             onMouseLeave={(e) => {
//                                 if (!step.locked) e.currentTarget.style.background = "transparent";
//                             }}
//                         >
//                             <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
//                                 <StepIcon size={16} color={step.locked ? T.textLight : T.primary} />
//                                 <div>
//                                     <p style={{ fontFamily: F, fontSize: 13, color: step.locked ? T.textLight : T.textDark, fontWeight: 500, margin: 0 }}>
//                                         {step.label}
//                                     </p>
//                                     <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>
//                                         {step.description}
//                                     </p>
//                                 </div>
//                             </div>

//                             {step.done ? (
//                                 <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid #16a34a`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                     <CheckCircle size={14} color="#16a34a" />
//                                 </div>
//                             ) : step.locked ? (
//                                 <Lock size={15} color={T.textLight} />
//                             ) : (
//                                 <ChevronRight size={15} color={T.primary} />
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };


// // ═══════════════════════════════════════════════════════════════════════════════
// // MentorLayout — main export
// // ═══════════════════════════════════════════════════════════════════════════════
// const MentorLayout = ({ children }) => {
//     const [userData, setUserData] = useState(null);
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//     const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768); const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
//     const [editProfileTab, setEditProfileTab] = useState("overview");  // ← ADD THIS LINE


//     const navigate = useNavigate();
//     const location = useLocation();

//     const SIDEBAR_W = isMobile ? 0 : sidebarCollapsed ? 56 : 220;

//     useEffect(() => { const s = localStorage.getItem("userData"); if (s) setUserData(JSON.parse(s)); }, []);

//     const handleEditProfileClose = () => { setIsEditProfileOpen(false); const stored = localStorage.getItem("userData"); if (stored) setUserData(JSON.parse(stored)); };



//     // ← ADD THESE TWO FUNCTIONS:
//     const handleOpenEditProfile = () => {
//         setIsEditProfileOpen(true);
//     };

//     const handleSetEditTab = (tab) => {
//         setEditProfileTab(tab);
//     };

//     const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("authToken"); localStorage.removeItem("userData"); window.location.href = "/"; };
//     const isActiveRoute = (route) => { if (route === "/mentor/dashboard") return location.pathname === "/mentor/dashboard" || location.pathname === "/mentor/dashboard/"; return location.pathname.startsWith(route); };
//     const isHome = isActiveRoute("/mentor/dashboard");


//     // ADD this new useEffect after your existing ones:
//     useEffect(() => {
//         const handleResize = () => {
//             const mobile = window.innerWidth <= 768;
//             setIsMobile(mobile);
//             if (mobile) setSidebarCollapsed(true);
//         };
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);


//     return (
//         <>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         *,*::before,*::after{box-sizing:border-box}
//         body{margin:0;font-family:"DM Sans",-apple-system,sans-serif}
//         button{font-family:"DM Sans",-apple-system,sans-serif}
//         ::-webkit-scrollbar{width:4px;height:4px}
//         ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
//         nav button:hover{background:#f9fafb !important}
//         @media (max-width: 1024px) {
//   .right-panel { display: none !important; }
// }
//       `}</style>

//             <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#fff" }}>
//                 {/* ── Top Banner (matches image dark bar with yellow link) ── */}
//                 <div style={{ background: "#1a1a2e", color: "#e5e7eb", fontSize: 13, textAlign: "center", padding: "8px 16px", flexShrink: 0, fontFamily: F }}>
//                     Your Trials are switched off&nbsp;
//                     <button
//                         onClick={() => { setEditProfileTab("engagement"); setIsEditProfileOpen(true); }}
//                         style={{ color: "#ffffff", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 13, padding: 0 }}
//                     >Go to Trial Settings</button>                </div>

//                 <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
//                     {isMobile && !sidebarCollapsed && (
//                         <div
//                             onClick={() => setSidebarCollapsed(true)}
//                             style={{
//                                 position: "fixed",
//                                 inset: 0,
//                                 background: "rgba(0,0,0,0.45)",
//                                 zIndex: 99,
//                             }}
//                         />
//                     )}

//                     {/* ── Left Sidebar ── */}
//                     <aside style={{
//                         width: isMobile ? 220 : SIDEBAR_W,
//                         flexShrink: 0,
//                         borderRight: `1px solid ${T.border}`,
//                         background: "#fff",
//                         height: "100vh",
//                         position: isMobile ? "fixed" : "sticky",
//                         top: 0,
//                         left: 0,
//                         zIndex: isMobile ? 100 : "auto",
//                         display: "flex",
//                         flexDirection: "column",
//                         transition: "transform .25s ease, width .2s ease",
//                         overflow: "hidden",
//                         transform: isMobile ? (sidebarCollapsed ? "translateX(-100%)" : "translateX(0)") : "none",
//                     }}>

//                         <SidebarContent
//                             collapsed={sidebarCollapsed}
//                             isActiveRoute={isActiveRoute}
//                             onNavClick={() => { if (isMobile) setSidebarCollapsed(true); }}
//                         />
//                         {/* Support Centre footer inside sidebar — matches image */}
//                         <div
//                             style={{
//                                 borderTop: `1px solid ${T.border}`,
//                                 padding: "12px 10px",
//                                 flexShrink: 0,
//                             }}
//                         >
//                             {!sidebarCollapsed && (
//                                 <button
//                                     onClick={() => navigate("/mentor-dashboard/support")}
//                                     style={{
//                                         width: "100%",
//                                         padding: "8px 12px",
//                                         border: `1px solid ${T.border}`,
//                                         borderRadius: 8,
//                                         background: "#fff",
//                                         fontFamily: F,
//                                         fontSize: 12,
//                                         color: T.textDark,
//                                         cursor: "pointer",
//                                         textAlign: "center",
//                                         fontWeight: 400,
//                                     }}
//                                 >
//                                     Support Centre
//                                 </button>
//                             )}
//                         </div>
//                     </aside>

//                     {/* ── Main area ── */}
//                     <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

//                         {/* ── Header (matches image — logo area blank, right side icons) ── */}
//                         <header style={{ height: 56, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "#fff", flexShrink: 0, position: "sticky", top: 0, zIndex: 40 }}>
//                             <button onClick={() => setSidebarCollapsed((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDark, display: "flex", alignItems: "center" }}>
//                                 <Menu size={20} />
//                             </button>

//                             {/* Right — icons matching image */}
//                             <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
//                                 <button
//                                     onClick={() => navigate("/mentor-dashboard/support")}
//                                     style={{
//                                         background: "none",
//                                         border: "none",
//                                         cursor: "pointer",
//                                         color: T.textLight,
//                                         display: "flex"
//                                     }}
//                                 >
//                                     <HelpCircle size={20} />
//                                 </button>

//                                 <button onClick={() => setIsProfileDropdownOpen((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
//                                     <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.btn, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, overflow: "hidden" }}>
//                                         {userData?.profilePhoto ? <img src={userData.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : userData?.name?.charAt(0) || "M"}
//                                     </div>
//                                     <ChevronDown size={14} color={T.textLight} />
//                                 </button>
//                                 <ProfileDropdown isOpen={isProfileDropdownOpen} onClose={() => setIsProfileDropdownOpen(false)} onLogoutClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} onEditProfile={() => setIsEditProfileOpen(true)} />
//                             </div>
//                         </header>

//                         {/* ── Body: center + right panel ── */}
//                         <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
//                             <CenterContent
//                                 isHome={isHome}
//                                 onEditProfileOpen={handleOpenEditProfile}
//                                 onSetEditTab={handleSetEditTab}
//                             >
//                                 {children}
//                             </CenterContent>                            <RightPanel />
//                         </div>

//                         {/* ── Footer (matches image bottom bar) ── */}
//                         <footer style={{ borderTop: `1px solid ${T.border}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#fff", flexWrap: "wrap", gap: 8 }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                                 <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>• Mentorship Policies</span>
//                             </div>
//                             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                                 {[
//                                     { icon: <Star size={13} />, label: "Feature Request" },
//                                     { icon: <Wrench size={13} />, label: "Support Request" },
//                                     { icon: <Bug size={13} />, label: "Report a Bug" },
//                                 ].map(({ icon, label }) => (
//                                     <button key={label} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", fontFamily: F, fontSize: 12, color: T.textMid, cursor: "pointer", padding: 0 }}>
//                                         {icon}{label}
//                                     </button>
//                                 ))}
//                                 <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>mentor-support@Karrivo.in</span>
//                             </div>
//                         </footer>
//                     </div>
//                 </div>
//             </div>

//             {/* Need Help tab */}
//             <NeedHelpPanel />



//             <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
//             {isEditProfileOpen && <EditMentorProfile onClose={handleEditProfileClose} />}
//         </>
//     );
// };

// export default MentorLayout;



import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Home, CalendarCheck, Users, Clock, Star, X, Menu,
    Headphones, ChevronRight, Plus, Trash2, Loader2, Eye, CheckCircle,
    Calendar, Briefcase, Award, FileText, Globe, AlertCircle, Pencil,
    MessageCircle, Video, Trophy, BadgeCheck, Target, Upload, Camera,
    HelpCircle, User, ChevronDown, Lock, ArrowUpRight, Copy,
    CheckSquare, Mail, Wallet, Share2, BookOpen, Wrench, Bug,
    Settings, UserCircle,
    TrendingUp, LogOut
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorProfile/mentorprofileapi";
import Loader from "../../global/Loader";
import Karrivo from "../../assets/karrivoSymbol.png"
// ── Constants ──────────────────────────────────────────────────────────────────
const F = `Cambria`;
const MAX_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const NAV_ORDER = ["overview", "experience", "engagement", "mentorship", "achievements"];
// ── Color tokens ───────────────────────────────────────────────────────────────
const T = {
    primary: "#0098cc",
    btn: "#1a1a2e",
    bg: "#ffffff",
    surface: "#f5f7fa",
    border: "#e2e6ec",
    borderMed: "#cdd3dc",
    textDark: "#111827",
    textMid: "#4b5563",
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

// ── Helpers ────────────────────────────────────────────────────────────────────
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; };
const splitCSV = (str) => (str || "").split(",").map((s) => s.trim()).filter(Boolean);
const joinCSV = (arr) => arr.join(", ");
const slotCount = (s, e) => {
    const [sh, sm] = s.split(":").map(Number), [eh, em] = e.split(":").map(Number);
    return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30);
};

// ── Profile completion ─────────────────────────────────────────────────────────
const calcCompletion = (fd) => {
    const fields = [
        fd?.fullName, fd?.currentRole, fd?.location, fd?.whyMentor,
        fd?.currentSkills, fd?.yearsOfExperience, fd?.hourlyRate,
        fd?.companyName, fd?.languages?.length, fd?.guidanceAreas?.length,
        fd?.certifications?.length, fd?.accomplishments?.length,
        fd?.profilePhoto, fd?.linkedinUrl,
    ];
    return Math.round((fields.filter((v) => v && v !== "" && v !== 0).length / fields.length) * 100);
};

// ── Shared styles ──────────────────────────────────────────────────────────────
const inp = (err) => ({
    fontFamily: F, width: "100%", padding: "9px 12px", boxSizing: "border-box",
    border: `1.5px solid ${err ? T.error : T.borderMed}`, borderRadius: 8,
    fontSize: 13, color: T.textDark, background: T.bg, outline: "none", lineHeight: 1.6,
});
const lbl = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 5px", display: "block" };
const secHead = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 5 };

// ── Pill ───────────────────────────────────────────────────────────────────────
const PILL_PALETTES = {
    blue: { bg: T.primaryBg, bd: T.primaryBd, c: T.primary },
    amber: { bg: "#fef3c7", bd: "#fcd34d", c: "#b45309" },
    teal: { bg: "#f0fdf4", bd: "#86efac", c: "#15803d" },
    purple: { bg: "#f5f3ff", bd: "#c4b5fd", c: "#7c3aed" },
};
const Pill = ({ label, onRemove, col = "blue" }) => {
    const p = PILL_PALETTES[col] || PILL_PALETTES.blue;
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px 3px 11px", borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: "nowrap" }}>
            {label}
            {onRemove && <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: 0.6, display: "flex", alignItems: "center" }}>×</button>}
        </span>
    );
};

const TagRow = ({ placeholder, valKey, field, isArr, tagInputs, setTagInp, addArr, addCSV }) => (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
            value={tagInputs[valKey]}
            onChange={(e) => setTagInp(valKey, e.target.value)}
            onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); isArr ? addArr(field, valKey) : addCSV(field, valKey); } }}
            placeholder={placeholder}
            style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: "8px 11px", border: `1.5px solid ${T.borderMed}`, borderRadius: 7, color: T.textDark, background: T.bg, outline: "none", boxSizing: "border-box" }}
        />
        <button type="button" onClick={() => isArr ? addArr(field, valKey) : addCSV(field, valKey)}
            style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: F }}>Add</button>
    </div>
);

const FieldErr = ({ msg }) => msg ? (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: T.error }}>
        <AlertCircle size={10} />{msg}
    </div>
) : null;

const CompletionBar = ({ pct }) => (
    <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, background: T.surface }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px" }}>Profile Completion</span>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: T.border, borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error, borderRadius: 100, transition: "width .4s ease" }} />
        </div>
        {pct < 100 && <p style={{ fontFamily: F, fontSize: 10, color: T.textLight, margin: "5px 0 0" }}>Complete your profile to get more bookings</p>}
    </div>
);


function EditMentorProfile({ onClose, initialTab = "overview" }) {
    const [formData, setFormData] = useState({ availability: [] });
    const [email, setEmail] = useState("");
    const [modalTab, setModalTab] = useState(initialTab);
    const [modalErrors, setModalErrors] = useState({});
    const [tagInputs, setTagInputs] = useState({ skill: "", lang: "", guid: "", cert: "", accomp: "" });
    const [availDateFrom, setAvailDateFrom] = useState("");
    const [availDateTo, setAvailDateTo] = useState("");
    const [availWeekdays, setAvailWeekdays] = useState(true);
    const [availBlockStart, setAvailBlockStart] = useState("09:00");
    const [availBlockEnd, setAvailBlockEnd] = useState("12:00");
    const [availTimeBlocks, setAvailTimeBlocks] = useState([]);
    const [availErr, setAvailErr] = useState("");
    const [photoProgress, setPhotoProgress] = useState(0);
    const [photoStatus, setPhotoStatus] = useState("idle");
    const [photoErrMsg, setPhotoErrMsg] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
    const [photoDragging, setPhotoDragging] = useState(false);
    const photoInputRef = useRef(null);
    const serverRef = useRef(null);


    // Mentorship Delivery states
    const [ltmMenteeLimit, setLtmMenteeLimit] = useState("3");
    const [sessionsFrequency, setSessionsFrequency] = useState("");
    const [mentorshipPitch, setMentorshipPitch] = useState("");

    // Mentee Preference states
    const [primaryExpertise, setPrimaryExpertise] = useState("");
    const [secondaryExpertise, setSecondaryExpertise] = useState("");
    const [personaFreshers, setPersonaFreshers] = useState(false);
    const [personaExperienced, setPersonaExperienced] = useState(false);

    // Trial Preference states
    const [trialDuration, setTrialDuration] = useState("");
    const [trialSessionFrequency, setTrialSessionFrequency] = useState("");
    const [trialMenteeLimit, setTrialMenteeLimit] = useState("1");


    const [getMentorDetails, { data, isLoading }] = useGetMentorDetailsMutation();
    const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

    useEffect(() => { const ud = localStorage.getItem("userData"); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
    useEffect(() => { if (email) getMentorDetails(email); }, [email]);
    useEffect(() => {
        if (data?.data) {
            serverRef.current = data.data;
            setFormData({ ...data.data });
            // Load mentorship data
            setLtmMenteeLimit(data.data.ltmMenteeLimit || "3");
            setSessionsFrequency(data.data.sessionsFrequency || "");
            setMentorshipPitch(data.data.mentorshipPitch || "");
            setPrimaryExpertise(data.data.primaryExpertise || "");
            setSecondaryExpertise(data.data.secondaryExpertise || "");
            setPersonaFreshers(data.data.personaFreshers || false);
            setPersonaExperienced(data.data.personaExperienced || false);
            setTrialDuration(data.data.trialDuration || "");
            setTrialSessionFrequency(data.data.trialSessionFrequency || "");
            setTrialMenteeLimit(data.data.trialMenteeLimit || "1");
        }
    }, [data]); useEffect(() => { if (formData.profilePhoto && photoStatus === "idle") setPhotoPreview(formData.profilePhoto); }, [formData.profilePhoto]);

    const completion = calcCompletion(formData);
    const skills = splitCSV(formData.currentSkills);
    const langs = Array.isArray(formData.languages) ? formData.languages : [];
    const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
    const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
    const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
    const availFlat = (formData.availability || []).filter((s) => s.date).map((s) => ({ ...s, ds: new Date(s.date).toISOString().split("T")[0] })).sort((a, b) => new Date(a.ds) - new Date(b.ds));

    const set = (f, v) => setFormData((p) => ({ ...p, [f]: v }));
    const setTagInp = (k, v) => setTagInputs((p) => ({ ...p, [k]: v }));
    const addCSV = (field, key) => { const v = tagInputs[key].trim(); if (!v) return; const arr = splitCSV(formData[field]); if (!arr.includes(v)) set(field, joinCSV([...arr, v])); setTagInp(key, ""); };
    const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter((s) => s !== val)));
    const addArr = (field, key) => { const v = tagInputs[key].trim(); if (!v) return; const arr = Array.isArray(formData[field]) ? formData[field] : []; if (!arr.includes(v)) set(field, [...arr, v]); setTagInp(key, ""); };
    const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter((x) => x !== val));
    const tagRowShared = { tagInputs, setTagInp, addArr, addCSV };

    const handleClose = () => { if (serverRef.current) setFormData({ ...serverRef.current }); onClose?.(); };
    const handleSave = async (shouldClose = true) => {
        try {
            const enriched = {
                ...formData,


                ltmMenteeLimit,
                sessionsFrequency,
                mentorshipPitch,
                primaryExpertise,
                secondaryExpertise,
                personaFreshers,
                personaExperienced,
                trialDuration,
                trialSessionFrequency,
                trialMenteeLimit,
                availability: (formData.availability || []).map((slot) => { if (slot.day) return slot; const ds = new Date(slot.date).toISOString().split("T")[0]; return { ...slot, day: new Date(ds + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" }) }; })
            };
            await updateMentorDetails({ email, ...enriched }).unwrap();
            if (shouldClose) onClose?.();
            getMentorDetails(email);
        } catch { }
    };

    useEffect(() => {
        if (initialTab) {
            setModalTab(initialTab);
            setModalErrors({});
        }
    }, [initialTab]);

    const validate = (tab) => {
        const e = {};
        if (tab === "overview") { if (!formData.fullName?.trim()) e.fullName = "Required."; if (!formData.currentRole?.trim()) e.role = "Required."; }
        if (tab === "experience") { if (!formData.yearsOfExperience) e.yoe = "Required."; if (!formData.hourlyRate) e.rate = "Required."; }
        setModalErrors(e); return !Object.keys(e).length;
    };

    const handleModalSave = async () => { if (!validate(modalTab)) return; await handleSave(true); };
    const handleModalNext = async () => {
        if (!validate(modalTab)) return;
        await handleSave(false);
        const idx = NAV_ORDER.indexOf(modalTab);
        if (idx < NAV_ORDER.length - 1) { setModalTab(NAV_ORDER[idx + 1]); setModalErrors({}); }
    };

    const handlePhotoFile = useCallback((file) => {
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) { setPhotoErrMsg("Only JPG, PNG, WebP or GIF."); setPhotoStatus("error"); return; }
        if (file.size > MAX_MB * 1024 * 1024) { setPhotoErrMsg(`Max ${MAX_MB} MB.`); setPhotoStatus("error"); return; }
        const reader = new FileReader();
        setPhotoStatus("uploading"); setPhotoProgress(0); setPhotoErrMsg("");
        reader.onprogress = (e) => { if (e.lengthComputable) setPhotoProgress(Math.round((e.loaded / e.total) * 100)); };
        reader.onload = (e) => { const base64 = e.target.result; setPhotoPreview(base64); setPhotoProgress(100); setPhotoStatus("done"); set("profilePhoto", base64); try { const ud = JSON.parse(localStorage.getItem("userData") || "{}"); ud.profilePhoto = base64; localStorage.setItem("userData", JSON.stringify(ud)); } catch { } };
        reader.onerror = () => { setPhotoErrMsg("Failed to read file."); setPhotoStatus("error"); };
        reader.readAsDataURL(file);
    }, []);

    const clearPhoto = (e) => { e?.stopPropagation(); setPhotoPreview(""); setPhotoStatus("idle"); setPhotoProgress(0); setPhotoErrMsg(""); set("profilePhoto", ""); if (photoInputRef.current) photoInputRef.current.value = ""; try { const ud = JSON.parse(localStorage.getItem("userData") || "{}"); delete ud.profilePhoto; localStorage.setItem("userData", JSON.stringify(ud)); } catch { } };

    const availChunkBlock = (start, end) => {
        const chunks = []; let [h, m] = start.split(":").map(Number); const [eh, em] = end.split(":").map(Number);
        while (h * 60 + m < eh * 60 + em) { const s = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`; m += 30; if (m >= 60) { h++; m -= 60; } chunks.push({ startTime: s, endTime: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` }); }
        return chunks;
    };

    const availTotalDays = (() => { if (!availDateFrom || !availDateTo) return 0; let count = 0, cur = new Date(availDateFrom), to = new Date(availDateTo); while (cur <= to) { const d = cur.getDay(); if (!availWeekdays || (d !== 0 && d !== 6)) count++; cur.setDate(cur.getDate() + 1); } return count; })();
    const availTotalSlots = availTotalDays * availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0);

    const availAddBlock = () => {
        setAvailErr("");
        const [sh, sm] = availBlockStart.split(":").map(Number), [eh, em] = availBlockEnd.split(":").map(Number);
        if (sh * 60 + sm >= eh * 60 + em) { setAvailErr("End must be after start."); return; }
        if (slotCount(availBlockStart, availBlockEnd) < 1) { setAvailErr("Block must be ≥ 30 min."); return; }
        for (const b of availTimeBlocks) { const [bsh, bsm] = b.start.split(":").map(Number), [beh, bem] = b.end.split(":").map(Number); if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setAvailErr(`Overlaps with ${b.start}–${b.end}`); return; } }
        setAvailTimeBlocks((p) => [...p, { start: availBlockStart, end: availBlockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
        setAvailBlockStart("09:00"); setAvailBlockEnd("12:00");
    };

    const availGenerate = () => {
        setAvailErr("");
        if (!availDateFrom || !availDateTo) { setAvailErr("Select a date range."); return; }
        if (!availTimeBlocks.length) { setAvailErr("Add at least one time block."); return; }

        // Build the full set of dates this generation would cover
        const coveredDates = new Set();
        let cur = new Date(availDateFrom), to = new Date(availDateTo);
        while (cur <= to) {
            const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0];
            if (!availWeekdays || (dow !== 0 && dow !== 6)) coveredDates.add(dateStr);
            cur.setDate(cur.getDate() + 1);
        }

        // Check if any existing BOOKED slot falls inside the date+time range being generated
        const conflictingBooked = (formData.availability || []).filter((s) => {
            if (!s.isBooked) return false;
            const ds = new Date(s.date).toISOString().split("T")[0];
            if (!coveredDates.has(ds)) return false;
            // check if this booked slot's time overlaps any of the new time blocks
            const [bh, bm] = s.startTime.split(":").map(Number);
            const bMins = bh * 60 + bm;
            return availTimeBlocks.some((block) => {
                const [sh, sm] = block.start.split(":").map(Number);
                const [eh, em] = block.end.split(":").map(Number);
                return bMins >= sh * 60 + sm && bMins < eh * 60 + em;
            });
        });

        if (conflictingBooked.length > 0) {
            const examples = conflictingBooked.slice(0, 3).map((s) => {
                const d = new Date(new Date(s.date).toISOString().split("T")[0] + "T00:00:00");
                return `${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at ${s.startTime}`;
            });
            const more = conflictingBooked.length > 3 ? ` +${conflictingBooked.length - 3} more` : "";
            setAvailErr(`Cannot regenerate — ${conflictingBooked.length} booked slot${conflictingBooked.length > 1 ? "s" : ""} fall in this range: ${examples.join(", ")}${more}. Remove the booked dates from your range or contact support to cancel those bookings first.`);
            return;
        }

        const newSlots = [];
        cur = new Date(availDateFrom); to = new Date(availDateTo);
        while (cur <= to) { const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0]; if (!availWeekdays || (dow !== 0 && dow !== 6)) for (const block of availTimeBlocks) for (const chunk of availChunkBlock(block.start, block.end)) newSlots.push({ date: dateStr, startTime: chunk.startTime, endTime: chunk.endTime, isBooked: false }); cur.setDate(cur.getDate() + 1); }
        const seen = new Set();
        const unique = newSlots.filter((s) => { const k = `${s.date}_${s.startTime}`; if (seen.has(k)) return false; seen.add(k); return true; });
        setFormData((p) => ({ ...p, availability: [...(p.availability || []).filter((s) => s.isBooked), ...unique] }));
        setAvailDateFrom(""); setAvailDateTo(""); setAvailTimeBlocks([]); setAvailErr("");
    };

    const availRemoveSlot = (ds, startTime) => { const target = (formData.availability || []).find((s) => new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime); if (target?.isBooked) { setAvailErr(`Slot on ${ds} at ${startTime} is already booked by a mentee and cannot be removed.`); return; } setFormData((p) => ({ ...p, availability: (p.availability || []).filter((s) => !(new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime)) })); };
    const inputSt = { fontFamily: F, fontSize: 12, width: "100%", boxSizing: "border-box", border: `1.5px solid ${T.borderMed}`, borderRadius: 7, padding: "8px 10px", color: T.textDark, background: T.bg, outline: "none", colorScheme: "light" };

    const modalNav = [
        { id: "overview", label: "Profile", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "engagement", label: "Engagement", icon: MessageCircle },
        { id: "mentorship", label: "Mentorship", icon: Users },
        { id: "achievements", label: "Achievements", icon: Trophy },
    ];

    if (isLoading || Object.keys(formData).length < 2)
        return (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loader />
            </div>
        );

    return (
        <>
            <style>{`
        /* Cambria is a system serif font — no external import needed */
        *,*::before,*::after{box-sizing:border-box}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
        .edit-modal input:focus,.edit-modal textarea:focus,.edit-modal select:focus{border-color:${T.primary}!important;outline:none;box-shadow:0 0 0 3px ${T.primaryBg}}
        .em-nav-btn.em-active:hover{background:#1a1a2e!important;color:#fff!important;}
        .em-nav-btn:not(.em-active):hover{background:${T.primaryBg}!important;color:${T.primary}!important;}
        .edit-modal ::-webkit-scrollbar{width:5px}
        .edit-modal ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
        .edit-modal ::placeholder{color:${T.textLight}!important;font-family:Cambria,"Times New Roman",Georgia,serif!important}
        .edit-modal input[type="time"]::-webkit-calendar-picker-indicator,
        .edit-modal input[type="date"]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
        .modal-card{animation:fadeIn .2s ease}
        .edit-modal input,.edit-modal textarea,.edit-modal select,.edit-modal button{font-family:Cambria,"Times New Roman",Georgia,serif!important}

        /* ── Responsive overrides ───────────────────────── */

        /* Overlay: no padding on mobile, slide-up from bottom */
        .em-overlay { padding: 20px 60px; align-items: center; }
        @media (max-width: 640px) {
          .em-overlay { padding: 0 !important; align-items: flex-end !important; }
        }

        /* Card: rounded bottom-sheet on mobile */
        .em-card { border-radius: 18px; max-width: 820px; max-height: 92vh; }
        @media (max-width: 640px) {
          .em-card {
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            max-height: 96dvh !important;
            height: 96dvh !important;
          }
        }

        /* Body row → column on mobile */
        .em-body { display: flex; flex: 1; min-height: 0; overflow: hidden; }
        @media (max-width: 640px) { .em-body { flex-direction: column; } }

        /* Sidebar: vertical desktop → horizontal tab strip mobile */
        .em-sidebar {
          background: ${T.surface};
          border-right: 1px solid ${T.border};
          width: 180px; flex-shrink: 0;
          display: flex; flex-direction: column;
        }
        @media (max-width: 640px) {
          .em-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid ${T.border};
            flex-direction: row;
          }
        }

        /* Nav list → horizontal row */
        .em-nav {
          display: flex; flex-direction: column;
          gap: 3px; padding: 14px 10px;
          flex: 1; overflow: auto;
        }
        @media (max-width: 640px) {
          .em-nav {
            flex-direction: row !important;
            gap: 0 !important; padding: 0 !important;
            overflow-x: auto; overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .em-nav::-webkit-scrollbar { display: none; }
        }

        /* Individual tab button */
        .em-nav-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px; border-radius: 9px;
          font-size: 12.5px; font-weight: 700; font-family: Cambria,"Times New Roman",Georgia,serif;
          cursor: pointer; white-space: nowrap; transition: all .15s;
        }
        @media (max-width: 640px) {
          .em-nav-btn {
            flex: 1; justify-content: center; flex-direction: column;
            gap: 4px !important; border-radius: 0 !important;
            padding: 10px 6px !important; font-size: 10px !important;
            border: none !important;
            border-bottom: 2.5px solid transparent !important;
            background: transparent !important;
          }
          .em-nav-btn.em-active {
            border-bottom-color: ${T.primary} !important;
            color: ${T.primary} !important;
            background: ${T.primaryBg} !important;
          }
          /* hide the chevron on mobile */
          .em-nav-chevron { display: none !important; }
        }

        /* Hide completion bar in sidebar on mobile (% already in header) */
        .em-completion-bar { display: block; }
        @media (max-width: 640px) { .em-completion-bar { display: none; } }

        /* Content padding */
        .em-content { flex: 1; overflow: auto; padding: 24px; }
        @media (max-width: 640px) { .em-content { padding: 16px !important; } }

        /* Grids → single column on mobile */
        .em-grid-main  { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; }
        .em-grid-edu   { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
        .em-grid-2col  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .em-grid-date  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
        @media (max-width: 640px) {
          .em-grid-main, .em-grid-edu, .em-grid-2col { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .em-grid-date { grid-template-columns: 1fr !important; }
        }

        /* Availability slot cards: 5 → 3 → 2 cols */
        .em-avail-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px; }
        @media (max-width: 640px) { .em-avail-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 380px) { .em-avail-grid { grid-template-columns: repeat(2, 1fr) !important; } }

        /* Time block row wraps on small screens */
        .em-time-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-end; margin-bottom: 10px; }
        @media (max-width: 480px) { .em-time-row > div { flex: 1 1 40%; min-width: 80px; } }

        /* Footer: stack buttons full-width on mobile, hide Cancel */
        .em-footer {
          display: flex; gap: 8px; padding: 14px 20px;
          border-top: 1px solid ${T.border}; background: ${T.surface};
          flex-shrink: 0; justify-content: space-between;
          align-items: center; flex-wrap: wrap;
        }
        .em-footer-actions { display: flex; gap: 8px; }
        @media (max-width: 640px) {
          .em-footer { padding: 10px 14px !important; }
          .em-cancel-btn { display: none !important; }
          .em-footer-actions { width: 100%; }
          .em-footer-actions button { flex: 1; justify-content: center; }
        }
      `}</style>

            {/* ── Overlay ── */}
            <div className="edit-modal em-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", justifyContent: "center" }}>

                {/* ── Card ── */}
                <div className="modal-card em-card" style={{ background: T.bg, width: "100%", display: "flex", flexDirection: "column", boxShadow: "0 32px 100px rgba(0,0,0,0.3)", border: `1px solid ${T.border}`, overflow: "hidden" }}>

                    {/* Header — unchanged */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: `1px solid ${T.border}`, flexShrink: 0, background: T.surface }}>
                        <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                            <Pencil size={15} color={T.primary} /> Edit Profile
                        </h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: completion >= 80 ? T.success : completion >= 50 ? T.warning : T.error, background: completion >= 80 ? T.successBg : completion >= 50 ? T.warningBg : T.errorBg, border: `1px solid ${completion >= 80 ? "#86efac" : completion >= 50 ? "#fcd34d" : "#fca5a5"}`, borderRadius: 20, padding: "3px 10px" }}>
                                {completion}% complete
                            </div>
                            <button onClick={handleClose} disabled={isSaving} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center" }}><X size={16} /></button>
                        </div>
                    </div>

                    {/* ── Body ── */}
                    <div className="em-body">

                        {/* ── Sidebar / Tab Strip ── */}
                        <div className="em-sidebar">
                            <nav className="em-nav">
                                {modalNav.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => { setModalTab(id); setModalErrors({}); }}
                                        className={`em-nav-btn${modalTab === id ? " em-active" : ""}`}
                                        style={{
                                            background: modalTab === id ? T.btn : "transparent",
                                            color: modalTab === id ? "#fff" : T.textMid,
                                            border: `1px solid ${modalTab === id ? T.btn : "transparent"}`,
                                        }}
                                    >
                                        <Icon size={14} />
                                        {label}
                                        <ChevronRight size={12} className="em-nav-chevron" style={{ marginLeft: "auto" }} />
                                    </button>
                                ))}
                            </nav>
                            <div className="em-completion-bar">
                                <CompletionBar pct={completion} />
                            </div>
                        </div>

                        {/* ── Content ── */}
                        <div className="em-content">
                            {modalTab === "overview" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Basic Information</h3>
                                    <div>
                                        <span style={lbl}>Profile Photo</span>
                                        <div onDrop={(e) => { e.preventDefault(); setPhotoDragging(false); handlePhotoFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => { e.preventDefault(); setPhotoDragging(true); }} onDragLeave={() => setPhotoDragging(false)} onClick={() => photoStatus !== "uploading" && photoInputRef.current?.click()} style={{ borderRadius: 12, border: `2px dashed ${photoDragging ? T.primary : photoStatus === "error" ? T.error : T.borderMed}`, background: photoDragging ? T.primaryBg : T.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: photoStatus === "uploading" ? "not-allowed" : "pointer", overflow: "hidden", minHeight: 70 }}>
                                            <input ref={photoInputRef} type="file" accept={ALLOWED_TYPES.join(",")} style={{ display: "none" }} onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
                                            {photoPreview ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%" }}>
                                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                                        <img src={photoPreview} alt="preview" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: `2px solid ${photoStatus === "done" ? T.success : T.borderMed}`, display: "block" }} onError={(e) => (e.target.style.display = "none")} />
                                                        {photoStatus === "done" && <div style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: T.success, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle size={9} color="#fff" /></div>}
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        {photoStatus === "uploading" ? (<><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}><Loader2 size={11} color={T.primary} style={{ animation: "spin .9s linear infinite" }} /><span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Uploading… {photoProgress}%</span></div><div style={{ height: 3, background: T.border, borderRadius: 100, overflow: "hidden" }}><div style={{ height: "100%", width: `${photoProgress}%`, background: T.primary, borderRadius: 100, transition: "width .2s" }} /></div></>) : (<><span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: photoStatus === "done" ? T.success : T.textMid }}>{photoStatus === "done" ? "Uploaded!" : "Ready"}</span><p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>Click to replace</p></>)}
                                                    </div>
                                                    {photoStatus !== "uploading" && <button type="button" onClick={clearPhoto} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>}
                                                </div>
                                            ) : (
                                                <div style={{ textAlign: "center", padding: "20px" }}>
                                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{photoDragging ? <Upload size={17} color={T.primary} /> : <Camera size={17} color={T.primary} />}</div>
                                                    <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textMid, margin: "0 0 3px" }}>{photoDragging ? "Drop to upload" : "Upload Profile Photo"}</p>
                                                    <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
                                                </div>
                                            )}
                                        </div>
                                        {photoStatus === "error" && photoErrMsg && (<div style={{ display: "flex", alignItems: "center", gap: 5, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 7, padding: "7px 11px", fontFamily: F, fontSize: 11, color: T.error, marginTop: 6 }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{photoErrMsg}</div>)}
                                    </div>
                                    {/* ← className replaces inline gridTemplateColumns */}
                                    <div className="em-grid-main">
                                        <div><span style={lbl}>Full Name *</span><input style={inp(modalErrors.fullName)} value={formData.fullName || ""} onChange={(e) => { set("fullName", e.target.value); if (modalErrors.fullName) setModalErrors((p) => ({ ...p, fullName: "" })); }} placeholder="Your full name" /><FieldErr msg={modalErrors.fullName} /></div>
                                        <div><span style={lbl}>Professional Title *</span><input style={inp(modalErrors.role)} value={formData.currentRole || ""} onChange={(e) => { set("currentRole", e.target.value); if (modalErrors.role) setModalErrors((p) => ({ ...p, role: "" })); }} placeholder="e.g. Senior Engineer" /><FieldErr msg={modalErrors.role} /></div>
                                        <div><span style={lbl}>Location</span><input style={inp()} value={formData.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" /></div>
                                        <div><span style={lbl}>Phone</span><input style={inp()} value={formData.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+91 1234567890" /></div>
                                        <div><span style={lbl}>LinkedIn</span><input style={inp()} value={formData.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
                                        <div><span style={lbl}>Mentoring Style</span><input style={inp()} value={formData.mentoringStyle || ""} onChange={(e) => set("mentoringStyle", e.target.value)} placeholder="e.g. Collaborative" /></div>
                                    </div>
                                    <div><span style={lbl}>Bio / About</span><textarea style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }} rows={3} value={formData.whyMentor || ""} onChange={(e) => set("whyMentor", e.target.value)} placeholder="Share your professional journey…" /></div>
                                    <div>
                                        <span style={lbl}>Specialisations / Domains</span>
                                        <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "0 0 2px" }}>e.g. Data Science, Cloud Computing</p>
                                        <TagRow placeholder="Add a specialisation…" valKey="skill" field="currentSkills" {...tagRowShared} />
                                        {skills.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV("currentSkills", s)} />)}</div>}
                                    </div>
                                </div>
                            )}

                            {modalTab === "experience" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Professional Background</h3>
                                    <div className="em-grid-main">
                                        <div><span style={lbl}>Organisation</span><input style={inp()} value={formData.companyName || ""} onChange={(e) => set("companyName", e.target.value)} placeholder="e.g. Google" /></div>
                                        <div><span style={lbl}>Position</span><input style={inp()} value={formData.currentPosition || ""} onChange={(e) => set("currentPosition", e.target.value)} placeholder="e.g. Principal Engineer" /></div>
                                        <div><span style={lbl}>Years of Experience *</span><input type="number" style={inp(modalErrors.yoe)} value={formData.yearsOfExperience || ""} onChange={(e) => { set("yearsOfExperience", e.target.value); if (modalErrors.yoe) setModalErrors((p) => ({ ...p, yoe: "" })); }} placeholder="e.g. 8" /><FieldErr msg={modalErrors.yoe} /></div>
                                        <div><span style={lbl}>Hourly Rate (₹) *</span><input type="number" style={inp(modalErrors.rate)} value={formData.hourlyRate || ""} onChange={(e) => { set("hourlyRate", e.target.value); if (modalErrors.rate) setModalErrors((p) => ({ ...p, rate: "" })); }} placeholder="e.g. 1500" /><FieldErr msg={modalErrors.rate} /></div>
                                    </div>
                                    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                        <p style={{ ...secHead, marginBottom: 12 }}><Award size={11} color={T.primary} /> Educational Background</p>
                                        <div className="em-grid-edu">
                                            <div><span style={lbl}>Highest Degree</span><select value={formData.highestDegree || ""} onChange={(e) => set("highestDegree", e.target.value)} style={{ ...inp(), background: T.bg }}><option value="">Select degree</option>{["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}</select></div>
                                            <div><span style={lbl}>Field of Study</span><input style={inp()} value={formData.fieldOfStudy || ""} onChange={(e) => set("fieldOfStudy", e.target.value)} placeholder="e.g. Computer Science" /></div>
                                            <div><span style={lbl}>Institution</span><input style={inp()} value={formData.schoolName || ""} onChange={(e) => set("schoolName", e.target.value)} placeholder="e.g. IIT Bombay" /></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalTab === "engagement" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Engagement</h3>
                                    <div>
                                        <p style={secHead}><Calendar size={11} color={T.primary} /> Availability</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: "14px 16px" }}>
                                                <p style={{ ...secHead, marginBottom: 10 }}><Calendar size={10} color={T.primary} /> Date Range</p>
                                                <div className="em-grid-date">
                                                    <div><span style={lbl}>From</span><input type="date" value={availDateFrom} min={tomorrow()} onChange={(e) => { setAvailDateFrom(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
                                                    <div><span style={lbl}>To</span><input type="date" value={availDateTo} min={availDateFrom || tomorrow()} onChange={(e) => { setAvailDateTo(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
                                                </div>
                                                <button type="button" onClick={() => setAvailWeekdays((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                                    <div style={{ width: 34, height: 18, borderRadius: 100, background: availWeekdays ? T.primary : T.border, position: "relative", transition: "background .2s", flexShrink: 0 }}><div style={{ position: "absolute", top: 2, left: availWeekdays ? 16 : 2, width: 10, height: 10, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} /></div>
                                                    <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
                                                </button>
                                                {availDateFrom && availDateTo && <div style={{ marginTop: 10, padding: "7px 11px", borderRadius: 7, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600 }}>📅 {availTotalDays} day{availTotalDays !== 1 ? "s" : ""} selected{availWeekdays ? " (weekdays only)" : " (incl. weekends)"}</div>}
                                            </div>
                                            <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: "14px 16px" }}>
                                                <p style={{ ...secHead, marginBottom: 10 }}><Clock size={10} color={T.primary} /> Time Blocks</p>
                                                <div className="em-time-row">
                                                    <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>Start</span><input type="time" value={availBlockStart} onChange={(e) => setAvailBlockStart(e.target.value)} style={inputSt} /></div>
                                                    <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>End</span><input type="time" value={availBlockEnd} onChange={(e) => setAvailBlockEnd(e.target.value)} style={inputSt} /></div>
                                                    {availBlockStart && availBlockEnd && slotCount(availBlockStart, availBlockEnd) > 0 && <div style={{ padding: "7px 10px", borderRadius: 7, background: T.successBg, border: "1px solid #86efac", fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, alignSelf: "flex-end", flexShrink: 0 }}>{slotCount(availBlockStart, availBlockEnd)} slots</div>}
                                                    <button type="button" onClick={availAddBlock} style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-end", flexShrink: 0, fontFamily: F }}><Plus size={13} /> Add Block</button>
                                                </div>
                                                {availTimeBlocks.length > 0 ? (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                                        {availTimeBlocks.map((b, i) => (
                                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, background: T.primaryBg, border: `1px solid ${T.primaryBd}` }}>
                                                                <Clock size={12} color={T.primary} style={{ flexShrink: 0 }} />
                                                                <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, flex: 1 }}>{b.start} — {b.end}</span>
                                                                <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, background: T.successBg, border: "1px solid #86efac", padding: "2px 8px", borderRadius: 20 }}>{slotCount(b.start, b.end)} × 30 min/day</span>
                                                                <button type="button" onClick={() => setAvailTimeBlocks((p) => p.filter((_, j) => j !== i))} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 6, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : <div style={{ textAlign: "center", padding: 12, background: T.bg, border: `1px dashed ${T.border}`, borderRadius: 8 }}><p style={{ fontFamily: F, fontSize: 11.5, color: T.textLight, margin: 0 }}>Add blocks above — e.g. 9:00–12:00</p></div>}
                                            </div>
                                            {availTimeBlocks.length > 0 && availDateFrom && availDateTo && (
                                                <div style={{ padding: "12px 16px", borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                                    <div>
                                                        <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.textDark, margin: "0 0 2px" }}>⚡ {availTotalSlots} slots will be generated</p>
                                                        <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>{availTotalDays} days × {availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day · Duplicates skipped</p>
                                                    </div>
                                                    <button type="button" onClick={availGenerate} style={{ padding: "9px 18px", background: T.btn, color: "#fff", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: F }}><CheckCircle size={13} /> Generate</button>
                                                </div>
                                            )}
                                            {availErr && <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontFamily: F, fontSize: 11.5, color: T.error }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{availErr}</div>}
                                            {availFlat.length > 0 && (
                                                <div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                                        <span style={{ fontFamily: F, fontSize: 11, color: T.primary, fontWeight: 700 }}>{availFlat.length} total</span>
                                                        <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700 }}>● {availFlat.filter((s) => !s.isBooked).length} available</span>
                                                        {availFlat.filter((s) => s.isBooked).length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: T.warning, fontWeight: 700 }}>● {availFlat.filter((s) => s.isBooked).length} booked</span>}
                                                    </div>
                                                    <div className="em-avail-grid">
                                                        {availFlat.map((slot) => {
                                                            const d = new Date(slot.ds + "T00:00:00");
                                                            return (
                                                                <div key={`${slot.ds}_${slot.startTime}`} style={{ position: "relative", padding: "9px 6px", borderRadius: 9, textAlign: "center", background: slot.isBooked ? T.warningBg : T.primaryBg, border: `1px solid ${slot.isBooked ? "#fcd34d" : T.primaryBd}`, display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                                                                    <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: ".4px" }}>{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                                                                    <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: T.textDark, lineHeight: 1 }}>{d.getDate()}</div>
                                                                    <span style={{ fontFamily: F, fontSize: 8.5, color: T.textLight }}>{d.toLocaleDateString("en-IN", { month: "short" })} {d.getFullYear().toString().slice(2)}</span>
                                                                    <div style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: slot.isBooked ? T.warning : T.primary, background: T.bg, border: `1px solid ${slot.isBooked ? "#fcd34d" : T.primaryBd}`, borderRadius: 5, padding: "2px 5px", width: "100%", boxSizing: "border-box" }}>{slot.startTime}</div>
                                                                    <span style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: slot.isBooked ? T.warning : T.success }}>{slot.isBooked ? "Booked" : ""}</span>
                                                                    {!slot.isBooked && <button onClick={() => availRemoveSlot(slot.ds, slot.startTime)} style={{ position: "absolute", top: 3, right: 3, background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 3, width: 15, height: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}><X size={8} /></button>}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><Globe size={11} color={T.primary} /> Languages</p>
                                        <TagRow placeholder="e.g. English, Hindi" valKey="lang" field="languages" isArr {...tagRowShared} />
                                        {langs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr("languages", l)} />)}</div>}
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><Video size={11} color={T.primary} /> Mentorship Format</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {["Online", "Group Sessions", "One-on-One"].map((fmt) => {
                                                const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
                                                return (
                                                    <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set("mentorshipFormat", joinCSV(sel ? c.filter((s) => s !== fmt) : [...c, fmt])); }}
                                                        style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
                                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.primary : T.borderMed }} />{fmt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><MessageCircle size={11} color={T.primary} /> Contact / Booking</p>
                                        <div className="em-grid-2col">
                                            <div><span style={lbl}>Platform Messaging</span><input style={inp()} value={formData.platformMessaging || ""} onChange={(e) => set("platformMessaging", e.target.value)} placeholder="@username" /></div>
                                            <div><span style={lbl}>Calendar / Booking Link</span><input style={inp()} value={formData.calendarLink || ""} onChange={(e) => set("calendarLink", e.target.value)} placeholder="https://calendly.com/…" /></div>
                                        </div>
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><Target size={11} color={T.primary} /> Areas of Guidance</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                                            {["Career Prep", "Interview Coaching", "Technical Skills", "Soft Skills", "Leadership", "Resume Review", "Startup Guidance"].map((g) => {
                                                const sel = guidAreas.includes(g);
                                                return (
                                                    <button key={g} type="button" onClick={() => set("guidanceAreas", sel ? guidAreas.filter((x) => x !== g) : [...guidAreas, g])}
                                                        style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 8, border: `1.5px solid ${sel ? T.success : T.borderMed}`, background: sel ? T.successBg : T.bg, color: sel ? T.success : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.success : T.borderMed }} />{g}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <TagRow placeholder="Custom guidance area…" valKey="guid" field="guidanceAreas" isArr {...tagRowShared} />
                                        {guidAreas.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr("guidanceAreas", g)} />)}</div>}
                                    </div>
                                </div>
                            )}

                            {modalTab === "achievements" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Achievements & Credentials</h3>
                                    <div>
                                        <p style={secHead}><Trophy size={11} color={T.primary} /> Key Accomplishments</p>
                                        <TagRow placeholder="e.g. Led team that scaled to 1M users" valKey="accomp" field="accomplishments" isArr {...tagRowShared} />
                                        {accomps.length > 0 && (
                                            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
                                                {accomps.map((a, i) => (
                                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9 }}>
                                                        <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
                                                        <span style={{ fontFamily: F, fontSize: 12.5, color: T.textMid, flex: 1, wordBreak: "break-word" }}>{a}</span>
                                                        <button onClick={() => rmArr("accomplishments", a)} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 5, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><Trash2 size={11} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><BadgeCheck size={11} color={T.primary} /> Certifications</p>
                                        <TagRow placeholder="e.g. AWS Certified Solutions Architect" valKey="cert" field="certifications" isArr {...tagRowShared} />
                                        {certs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr("certifications", c)} />)}</div>}
                                    </div>
                                    <div style={{ height: 1, background: T.border }} />
                                    <div>
                                        <p style={secHead}><FileText size={11} color={T.primary} /> Portfolio / Media Links</p>
                                        <div style={{ background: T.warningBg, border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 14px", fontFamily: F, fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.7 }}>Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.</div>
                                        {[{ label: "Portfolio", field: "portfolioLink", placeholder: "https://drive.google.com/…" }, { label: "Intro Video", field: "videoLink", placeholder: "https://youtube.com/…" }].map(({ label, field, placeholder }) => (
                                            <div key={field} style={{ marginBottom: 12 }}>
                                                <span style={lbl}>{label}</span>
                                                <input style={inp()} value={formData[field] || ""} onChange={(e) => set(field, e.target.value)} placeholder={placeholder} />
                                                {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 5, textDecoration: "none" }}><Eye size={11} /> Preview →</a>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modalTab === "mentorship" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Mentorship Settings</h3>

                                    {/* MENTORSHIP DELIVERY SECTION */}
                                    <div>
                                        <p style={secHead}><Users size={11} color={T.primary} /> Mentorship Delivery</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            <div>
                                                <span style={lbl}>Active LTM Mentee Limit *</span>
                                                <select value={ltmMenteeLimit} onChange={(e) => setLtmMenteeLimit(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select limit</option>
                                                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n.toString()}>{`Max ${n} Mentees`}</option>)}
                                                </select>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>This helps is limiting the no if LTM mentee that you can have. When this limit is reached, trials will auto-turn off</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Sessions Frequency *</span>
                                                <select value={sessionsFrequency} onChange={(e) => setSessionsFrequency(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select...</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="bi-weekly">Bi-Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="as-needed">As Needed</option>
                                                </select>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Mention how often you plan to meet your mentees on a weekly basis</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Mentorship Pitch *</span>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                    <span style={{ fontFamily: F, fontSize: 11, color: T.textLight }}>Your mentorship pitch for the mentees</span>
                                                    <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: T.textMid }}>{mentorshipPitch.length}/1000</span>
                                                </div>
                                                <textarea
                                                    style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }}
                                                    rows={4}
                                                    value={mentorshipPitch}
                                                    onChange={(e) => setMentorshipPitch(e.target.value.slice(0, 1000))}
                                                    placeholder="Your mentorship pitch for the mentees"
                                                    maxLength="1000"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    {/* MENTEE PREFERENCES SECTION */}
                                    <div>
                                        <p style={secHead}><Users size={11} color={T.primary} /> Mentee Preferences</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            <div>
                                                <span style={lbl}>Select Primary Expertise *</span>
                                                <select value={primaryExpertise} onChange={(e) => setPrimaryExpertise(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select...</option>
                                                    <option value="frontend">Frontend Developer</option>
                                                    <option value="backend">Backend Developer</option>
                                                    <option value="fullstack">Full Stack Developer</option>
                                                    <option value="devops">DevOps Engineer</option>
                                                    <option value="datascience">Data Science</option>
                                                    <option value="ui-ux">UI/UX Designer</option>
                                                    <option value="product">Product Manager</option>
                                                </select>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Your primary domain</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Select Secondary Expertise</span>
                                                <select value={secondaryExpertise} onChange={(e) => setSecondaryExpertise(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select...</option>
                                                    <option value="frontend">Frontend Developer</option>
                                                    <option value="backend">Backend Developer</option>
                                                    <option value="fullstack">Full Stack Developer</option>
                                                    <option value="devops">DevOps Engineer</option>
                                                    <option value="datascience">Data Science</option>
                                                    <option value="ui-ux">UI/UX Designer</option>
                                                    <option value="product">Product Manager</option>
                                                </select>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Other domains from which you can cater mentees</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Persona *</span>
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setPersonaFreshers(!personaFreshers)}
                                                        style={{
                                                            padding: 16,
                                                            border: `2px solid ${personaFreshers ? T.primary : T.borderMed}`,
                                                            borderRadius: 10,
                                                            background: personaFreshers ? T.primaryBg : T.bg,
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: 10,
                                                            transition: "all .15s"
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={personaFreshers}
                                                            onChange={() => { }}
                                                            style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0, marginTop: 2 }}
                                                        />
                                                        <div style={{ textAlign: "left", flex: 1 }}>
                                                            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>Freshers</p>
                                                            <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "4px 0 0" }}>Mentees currently in college or seeking their first job.</p>
                                                        </div>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setPersonaExperienced(!personaExperienced)}
                                                        style={{
                                                            padding: 16,
                                                            border: `2px solid ${personaExperienced ? T.primary : T.borderMed}`,
                                                            borderRadius: 10,
                                                            background: personaExperienced ? T.primaryBg : T.bg,
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: 10,
                                                            transition: "all .15s"
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={personaExperienced}
                                                            onChange={() => { }}
                                                            style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0, marginTop: 2 }}
                                                        />
                                                        <div style={{ textAlign: "left", flex: 1 }}>
                                                            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>Experienced</p>
                                                            <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "4px 0 0" }}>Mentees aiming for career growth or considering domain change.</p>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                </div>
                            )}

                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="em-footer">
                        <button type="button" className="em-cancel-btn" onClick={handleClose} disabled={isSaving} style={{ fontFamily: F, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer" }}>Cancel</button>
                        <div className="em-footer-actions">
                            <button type="button" onClick={handleModalSave} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
                                {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : "Save"}
                            </button>
                            {modalTab !== NAV_ORDER[NAV_ORDER.length - 1] && (
                                <button type="button" onClick={handleModalNext} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 8, color: "#fff", background: T.btn, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
                                    {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Navigation items — matches image exactly
// ═══════════════════════════════════════════════════════════════════════════════
const navigationItems = [
    { id: "home", label: "Home", icon: Home, route: "/mentor/dashboard" },
    { id: "sessions", label: "Sessions", icon: BookOpen, route: "/mentor/dashboard/sessions" },
    { id: "Subscriptions & Sessions", label: "Subscriptions & Sessions", icon: Users, route: "/mentor/dashboard/my-mentee-sessions" },
    { id: "Pricing", label: " Pricing", icon: Wallet, route: "/mentor/dashboard/pricing" },
    {
        id: "manage_availability",
        label: "Manage Availability",
        icon: Calendar,
        route: "/mentor/dashboard/Manage_Availability"
    },
    { id: "Earnings", label: "Earnings", icon: Star, route: "/mentor/dashboard/Earnings" },
    { id: "testimonials", label: "Testimonials", icon: Star, route: "/mentor/dashboard/reviews" },
    { id: "support", label: "Help Request", icon: Headphones, route: "/mentor-dashboard/support" },
];

// ── Logout Modal ───────────────────────────────────────────────────────────────
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "0 16px" }}>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                <h2 style={{ fontFamily: F, color: T.primary, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Confirm Logout</h2>
                <p style={{ fontFamily: F, color: T.textMid, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>Are you sure you want to logout? You'll need to sign in again to access your account.</p>
                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={onClose} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: `1px solid ${T.btn}`, color: T.btn, background: "#fff", fontFamily: F, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Cancel</button>
                    <button onClick={onConfirm} style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: "none", background: T.btn, color: "#fff", fontFamily: F, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

// ── Profile Dropdown ───────────────────────────────────────────────────────────
const ProfileDropdown = ({ onLogoutClick, isOpen, onClose, onEditProfile }) => {
    const navigate = useNavigate();
    const [userinfo, setuserinfo] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => { const ud = localStorage.getItem("userData"); if (ud) setuserinfo(JSON.parse(ud)); }, []);
    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onClose?.(); };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, onClose]);

    const handleViewProfile = () => {
        const ud = localStorage.getItem("userData");
        if (ud) { try { const parsed = JSON.parse(ud); const mentorId = parsed._id || parsed.id; if (mentorId) { navigate(`/mentor-profile/${mentorId}`, { state: { type: "mentor" } }); onClose?.(); } } catch { } }
    };

    if (!isOpen) return null;
    return (
        <div ref={dropdownRef} style={{ position: "absolute", right: 0, top: 52, width: 240, background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: T.btn, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 13, flexShrink: 0, overflow: "hidden" }}>
                    {userinfo?.profilePhoto ? <img src={userinfo.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : userinfo?.name?.charAt(0) || "U"}
                </div>
                <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: F, color: T.primary, fontSize: 13, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.name || "User"}</p>
                    <p style={{ fontFamily: F, color: T.textLight, fontSize: 11, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userinfo?.email || ""}</p>
                </div>
            </div>
            <div style={{ padding: 6 }}>
                {[
                    {
                        label: "View Profile",
                        onClick: handleViewProfile,
                        color: T.textDark,
                        icon: (
                            <User
                                size={12}
                                color={T.primary}
                            />
                        ),
                    },

                    {
                        label: "Edit Profile",
                        onClick: () => {
                            onEditProfile?.();
                            onClose?.();
                        },
                        color: T.textDark,
                        icon: (
                            <Pencil
                                size={12}
                                color={T.primary}
                            />
                        ),
                    },

                    {
                        label: "Logout",
                        onClick: onLogoutClick,
                        color: T.error,
                        icon: (
                            <LogOut
                                size={12}
                                color={T.error}
                            />
                        ),
                    },

                ].map(({ label, onClick, color, icon }) => (
                    <button key={label} onClick={onClick}
                        style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 7, fontFamily: F, fontSize: 13, color, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
                        {icon}{label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// ── Need Help Panel ────────────────────────────────────────────────────────────
const NeedHelpPanel = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div style={{ position: "fixed", right: open ? 0 : -270, top: 0, bottom: 0, width: 270, background: "#fff", borderLeft: `1px solid ${T.border}`, zIndex: 999, transition: "right .25s ease", boxShadow: "-4px 0 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: 0 }}>Feeling Stuck?</p>
                        <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>We're here to help</p>
                    </div>
                    <button onClick={() => setOpen(false)} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex" }}><X size={14} /></button>
                </div>
                <div style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 8px" }}>Your POC</p>
                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Karrivo</p>
                        <p style={{ fontFamily: F, fontSize: 12, color: T.primary, margin: "0 0 10px", fontWeight: 600 }}>+91 9699039801</p>
                        <p style={{ fontFamily: F, fontSize: 11, color: T.textMid, margin: 0, lineHeight: 1.6 }}>Reach out whenever you need assistance or have questions.</p>
                    </div>
                    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: ".7px", margin: "0 0 10px" }}>Quick Help</p>
                        {["How to set up pricing?", "Managing your sessions", "Getting more bookings", "Profile best practices"].map((label) => (
                            <a key={label} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontFamily: F, fontSize: 12, color: T.textDark, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>
                                {label} <ChevronRight size={13} color={T.textLight} />
                            </a>
                        ))}
                    </div>
                    <a href="/mentor-dashboard/support" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", background: T.btn, color: "#fff", borderRadius: 10, fontFamily: F, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                        <Headphones size={15} /> Submit Support Request
                    </a>
                </div>
            </div>
        </>
    );
};

// ── Sidebar ────────────────────────────────────────────────────────────────────
const SidebarContent = ({ collapsed = false, isActiveRoute, onNavClick }) => {
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "80%", background: "#fff" }}>
            <div
                style={{
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `1px solid ${T.border}`,
                    padding: collapsed ? "0 16px" : "0 20px",
                    flexShrink: 0,
                }}
            >
                {!collapsed && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                            src={Karrivo}
                            alt="Logo"
                            style={{
                                width: 68,
                                height: 68,
                                objectFit: "contain",
                                borderRadius: 8,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: F,
                                fontSize: 15,
                                fontWeight: 600,
                                color: "#111827",
                            }}
                        >
                            Mentor Hub
                        </span>
                    </div>
                )}
                {collapsed && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={Karrivo}
                            alt="Logo"
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: "contain",
                                borderRadius: 8,
                            }}
                        />
                    </div>
                )}
            </div>
            {/* Nav items */}
            <nav
                style={{
                    flex: 1,
                    fontFamily: F,

                    padding: "10px 8px",

                    overflowY: "auto",

                    display: "flex",
                    flexDirection: "column",

                    gap: 1,

                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        isActiveRoute(item.route);

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                navigate(item.route);
                                onNavClick?.();
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",

                                gap: collapsed ? 0 : 10,

                                padding: "9px 12px",

                                borderRadius: 8,

                                border: "none",

                                background: isActive
                                    ? T.navActiveBg
                                    : "transparent",

                                color: isActive
                                    ? T.navActive
                                    : T.textMid,

                                cursor: "pointer",

                                // APPLY FONT FAMILY HERE
                                fontFamily: `${F}, sans-serif`,

                                fontSize: 13,

                                fontWeight: isActive
                                    ? 600
                                    : 400,

                                justifyContent: collapsed
                                    ? "center"
                                    : "flex-start",

                                width: "100%",

                                transition:
                                    "all .12s ease",
                            }}
                        >
                            <Icon
                                size={16}
                                style={{
                                    flexShrink: 0,
                                }}
                            />

                            {!collapsed && (
                                <>
                                    <span
                                        style={{
                                            flex: 1,

                                            textAlign: "left",

                                            fontFamily: `${F}, sans-serif`,
                                        }}
                                    >
                                        {item.label}
                                    </span>

                                    {item.badge && (
                                        <span
                                            style={{
                                                fontFamily: `${F}, sans-serif`,

                                                fontSize: 10,

                                                fontWeight: 600,

                                                background:
                                                    "#fef3c7",

                                                color: "#92400e",

                                                border:
                                                    "1px solid #fcd34d",

                                                borderRadius: 20,

                                                padding:
                                                    "1px 7px",

                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

const RightPanel = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("+919699039801");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const mentorGrowth = [
        {
            title: "Build Your Personal Brand",
            subtitle: "Create trust and visibility with your profile",
            icon: UserCircle,
        },
        {
            title: "Increase Session Bookings",
            subtitle: "Optimize your profile to attract more mentees",
            icon: TrendingUp,
        },
        {
            title: "Deliver Better Mentorship",
            subtitle: "Engage smarter and improve student outcomes",
            icon: Target,
        },
    ];

    const handleNavigate = () => {
        window.open("https://karrivo.in/explore-mentors/", "_blank");
    };

    return (
        <div className="right-panel" style={{ width: 296, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* Mentor Growth Section */}
            <div style={{ padding: "20px 20px 16px" }}>
                <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 4px" }}>
                    Grow as a Mentor
                </p>
                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "0 0 16px", lineHeight: 1.5 }}>
                    Improve your visibility, engagement, and mentorship journey.
                </p>
                {mentorGrowth.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px",
                                border: `1px solid ${T.border}`,
                                borderRadius: 10,
                                marginBottom: 10,
                                cursor: "pointer",
                                transition: "0.2s",
                            }}
                        >
                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={18} color="#ffffff" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>{item.title}</p>
                                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "2px 0 0" }}>{item.subtitle}</p>
                            </div>
                            <ArrowUpRight size={14} color={T.textLight} />
                        </div>
                    );
                })}
            </div>

            <div style={{ height: 1, background: T.border }} />

            {/* Support Section */}
            <div style={{ padding: "20px" }}>
                <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 6px" }}>Any Queries?</p>
                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: "0 0 14px", lineHeight: 1.6 }}>
                    Reach out to your support team anytime for profile help, any guidance, or onboarding assistance.
                </p>
                <p style={{ fontFamily: F, fontSize: 13, color: T.textDark, margin: "0 0 2px", fontWeight: 500 }}>Karrivo Support</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: 0 }}>+91 7702 193 487</p>
                    <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? T.success : T.textLight, display: "flex", alignItems: "center" }}>
                        {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Center Content ─────────────────────────────────────────────────────────────
const CenterContent = ({ children, isHome, onEditProfileOpen, onSetEditTab }) => {
    const navigate = useNavigate();
    const setupSteps = [
        {
            label: "Setup Your Mentor Profile",
            done: false,
            locked: false,
            icon: User,
            tab: "overview",
            description: "Complete your basic information"
        },
        {
            label: "Setup Your Mentorship Pricing",
            done: false,
            locked: false,
            icon: Wallet,
            route: "/mentor/dashboard/pricing",
            description: "Set your hourly rate and experience"
        },
        {
            label: "Setup Your Availability",
            done: true,
            locked: false,
            icon: Calendar,
            route: "/mentor/dashboard/Manage_Availability",
            description: "Set your availability slots"
        },
        {
            label: "Create a Mentorship Curriculum",
            done: false,
            locked: false,
            icon: BookOpen,
            tab: "achievements",
            description: "Add your achievements & certifications"
        },
    ];

    const handleStepClick = (step) => {
        if (step.locked) return;
        if (step.route) {
            navigate(step.route);
            return;
        }
        onSetEditTab?.(step.tab);
        onEditProfileOpen?.();
    };

    if (!isHome) return (
        <div style={{ flex: 1, padding: "12px 12px", overflowY: "auto", background: "#fff", minHeight: 0, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {children}
        </div>
    );

    return (
        <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto", background: "#fff" }}>
            {/* Step 1 — Profile created */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 10, background: "#fff" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <User size={17} color={T.textLight} />
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Create Your Mentor Profile</p>
                    <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>You have successfully created your account</p>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid #16a34a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle size={16} color="#16a34a" />
                </div>
            </div>

            {/* Step 2 — Long term mentorship setup */}
            <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Users size={17} color={T.textLight} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>Setting Up Your Long Term Mentorship</p>
                        <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>Let's get started with these essential setup steps.</p>
                    </div>
                </div>

                {setupSteps.map((step, i) => {
                    const StepIcon = step.icon;
                    return (
                        <div
                            key={i}
                            onClick={() => handleStepClick(step)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "13px 20px",
                                borderBottom: i < setupSteps.length - 1 ? `1px solid ${T.border}` : "none",
                                cursor: step.locked ? "not-allowed" : "pointer",
                                background: step.locked ? T.surface : "transparent",
                                transition: "background .15s",
                                opacity: step.locked ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => { if (!step.locked) e.currentTarget.style.background = T.surface; }}
                            onMouseLeave={(e) => { if (!step.locked) e.currentTarget.style.background = "transparent"; }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                                <StepIcon size={16} color={step.locked ? T.textLight : T.primary} />
                                <div>
                                    <p style={{ fontFamily: F, fontSize: 13, color: step.locked ? T.textLight : T.textDark, fontWeight: 500, margin: 0 }}>{step.label}</p>
                                    <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>{step.description}</p>
                                </div>
                            </div>
                            {step.done ? (
                                <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid #16a34a`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CheckCircle size={14} color="#16a34a" />
                                </div>
                            ) : step.locked ? (
                                <Lock size={15} color={T.textLight} />
                            ) : (
                                <ChevronRight size={15} color={T.primary} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// ═══════════════════════════════════════════════════════════════════════════════
// MentorLayout — main export
// ═══════════════════════════════════════════════════════════════════════════════
const MentorLayout = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [editProfileTab, setEditProfileTab] = useState("overview");

    const navigate = useNavigate();
    const location = useLocation();

    const SIDEBAR_W = isMobile ? 0 : sidebarCollapsed ? 56 : 220;

    useEffect(() => { const s = localStorage.getItem("userData"); if (s) setUserData(JSON.parse(s)); }, []);

    const handleEditProfileClose = () => { setIsEditProfileOpen(false); const stored = localStorage.getItem("userData"); if (stored) setUserData(JSON.parse(stored)); };

    const handleOpenEditProfile = () => { setIsEditProfileOpen(true); };
    const handleSetEditTab = (tab) => { setEditProfileTab(tab); };

    const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("authToken"); localStorage.removeItem("userData"); window.location.href = "/"; };
    const isActiveRoute = (route) => { if (route === "/mentor/dashboard") return location.pathname === "/mentor/dashboard" || location.pathname === "/mentor/dashboard/"; return location.pathname.startsWith(route); };
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
        /* Cambria is a system serif font — no external import needed */
        *,*::before,*::after{box-sizing:border-box}
        body{margin:0;font-family:Cambria,"Times New Roman",Georgia,serif}
        button{font-family:Cambria,"Times New Roman",Georgia,serif}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
        nav button:hover{background:#f9fafb !important}
        @media (max-width: 1024px) {
          .right-panel { display: none !important; }
        }
      `}</style>

            <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#fff" }}>
                {/* ── Top Banner ── */}
                <div style={{ background: "#1a1a2e", color: "#e5e7eb", fontSize: 13, textAlign: "center", padding: "8px 16px", flexShrink: 0, fontFamily: F }}>
                    Your Trials are switched off&nbsp;
                    <button
                        onClick={() => { setEditProfileTab("engagement"); setIsEditProfileOpen(true); }}
                        style={{ color: "#ffffff", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 13, padding: 0 }}
                    >Go to Trial Settings</button>
                </div>

                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                    {isMobile && !sidebarCollapsed && (
                        <div
                            onClick={() => setSidebarCollapsed(true)}
                            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 99 }}
                        />
                    )}

                    {/* ── Left Sidebar ── */}
                    <aside style={{
                        width: isMobile ? 220 : SIDEBAR_W,
                        flexShrink: 0,
                        borderRight: `1px solid ${T.border}`,
                        background: "#fff",
                        height: "100vh",
                        position: isMobile ? "fixed" : "sticky",
                        top: 0,
                        left: 0,
                        zIndex: isMobile ? 100 : "auto",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform .25s ease, width .2s ease",
                        overflow: "hidden",
                        transform: isMobile ? (sidebarCollapsed ? "translateX(-100%)" : "translateX(0)") : "none",
                    }}>
                        <SidebarContent
                            collapsed={sidebarCollapsed}
                            isActiveRoute={isActiveRoute}
                            onNavClick={() => { if (isMobile) setSidebarCollapsed(true); }}
                        />
                        <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 10px", flexShrink: 0 }}>
                            {!sidebarCollapsed && (
                                <button
                                    onClick={() => navigate("/mentor-dashboard/support")}
                                    style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 8, background: "#fff", fontFamily: F, fontSize: 12, color: T.textDark, cursor: "pointer", textAlign: "center", fontWeight: 400 }}
                                >
                                    Support Centre
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* ── Main area ── */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

                        {/* ── Header ── */}
                        <header style={{ height: 56, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "#fff", flexShrink: 0, position: "sticky", top: 0, zIndex: 40 }}>
                            <button onClick={() => setSidebarCollapsed((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDark, display: "flex", alignItems: "center" }}>
                                <Menu size={20} />
                            </button>

                            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                                <button
                                    onClick={() => navigate("/mentor-dashboard/support")}
                                    style={{ background: "none", border: "none", cursor: "pointer", color: T.textLight, display: "flex" }}
                                >
                                    <HelpCircle size={20} />
                                </button>

                                <button onClick={() => setIsProfileDropdownOpen((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.btn, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, overflow: "hidden" }}>
                                        {userData?.profilePhoto ? <img src={userData.profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : userData?.name?.charAt(0) || "M"}
                                    </div>
                                    <ChevronDown size={14} color={T.textLight} />
                                </button>
                                <ProfileDropdown isOpen={isProfileDropdownOpen} onClose={() => setIsProfileDropdownOpen(false)} onLogoutClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} onEditProfile={() => setIsEditProfileOpen(true)} />
                            </div>
                        </header>

                        {/* ── Body: center + right panel ── */}
                        <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
                            <CenterContent
                                isHome={isHome}
                                onEditProfileOpen={handleOpenEditProfile}
                                onSetEditTab={handleSetEditTab}
                            >
                                {children}
                            </CenterContent>
                            <RightPanel />
                        </div>

                        {/* ── Footer ── */}
                        <footer style={{ borderTop: `1px solid ${T.border}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#fff", flexWrap: "wrap", gap: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>• Mentorship Policies</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                {[
                                    { icon: <Star size={13} />, label: "Feature Request" },
                                    { icon: <Wrench size={13} />, label: "Support Request" },
                                    { icon: <Bug size={13} />, label: "Report a Bug" },
                                ].map(({ icon, label }) => (
                                    <button key={label} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", fontFamily: F, fontSize: 12, color: T.textMid, cursor: "pointer", padding: 0 }}>
                                        {icon}{label}
                                    </button>
                                ))}
                                <span style={{ fontFamily: F, fontSize: 12, color: T.textMid }}>mentor-support@Karrivo.in</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Need Help tab */}
            <NeedHelpPanel />

            <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
            {isEditProfileOpen && <EditMentorProfile onClose={handleEditProfileClose} initialTab={editProfileTab} />}
        </>
    );
};

export default MentorLayout;






