

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//   MapPin, Star, Pencil, X, Plus, Trash2, Loader2,
//   Eye, CheckCircle, Clock, Calendar, Briefcase,
//   BookOpen, Award, FileText, TrendingUp, Users, Globe,
//   Phone, Mail, AlertCircle, ExternalLink, ChevronRight,
//   Circle, AlertTriangle, Edit, MessageCircle, Video,
//   Trophy, BadgeCheck, Target, Upload, Camera,
// } from 'lucide-react';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../../../firebase';
// import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// import { showToast } from '../../../utils/Toastprovider';
// import Loader from '../../../global/Loader';

// // ── Constants ──────────────────────────────────────────────────────────────────
// const F = `"Sora", "DM Sans", -apple-system, sans-serif`;
// const MAX_MB = 5;
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// const NAV_ORDER = ['overview', 'experience', 'engagement', 'achievements'];

// // ── Color tokens ───────────────────────────────────────────────────────────────
// const T = {
//   primary:   '#0098cc',
//   btn:       '#1a1a2e',
//   bg:        '#ffffff',
//   surface:   '#f5f7fa',
//   surfaceHov:'#eef1f5',
//   border:    '#e2e6ec',
//   borderMed: '#cdd3dc',
//   textDark:  '#111827',
//   textMid:   '#4b5563',
//   textLight: '#9ca3af',
//   success:   '#16a34a',
//   warning:   '#d97706',
//   error:     '#dc2626',
//   successBg: '#f0fdf4',
//   warningBg: '#fffbeb',
//   errorBg:   '#fef2f2',
//   primaryBg: '#e8f6fc',
//   primaryBd: '#bae3f5',
// };

// // ── Pure helpers ───────────────────────────────────────────────────────────────
// const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
// const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
// const splitCSV = str => (str || '').split(',').map(s => s.trim()).filter(Boolean);
// const joinCSV  = arr => arr.join(', ');
// const slotCount = (s, e) => { const [sh, sm] = s.split(':').map(Number), [eh, em] = e.split(':').map(Number); return Math.floor(((eh*60+em)-(sh*60+sm))/30); };

// // ── Shared inline styles ───────────────────────────────────────────────────────
// const inp = (err) => ({
//   fontFamily: F, width: '100%', padding: '9px 12px', boxSizing: 'border-box',
//   border: `1.5px solid ${err ? T.error : T.borderMed}`, borderRadius: 8,
//   fontSize: 13, color: T.textDark, background: T.bg, outline: 'none', lineHeight: 1.6,
// });
// const lbl = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px', display: 'block' };
// const cardSt = { background: T.bg, borderRadius: 16, border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };
// const secHead = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 };

// export default function MentorProfile() {
//   // ── State ──────────────────────────────────────────────────────────────────
//   const [isEditing, setIsEditing] = useState(false);
//   const [editSection, setEditSection] = useState('overview');
//   const [formData, setFormData] = useState({ availability: [] });
//   const [email, setEmail] = useState('');
//   const [modalTab, setModalTab] = useState('overview');
//   const [modalErrors, setModalErrors] = useState({});
//   const [tagInputs, setTagInputs] = useState({ skill: '', lang: '', guid: '', cert: '', accomp: '' });

//   // Availability panel state (lifted up to avoid nested functions)
//   const [availDateFrom, setAvailDateFrom] = useState('');
//   const [availDateTo, setAvailDateTo]   = useState('');
//   const [availWeekdays, setAvailWeekdays] = useState(true);
//   const [availBlockStart, setAvailBlockStart] = useState('09:00');
//   const [availBlockEnd, setAvailBlockEnd]   = useState('12:00');
//   const [availTimeBlocks, setAvailTimeBlocks] = useState([]);
//   const [availErr, setAvailErr]           = useState('');

//   // Photo upload state
//   const [photoProgress, setPhotoProgress] = useState(0);
//   const [photoStatus, setPhotoStatus]     = useState('idle');
//   const [photoErrMsg, setPhotoErrMsg]     = useState('');
//   const [photoPreview, setPhotoPreview]   = useState('');
//   const [photoDragging, setPhotoDragging] = useState(false);
//   const photoInputRef = useRef(null);

//   // AvailView state
//   const [availSelected, setAvailSelected] = useState(null);

//   const serverRef = useRef(null);
//   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
//   const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

//   useEffect(() => {
//     const ud = localStorage.getItem('userData');
//     if (ud) { try { setEmail(JSON.parse(ud).email); } catch {} }
//   }, []);
//   useEffect(() => { if (email) getMentorDetails(email); }, [email]);
//   useEffect(() => {
//     if (data?.data) {
//       serverRef.current = data.data;
//       if (!isEditing) setFormData({ ...data.data });
//     }
//   }, [data, isEditing]);
//   useEffect(() => {
//     if (formData.profilePhoto && photoStatus === 'idle') setPhotoPreview(formData.profilePhoto);
//   }, [formData.profilePhoto]);

//   // ── Derived data ────────────────────────────────────────────────────────────
//   const skills    = splitCSV(formData.currentSkills);
//   const langs     = Array.isArray(formData.languages) ? formData.languages : [];
//   const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
//   const certs     = Array.isArray(formData.certifications) ? formData.certifications : [];
//   const accomps   = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
//   const fmts      = splitCSV(formData.mentorshipFormat);
//   const bio       = formData.whyMentor || '';
//   const initials  = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

//   const allFlat = (formData.availability || [])
//     .filter(s => s.date)
//     .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
//     .sort((a, b) => new Date(a.ds) - new Date(b.ds));

//   const cFields = [formData.fullName, formData.profilePhoto, formData.currentRole, formData.location, formData.companyName, formData.yearsOfExperience, formData.highestDegree, formData.currentSkills, formData.guidanceAreas?.length, formData.mentorshipFormat, formData.languages?.length, formData.hourlyRate];
//   const completionPct = Math.round(cFields.filter(Boolean).length / cFields.length * 100);

//   const completionSteps = [
//     { label: 'Full Name, Photo & Title',    done: !!(formData.fullName && formData.currentRole) },
//     { label: 'Location & Contact',          done: !!(formData.location && formData.phone) },
//     { label: 'Organisation & Experience',   done: !!(formData.companyName && formData.yearsOfExperience) },
//     { label: 'Educational Background',      done: !!(formData.highestDegree) },
//     { label: 'Specialisations & Domains',   done: !!(formData.currentSkills) },
//     { label: 'Engagement & Availability',   done: !!(formData.mentorshipFormat && formData.languages?.length) },
//   ];

//   const pendingItems = [
//     !formData.profilePhoto    && 'Profile Photo',
//     !formData.location        && 'Location',
//     !formData.phone           && 'Phone number',
//     !formData.linkedinUrl     && 'LinkedIn URL',
//     !formData.whyMentor       && 'Bio / About',
//     !formData.currentSkills   && 'Specialisations',
//     !formData.guidanceAreas?.length && 'Areas of Guidance',
//     !formData.hourlyRate      && 'Hourly rate',
//     !formData.yearsOfExperience && 'Years of experience',
//     !formData.highestDegree   && 'Education',
//     !formData.mentorshipFormat && 'Mentorship Format',
//     !formData.languages?.length && 'Languages',
//   ].filter(Boolean);

//   const detailItems = [
//     formData.location         && { label: 'Location',       value: formData.location },
//     formData.yearsOfExperience && { label: 'Experience',    value: `${formData.yearsOfExperience} yr` },
//     formData.companyName      && { label: 'Organisation',   value: formData.companyName },
//     formData.currentPosition  && { label: 'Position',       value: formData.currentPosition },
//     formData.highestDegree    && { label: 'Degree',         value: formData.highestDegree },
//     formData.fieldOfStudy     && { label: 'Field of Study', value: formData.fieldOfStudy },
//     formData.schoolName       && { label: 'Institution',    value: formData.schoolName },
//     formData.mentoringStyle   && { label: 'Mentoring Style',value: formData.mentoringStyle },
//   ].filter(Boolean);

//   // ── Actions ─────────────────────────────────────────────────────────────────
//   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));
//   const setTagInp = (k, v) => setTagInputs(p => ({ ...p, [k]: v }));

//   const addCSV = (field, key) => {
//     const v = tagInputs[key].trim(); if (!v) return;
//     const arr = splitCSV(formData[field]);
//     if (!arr.includes(v)) set(field, joinCSV([...arr, v]));
//     setTagInp(key, '');
//   };
//   const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter(s => s !== val)));
//   const addArr = (field, key) => {
//     const v = tagInputs[key].trim(); if (!v) return;
//     const arr = Array.isArray(formData[field]) ? formData[field] : [];
//     if (!arr.includes(v)) set(field, [...arr, v]);
//     setTagInp(key, '');
//   };
//   const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

//   const handleEdit = (sec = 'overview') => { setEditSection(sec); setModalTab(sec); setModalErrors({}); setIsEditing(true); };
//   const handleClose = () => { setIsEditing(false); if (serverRef.current) setFormData({ ...serverRef.current }); };

//   const handleSave = async (shouldClose = true) => {
//     try {
//       const enriched = {
//         ...formData,
//         availability: (formData.availability || []).map(slot => {
//           if (slot.day) return slot;
//           const ds = new Date(slot.date).toISOString().split('T')[0];
//           return { ...slot, day: new Date(ds + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }) };
//         }),
//       };
//       await updateMentorDetails({ email, ...enriched }).unwrap();
//       try { showToast('Profile updated!', 'success'); } catch {}
//       if (shouldClose) { handleClose(); getMentorDetails(email); }
//     } catch { try { showToast('Failed to update.', 'error'); } catch {} }
//   };

//   const validate = (tab) => {
//     const e = {};
//     if (tab === 'overview')    { if (!formData.fullName?.trim()) e.fullName = 'Required.'; if (!formData.currentRole?.trim()) e.role = 'Required.'; }
//     if (tab === 'experience')  { if (!formData.yearsOfExperience) e.yoe = 'Required.'; if (!formData.hourlyRate) e.rate = 'Required.'; }
//     setModalErrors(e); return !Object.keys(e).length;
//   };
//   const handleModalSave = async (close) => { if (!validate(modalTab)) return; await handleSave(close); };
//   const handleModalNext = async () => {
//     if (!validate(modalTab)) return;
//     const idx = NAV_ORDER.indexOf(modalTab);
//     if (idx < NAV_ORDER.length - 1) { setModalTab(NAV_ORDER[idx + 1]); setModalErrors({}); }
//     await handleSave(false);
//   };

//   // ── Photo upload handlers ───────────────────────────────────────────────────
//   const handlePhotoFile = useCallback((file) => {
//     if (!file) return;
//     if (!ALLOWED_TYPES.includes(file.type)) { setPhotoErrMsg('Only JPG, PNG, WebP or GIF.'); setPhotoStatus('error'); return; }
//     if (file.size > MAX_MB * 1024 * 1024) { setPhotoErrMsg(`Max ${MAX_MB} MB.`); setPhotoStatus('error'); return; }
//     setPhotoPreview(URL.createObjectURL(file));
//     setPhotoStatus('uploading'); setPhotoProgress(0); setPhotoErrMsg('');
//     const ext = file.name.split('.').pop();
//     const task = uploadBytesResumable(ref(storage, `profilePhotos/${email}/${Date.now()}.${ext}`), file);
//     task.on('state_changed',
//       snap => setPhotoProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
//       () => { setPhotoErrMsg('Upload failed.'); setPhotoStatus('error'); setPhotoPreview(formData.profilePhoto || ''); },
//       async () => {
//         try { const url = await getDownloadURL(task.snapshot.ref); setPhotoPreview(url); setPhotoStatus('done'); set('profilePhoto', url); }
//         catch { setPhotoErrMsg('Could not get URL.'); setPhotoStatus('error'); }
//       }
//     );
//   }, [email, formData.profilePhoto]);

//   const clearPhoto = (e) => {
//     e?.stopPropagation(); setPhotoPreview(''); setPhotoStatus('idle'); setPhotoProgress(0); setPhotoErrMsg('');
//     set('profilePhoto', ''); if (photoInputRef.current) photoInputRef.current.value = '';
//   };

//   // ── Availability helpers ─────────────────────────────────────────────────────
//   const availChunkBlock = (start, end) => {
//     const chunks = []; let [h, m] = start.split(':').map(Number);
//     const [eh, em] = end.split(':').map(Number);
//     while (h*60+m < eh*60+em) {
//       const s = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; m += 30;
//       if (m >= 60) { h++; m -= 60; }
//       chunks.push({ startTime: s, endTime: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}` });
//     }
//     return chunks;
//   };

//   const availTotalDays = (() => {
//     if (!availDateFrom || !availDateTo) return 0;
//     let count = 0, cur = new Date(availDateFrom), to = new Date(availDateTo);
//     while (cur <= to) { const d = cur.getDay(); if (!availWeekdays || (d !== 0 && d !== 6)) count++; cur.setDate(cur.getDate()+1); }
//     return count;
//   })();

//   const availTotalSlots = availTotalDays * availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0);

//   const availAddBlock = () => {
//     setAvailErr('');
//     const [sh,sm] = availBlockStart.split(':').map(Number), [eh,em] = availBlockEnd.split(':').map(Number);
//     if (sh*60+sm >= eh*60+em) { setAvailErr('End must be after start.'); return; }
//     if (slotCount(availBlockStart, availBlockEnd) < 1) { setAvailErr('Block must be ≥ 30 min.'); return; }
//     for (const b of availTimeBlocks) {
//       const [bsh,bsm] = b.start.split(':').map(Number), [beh,bem] = b.end.split(':').map(Number);
//       if (sh*60+sm < beh*60+bem && eh*60+em > bsh*60+bsm) { setAvailErr(`Overlaps with ${b.start}–${b.end}`); return; }
//     }
//     setAvailTimeBlocks(p => [...p, { start: availBlockStart, end: availBlockEnd }].sort((a,b) => a.start.localeCompare(b.start)));
//     setAvailBlockStart('09:00'); setAvailBlockEnd('12:00');
//   };

//   const availGenerate = () => {
//     setAvailErr('');
//     if (!availDateFrom || !availDateTo) { setAvailErr('Select a date range.'); return; }
//     if (!availTimeBlocks.length) { setAvailErr('Add at least one time block.'); return; }
//     const newSlots = []; let cur = new Date(availDateFrom), to = new Date(availDateTo);
//     while (cur <= to) {
//       const dow = cur.getDay(), dateStr = cur.toISOString().split('T')[0];
//       if (!availWeekdays || (dow !== 0 && dow !== 6))
//         for (const block of availTimeBlocks)
//           for (const chunk of availChunkBlock(block.start, block.end))
//             newSlots.push({ date: dateStr, startTime: chunk.startTime, endTime: chunk.endTime, isBooked: false });
//       cur.setDate(cur.getDate()+1);
//     }
//     const seen = new Set();
//     const unique = newSlots.filter(s => { const k = `${s.date}_${s.startTime}`; if (seen.has(k)) return false; seen.add(k); return true; });
//     setFormData(p => ({ ...p, availability: [...(p.availability||[]).filter(s => s.isBooked), ...unique] }));
//     setAvailDateFrom(''); setAvailDateTo(''); setAvailTimeBlocks([]); setAvailErr('');
//   };

//   const availRemoveSlot = (ds, startTime) =>
//     setFormData(p => ({ ...p, availability: (p.availability||[]).filter(s => !(new Date(s.date).toISOString().split('T')[0] === ds && s.startTime === startTime)) }));

//   // ── Small inline components (render functions, not exported) ──────────────
//   const Pill = ({ label, onRemove, col = 'blue' }) => {
//     const palettes = {
//       blue:   { bg: T.primaryBg,  bd: T.primaryBd,  c: T.primary },
//       amber:  { bg: '#fef3c7',    bd: '#fcd34d',    c: '#b45309' },
//       teal:   { bg: '#f0fdf4',    bd: '#86efac',    c: '#15803d' },
//       purple: { bg: '#f5f3ff',    bd: '#c4b5fd',    c: '#7c3aed' },
//     };
//     const p = palettes[col] || palettes.blue;
//     return (
//       <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: 'nowrap' }}>
//         {label}
//         {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .6, display: 'flex', alignItems: 'center' }}>×</button>}
//       </span>
//     );
//   };

//   const IconBox = ({ icon: Icon, size = 14, bg = T.primaryBg, bd = T.primaryBd, boxSize = 30, radius = 8 }) => (
//     <div style={{ width: boxSize, height: boxSize, borderRadius: radius, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//       <Icon size={size} color={T.primary} />
//     </div>
//   );

//   const InfoRow = ({ icon: Icon, children, href }) => (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
//       <IconBox icon={Icon} size={12} boxSize={26} radius={7} />
//       {href
//         ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 13, color: T.primary, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}<ExternalLink size={10} /></a>
//         : <span style={{ fontFamily: F, fontSize: 13, color: T.textMid, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
//       }
//     </div>
//   );

//   const TagRow = ({ placeholder, valKey, field, isArr }) => (
//     <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//       <input value={tagInputs[valKey]} onChange={e => setTagInp(valKey, e.target.value)}
//         onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); isArr ? addArr(field, valKey) : addCSV(field, valKey); }}}
//         placeholder={placeholder}
//         style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${T.borderMed}`, borderRadius: 7, color: T.textDark, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
//       <button type="button" onClick={() => isArr ? addArr(field, valKey) : addCSV(field, valKey)}
//         style={{ padding: '8px 14px', background: T.btn, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
//     </div>
//   );

//   const FieldErr = ({ msg }) => msg ? (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: T.error }}>
//       <AlertCircle size={10} />{msg}
//     </div>
//   ) : null;

//   // ── Loading / error states ─────────────────────────────────────────────────
//   if (isLoading || error || Object.keys(formData).length < 2) return (
//     <div style={{ fontFamily: F, minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Loader />
//     </div>
//   );

//   // ── Availability view (read-only) ──────────────────────────────────────────
//   const uniqueDates = [...new Map(allFlat.map(s => [s.ds, s])).values()];
//   const slotsForDate = availSelected ? allFlat.filter(s => s.ds === availSelected) : [];

//   // ── Modal nav ──────────────────────────────────────────────────────────────
//   const modalNav = [
//     { id: 'overview',     label: 'Overview',     icon: Award },
//     { id: 'experience',   label: 'Experience',   icon: Briefcase },
//     { id: 'engagement',   label: 'Engagement',   icon: MessageCircle },
//     { id: 'achievements', label: 'Achievements', icon: Trophy },
//   ];

//   const inputSt = { fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box', border: `1.5px solid ${T.borderMed}`, borderRadius: 7, padding: '8px 10px', color: T.textDark, background: T.bg, outline: 'none', colorScheme: 'light' };

//   const availFlat = (formData.availability||[]).filter(s=>s.date)
//     .map(s=>({...s,ds:new Date(s.date).toISOString().split('T')[0]}))
//     .sort((a,b)=>new Date(a.ds)-new Date(b.ds));

//   // ── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//         @keyframes spin{to{transform:rotate(360deg)}}
//         @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//         html,body{font-family:${F};-webkit-font-smoothing:antialiased;background:#fff}
//         input:focus,textarea:focus,select:focus{border-color:${T.primary}!important;outline:none;box-shadow:0 0 0 3px ${T.primaryBg}}
//         ::-webkit-scrollbar{width:5px}
//         ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
//         ::placeholder{color:${T.textLight}!important}
//         input[type="time"]::-webkit-calendar-picker-indicator,
//         input[type="date"]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
//         .mp-wrap{max-width:1280px;margin:0 auto;padding:28px 20px 64px}
//         .mp-grid{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start}
//         .mp-left{display:flex;flex-direction:column;gap:16px;min-width:0}
//         .mp-sidebar{display:flex;flex-direction:column;gap:16px;min-width:0}
//         .mp-avail-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
//         .mp-hero{background:linear-gradient(135deg,#f8fafc 0%,#eef3f8 100%);border:1px solid ${T.border};border-radius:16px;padding:28px;margin-bottom:20px;animation:fadeUp .3s ease both;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
//         .mp-card-row:hover{background:${T.surface}!important}
//         .mp-avail-btn:hover{border-color:${T.primary}!important;background:${T.primaryBg}!important}
//         .mp-tag-btn:hover{opacity:.8}
//         @media(max-width:1024px){.mp-grid{grid-template-columns:1fr 270px}}
//         @media(max-width:900px){.mp-grid{grid-template-columns:1fr}.mp-sidebar{display:grid;grid-template-columns:1fr 1fr}.mp-avail-grid{grid-template-columns:repeat(4,1fr)}}
//         @media(max-width:768px){.mp-sidebar{grid-template-columns:1fr}.mp-avail-grid{grid-template-columns:repeat(3,1fr)}.mp-hero{padding:18px 16px}}
//         @media(max-width:600px){.mp-wrap{padding:12px 12px 40px}.mp-avail-grid{grid-template-columns:repeat(2,1fr)}}
//       `}</style>

//       <div style={{ fontFamily: F, minHeight: '100vh', background: T.bg, color: T.textDark }}>
//         <div className="mp-wrap">

//           {/* ── Hero ──────────────────────────────────────────────────────── */}
//           <div className="mp-hero">
//             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0, flex: 1 }}>
//                 <div style={{ position: 'relative', flexShrink: 0 }}>
//                   {formData.profilePhoto
//                     ? <img src={formData.profilePhoto} alt={formData.fullName} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', border: `2px solid ${T.borderMed}`, display: 'block' }} onError={e => e.target.style.display='none'} />
//                     : <div style={{ width: 72, height: 72, borderRadius: 14, background: T.primaryBg, border: `2px solid ${T.primaryBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: T.primary }}>{initials}</div>
//                   }
//                   {formData.status === 'approved' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: T.success, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
//                 </div>
//                 <div style={{ minWidth: 0, flex: 1 }}>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 7, alignItems: 'center' }}>
//                     {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.5px', background: T.primaryBg, border: `1px solid ${T.primaryBd}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
//                     <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: T.warning, background: T.warningBg, border: '1px solid #fcd34d', padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating||'5.0'}</span>
//                     {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: T.success, background: T.successBg, border: '1px solid #86efac', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
//                   </div>
//                   <h1 style={{ fontFamily: F, fontSize: 'clamp(17px,2.5vw,24px)', fontWeight: 800, color: T.textDark, margin: '0 0 3px', lineHeight: 1.2, wordBreak: 'break-word' }}>
//                     {formData.fullName || <span style={{ color: T.textLight, fontStyle: 'italic', fontWeight: 400 }}>No name added</span>}
//                   </h1>
//                   <p style={{ fontFamily: F, fontSize: 13, color: T.textMid, margin: '0 0 8px', fontWeight: 500 }}>
//                     {formData.currentRole || 'Mentor'}{formData.companyName && <span style={{ color: T.textLight }}> · {formData.companyName}</span>}
//                   </p>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//                     {formData.location && <span style={{ fontFamily: F, fontSize: 12, color: T.textLight, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{formData.location}</span>}
//                     {formData.email    && <span style={{ fontFamily: F, fontSize: 12, color: T.textLight, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{formData.email}</span>}
//                     {formData.createdAt && <span style={{ fontFamily: F, fontSize: 11, color: T.textLight, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
//                   </div>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
//                 <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 66, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
//                   <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, fontWeight: 700, color: T.textDark, lineHeight: 1 }}>{formData.yearsOfExperience||0}yr</div>
//                   <div style={{ fontFamily: F, fontSize: 10, color: T.textLight, marginTop: 3, fontWeight: 600 }}>Exp.</div>
//                 </div>
//                 <div style={{ background: T.primaryBg, border: `1px solid ${T.primaryBd}`, borderRadius: 10, padding: '10px 18px', display: 'flex', alignItems: 'baseline', gap: 4 }}>
//                   <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 20, fontWeight: 700, color: T.primary }}>₹{(formData.hourlyRate||0).toLocaleString()}</span>
//                   <span style={{ fontFamily: F, fontSize: 11, color: T.textLight }}>/hr</span>
//                 </div>
//                 <button onClick={() => handleEdit('overview')} style={{ background: T.btn, border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: F }}>
//                   <Edit size={14} />Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ── Main Grid ─────────────────────────────────────────────────── */}
//           <div className="mp-grid">
//             {/* LEFT */}
//             <div className="mp-left">

//               {/* Profile Overview card */}
//               <div style={cardSt}>
//                 <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${T.border}` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
//                     <IconBox icon={Award} />
//                     <div>
//                       <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0 }}>Profile Overview</h2>
//                       <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: '2px 0 0' }}>Visible to potential mentees.</p>
//                     </div>
//                   </div>
//                   <button onClick={() => handleEdit('overview')} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.textMid, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', opacity: isSaving ? .5 : 1, fontFamily: F }}>
//                     {isSaving ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Edit size={13} />}
//                     {isSaving ? 'Saving…' : 'Edit'}
//                   </button>
//                 </div>
//                 <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
//                   {bio && (
//                     <div>
//                       <p style={secHead}><BookOpen size={11} color={T.primary} />About</p>
//                       <p style={{ fontFamily: F, fontSize: 13, color: T.textMid, lineHeight: 1.8, margin: 0, wordBreak: 'break-word' }}>{bio}</p>
//                     </div>
//                   )}
//                   {(formData.email || formData.phone || formData.location || formData.linkedinUrl) && (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                       {formData.email      && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
//                       {formData.phone      && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
//                       {formData.location   && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
//                       {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
//                     </div>
//                   )}
//                   {skills.length > 0 && (
//                     <div>
//                       <p style={secHead}><Target size={11} color={T.primary} />Specialisations & Domains</p>
//                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <Pill key={i} label={s} />)}</div>
//                     </div>
//                   )}
//                   {!bio && !skills.length && !formData.email && (
//                     <div style={{ textAlign: 'center', padding: '20px 0' }}>
//                       <p style={{ fontFamily: F, fontSize: 13, color: T.textLight, margin: '0 0 10px' }}>No profile info added yet.</p>
//                       <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Professional Background card */}
//               <div style={cardSt}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${T.border}` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                     <IconBox icon={Briefcase} />
//                     <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0 }}>Professional Background</h2>
//                   </div>
//                   <button onClick={() => handleEdit('experience')} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.textMid, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: F }}>
//                     <Edit size={13} />Edit
//                   </button>
//                 </div>
//                 <div style={{ padding: '18px 22px' }}>
//                   {detailItems.length > 0
//                     ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
//                         {detailItems.map((item, i) => (
//                           <div key={i}>
//                             <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 4px' }}>{item.label}</p>
//                             <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: 0 }}>{item.value}</p>
//                           </div>
//                         ))}
//                       </div>
//                     : <div style={{ textAlign: 'center', padding: '20px 0' }}>
//                         <p style={{ fontFamily: F, fontSize: 13, color: T.textLight, margin: '0 0 10px' }}>No professional background added.</p>
//                         <button onClick={() => handleEdit('experience')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Add Details →</button>
//                       </div>
//                   }
//                 </div>
//               </div>

//               {/* Engagement card */}
//               <div style={cardSt}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${T.border}` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                     <IconBox icon={MessageCircle} />
//                     <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0 }}>Engagement Information</h2>
//                   </div>
//                   <button onClick={() => handleEdit('engagement')} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.textMid, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: F }}>
//                     <Edit size={13} />Edit
//                   </button>
//                 </div>
//                 <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
//                   {fmts.length > 0 && <div><p style={secHead}><Video size={11} color={T.primary} />Mentorship Format</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{fmts.map((f,i) => <Pill key={i} label={f} />)}</div></div>}
//                   {langs.length > 0 && <div><p style={secHead}><Globe size={11} color={T.primary} />Languages</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{langs.map((l,i) => <Pill key={i} label={l} col="amber" />)}</div></div>}
//                   {guidAreas.length > 0 && <div><p style={secHead}><Target size={11} color={T.primary} />Areas of Guidance</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{guidAreas.map((g,i) => <Pill key={i} label={g} col="teal" />)}</div></div>}
//                   {(formData.calendarLink || formData.platformMessaging) && (
//                     <div><p style={secHead}><Calendar size={11} color={T.primary} />Booking</p>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                         {formData.calendarLink       && <InfoRow icon={Calendar} href={formData.calendarLink}>Book a Session</InfoRow>}
//                         {formData.platformMessaging  && <InfoRow icon={MessageCircle}>{formData.platformMessaging}</InfoRow>}
//                       </div>
//                     </div>
//                   )}
//                   {/* Read-only availability */}
//                   <div>
//                     <p style={secHead}><Clock size={11} color={T.primary} />Availability</p>
//                     {allFlat.length === 0
//                       ? <div style={{ textAlign: 'center', padding: '20px', background: T.surface, border: `1px dashed ${T.borderMed}`, borderRadius: 10 }}>
//                           <Calendar size={20} color={T.textLight} style={{ margin: '0 auto 6px', display: 'block' }} />
//                           <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>No sessions scheduled yet.</p>
//                         </div>
//                       : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
//                             <span style={{ fontFamily: F, fontSize: 11, color: T.primary, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{uniqueDates.length} date{uniqueDates.length!==1?'s':''}</span>
//                             <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700 }}>● {allFlat.filter(s=>!s.isBooked).length} available</span>
//                             {allFlat.filter(s=>s.isBooked).length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: T.warning, fontWeight: 700 }}>● {allFlat.filter(s=>s.isBooked).length} booked</span>}
//                             {availSelected && <button onClick={() => setAvailSelected(null)} style={{ marginLeft: 'auto', fontFamily: F, fontSize: 11, color: T.textLight, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><X size={10} />Clear</button>}
//                           </div>
//                           <div className="mp-avail-grid">
//                             {uniqueDates.map(({ ds }) => {
//                               const d = new Date(ds+'T00:00:00'), slots = allFlat.filter(s=>s.ds===ds);
//                               const avail = slots.filter(s=>!s.isBooked).length, booked = slots.filter(s=>s.isBooked).length;
//                               const isSel = availSelected === ds;
//                               return (
//                                 <button key={ds} type="button" onClick={() => setAvailSelected(isSel ? null : ds)} className="mp-avail-btn"
//                                   style={{ padding: '10px 6px', borderRadius: 10, textAlign: 'center', cursor: 'pointer', background: isSel ? T.primaryBg : T.surface, border: `1.5px solid ${isSel ? T.primary : T.border}`, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', transition: 'all .15s', fontFamily: F }}>
//                                   <span style={{ fontSize: 9, fontWeight: 700, color: isSel ? T.primary : T.textLight, textTransform: 'uppercase', letterSpacing: '.4px' }}>{d.toLocaleDateString('en-IN',{weekday:'short'})}</span>
//                                   <div style={{ fontSize: 18, fontWeight: 800, color: T.textDark, lineHeight: 1 }}>{d.getDate()}</div>
//                                   <span style={{ fontSize: 9, color: T.textLight }}>{d.toLocaleDateString('en-IN',{month:'short'})} '{d.getFullYear().toString().slice(2)}</span>
//                                   {booked > 0 && <span style={{ fontSize: 8.5, fontWeight: 700, color: T.warning, background: T.warningBg, border: '1px solid #fcd34d', borderRadius: 20, padding: '1px 5px' }}>{booked} booked</span>}
//                                 </button>
//                               );
//                             })}
//                           </div>
//                           {availSelected && (
//                             <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px' }}>
//                               <p style={secHead}><Clock size={11} color={T.primary} />{new Date(availSelected+'T00:00:00').toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · {slotsForDate.length} slot{slotsForDate.length!==1?'s':''}</p>
//                               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                                 {slotsForDate.map(slot => (
//                                   <div key={`${slot.ds}_${slot.startTime}`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: `1px solid ${slot.isBooked ? T.border : T.primaryBd}`, background: slot.isBooked ? T.surface : T.primaryBg, opacity: slot.isBooked ? 0.5 : 1 }}>
//                                     <Clock size={11} color={slot.isBooked ? T.textLight : T.primary} />
//                                     <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: slot.isBooked ? T.textLight : T.textDark, textDecoration: slot.isBooked ? 'line-through' : 'none' }}>{slot.startTime} — {slot.endTime}</span>
//                                     {slot.isBooked && <span style={{ fontFamily: F, fontSize: 9.5, color: T.textLight }}>Booked</span>}
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                     }
//                   </div>
//                   {!fmts.length && !langs.length && !guidAreas.length && !formData.calendarLink && allFlat.length === 0 && (
//                     <div style={{ textAlign: 'center', padding: '8px 0' }}>
//                       <button onClick={() => handleEdit('engagement')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Add Engagement Info →</button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Achievements card */}
//               <div style={cardSt}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${T.border}` }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                     <IconBox icon={Trophy} />
//                     <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0 }}>Achievements & Credentials</h2>
//                   </div>
//                   <button onClick={() => handleEdit('achievements')} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.textMid, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: F }}>
//                     <Edit size={13} />Edit
//                   </button>
//                 </div>
//                 <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
//                   {accomps.length > 0 && (
//                     <div>
//                       <p style={secHead}><Trophy size={11} color={T.primary} />Key Accomplishments</p>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
//                         {accomps.map((a,i) => (
//                           <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: T.warningBg, border: '1px solid #fcd34d', borderRadius: 9 }}>
//                             <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
//                             <span style={{ fontFamily: F, fontSize: 12.5, color: T.textMid, wordBreak: 'break-word' }}>{a}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {certs.length > 0 && <div><p style={secHead}><BadgeCheck size={11} color={T.primary} />Certifications</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{certs.map((c,i) => <Pill key={i} label={c} col="purple" />)}</div></div>}
//                   {(formData.portfolioLink || formData.videoLink) && (
//                     <div>
//                       <p style={secHead}><FileText size={11} color={T.primary} />Documents & Media</p>
//                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
//                         {[{label:'Portfolio',field:'portfolioLink',icon:BookOpen},{label:'Intro Video',field:'videoLink',icon:Eye}].filter(d=>formData[d.field]).map(({label,field,icon:Icon}) => (
//                           <a key={field} href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9, textDecoration: 'none', minWidth: 0 }}>
//                             <IconBox icon={Icon} size={12} boxSize={24} radius={6} />
//                             <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: T.textMid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
//                             <ExternalLink size={10} color={T.textLight} style={{ marginLeft: 'auto', flexShrink: 0 }} />
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {!accomps.length && !certs.length && !formData.portfolioLink && !formData.videoLink && (
//                     <div style={{ textAlign: 'center', padding: '16px 0' }}>
//                       <p style={{ fontFamily: F, fontSize: 13, color: T.textLight, margin: '0 0 10px' }}>No achievements added yet.</p>
//                       <button onClick={() => handleEdit('achievements')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Add Achievements →</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* SIDEBAR */}
//             <div className="mp-sidebar">

//               {/* Completion */}
//               <div style={{ ...cardSt, padding: 20 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
//                   <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: T.textDark, margin: 0 }}>Profile Completion</h3>
//                   <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 20, fontWeight: 700, color: completionPct===100 ? T.success : T.primary }}>{completionPct}%</span>
//                 </div>
//                 <div style={{ width: '100%', height: 5, background: T.surface, borderRadius: 100, marginBottom: 16, overflow: 'hidden', border: `1px solid ${T.border}` }}>
//                   <div style={{ height: '100%', borderRadius: 100, width: `${completionPct}%`, background: completionPct===100 ? T.success : T.primary, transition: 'width .7s ease' }} />
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   {completionSteps.map((step, i) => (
//                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       {step.done ? <CheckCircle size={15} color={T.success} style={{ flexShrink: 0 }} /> : <Circle size={15} color={T.borderMed} style={{ flexShrink: 0 }} />}
//                       <span style={{ fontFamily: F, fontSize: 12, color: step.done ? T.textMid : T.textLight, fontWeight: step.done ? 600 : 400 }}>{step.label}</span>
//                     </div>
//                   ))}
//                 </div>
//                 {completionPct < 100
//                   ? <button onClick={() => handleEdit('overview')} style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: T.btn, border: 'none', borderRadius: 9, padding: '10px 0', cursor: 'pointer' }}>Complete Your Profile</button>
//                   : <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CheckCircle size={15} color={T.success} /><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: T.success }}>Profile Complete!</span></div>
//                 }
//               </div>

//               {/* Pending */}
//               {pendingItems.length > 0 && (
//                 <div style={{ ...cardSt, overflow: 'hidden' }}>
//                   <div style={{ background: T.warningBg, padding: '14px 18px', borderBottom: '1px solid #fcd34d', display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <AlertTriangle size={14} color={T.warning} />
//                     <h3 style={{ fontFamily: F, fontSize: 12, fontWeight: 800, color: T.textDark, margin: 0, flex: 1 }}>Pending Details</h3>
//                     <span style={{ background: T.warning, color: '#fff', fontFamily: F, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>{pendingItems.length}</span>
//                   </div>
//                   <div style={{ padding: '10px 18px' }}>
//                     <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: '0 0 10px' }}>Complete these to improve visibility.</p>
//                     {pendingItems.map((item, i) => (
//                       <button key={i} onClick={() => handleEdit('overview')} className="mp-card-row" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < pendingItems.length-1 ? `1px solid ${T.border}` : 'none' }}>
//                         <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.warning, flexShrink: 0 }} />
//                         <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, flex: 1, textAlign: 'left' }}>{item}</span>
//                         <ChevronRight size={12} color={T.textLight} />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Quick Stats */}
//               <div style={{ ...cardSt, padding: 20 }}>
//                 <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: T.textDark, margin: '0 0 14px' }}>Quick Stats</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                   {[
//                     { label: 'Completed Sessions', value: formData.completedBookings||0,               icon: TrendingUp, col: T.primary,  bg: T.primaryBg,  bd: T.primaryBd },
//                     { label: 'Total Mentees',       value: formData.totalMentees||0,                   icon: Users,      col: T.success,  bg: T.successBg,  bd: '#86efac' },
//                     { label: 'Rating',              value: `${formData.rating||'5.0'} ★`,              icon: Star,       col: T.warning,  bg: T.warningBg,  bd: '#fcd34d' },
//                     { label: 'Available Slots',     value: allFlat.filter(s=>!s.isBooked).length,      icon: Calendar,   col: T.primary,  bg: T.primaryBg,  bd: T.primaryBd },
//                   ].map(({ label, value, icon: Icon, col, bg, bd }) => (
//                     <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: T.surface, borderRadius: 9, border: `1px solid ${T.border}` }}>
//                       <div style={{ width: 30, height: 30, borderRadius: 8, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={14} color={col} /></div>
//                       <div>
//                         <div style={{ fontFamily: F, fontSize: 10, color: T.textLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
//                         <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 16, fontWeight: 700, color: T.textDark, lineHeight: 1.2 }}>{value}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Edit Modal ──────────────────────────────────────────────────────── */}
//       {isEditing && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 20 }}>
//           <div style={{ background: T.bg, width: '100%', maxWidth: 780, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden' }}>
//             {/* Modal header */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0, background: T.surface }}>
//               <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Pencil size={15} color={T.primary} />Edit Profile</h2>
//               <button onClick={handleClose} disabled={isSaving} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
//             </div>

//             {/* Modal body */}
//             <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
//               {/* Sidebar nav */}
//               <div style={{ background: T.surface, borderRight: `1px solid ${T.border}`, width: 176, flexShrink: 0, overflow: 'auto' }}>
//                 <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 12 }}>
//                   {modalNav.map(({ id, label, icon: Icon }) => (
//                     <button key={id} type="button" onClick={() => { setModalTab(id); setModalErrors({}); }}
//                       style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', background: modalTab===id ? T.btn : 'transparent', color: modalTab===id ? '#fff' : T.textMid, border: `1px solid ${modalTab===id ? T.btn : T.border}` }}>
//                       <Icon size={13} />{label}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               {/* Tab content */}
//               <div style={{ flex: 1, overflow: 'auto', padding: 22 }}>

//                 {/* Overview tab */}
//                 {modalTab === 'overview' && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Basic Information</h3>

//                     {/* Photo upload */}
//                     <div>
//                       <span style={lbl}>Profile Photo</span>
//                       <div onDrop={e => { e.preventDefault(); setPhotoDragging(false); handlePhotoFile(e.dataTransfer.files?.[0]); }}
//                         onDragOver={e => { e.preventDefault(); setPhotoDragging(true); }} onDragLeave={() => setPhotoDragging(false)}
//                         onClick={() => photoStatus !== 'uploading' && photoInputRef.current?.click()}
//                         style={{ borderRadius: 12, border: `2px dashed ${photoDragging ? T.primary : photoStatus==='error' ? T.error : T.borderMed}`, background: photoDragging ? T.primaryBg : T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: photoStatus==='uploading' ? 'not-allowed' : 'pointer', overflow: 'hidden', minHeight: 70 }}>
//                         <input ref={photoInputRef} type="file" accept={ALLOWED_TYPES.join(',')} style={{ display: 'none' }} onChange={e => handlePhotoFile(e.target.files?.[0])} />
//                         {photoPreview
//                           ? <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
//                               <div style={{ position: 'relative', flexShrink: 0 }}>
//                                 <img src={photoPreview} alt="preview" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', border: `2px solid ${photoStatus==='done' ? T.success : T.borderMed}`, display: 'block' }} onError={e => e.target.style.display='none'} />
//                                 {photoStatus==='done' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: T.success, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={9} color="#fff" /></div>}
//                               </div>
//                               <div style={{ flex: 1, minWidth: 0 }}>
//                                 {photoStatus==='uploading'
//                                   ? <><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}><Loader2 size={11} color={T.primary} style={{ animation: 'spin .9s linear infinite' }} /><span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Uploading… {photoProgress}%</span></div>
//                                       <div style={{ height: 3, background: T.border, borderRadius: 100, overflow: 'hidden' }}><div style={{ height: '100%', width: `${photoProgress}%`, background: T.primary, borderRadius: 100, transition: 'width .2s' }} /></div></>
//                                   : <><span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: photoStatus==='done' ? T.success : T.textMid }}>{photoStatus==='done' ? 'Uploaded!' : 'Ready'}</span><p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: '2px 0 0' }}>Click to replace</p></>
//                                 }
//                               </div>
//                               {photoStatus!=='uploading' && <button type="button" onClick={clearPhoto} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={12} /></button>}
//                             </div>
//                           : <div style={{ textAlign: 'center', padding: '20px' }}>
//                               <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
//                                 {photoDragging ? <Upload size={17} color={T.primary} /> : <Camera size={17} color={T.primary} />}
//                               </div>
//                               <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textMid, margin: '0 0 3px' }}>{photoDragging ? 'Drop to upload' : 'Upload Profile Photo'}</p>
//                               <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
//                             </div>
//                         }
//                       </div>
//                       {photoStatus==='error' && photoErrMsg && <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.errorBg, border: `1px solid #fca5a5`, borderRadius: 7, padding: '7px 11px', fontFamily: F, fontSize: 11, color: T.error, marginTop: 6 }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{photoErrMsg}</div>}
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
//                       <div><span style={lbl}>Full Name *</span><input style={inp(modalErrors.fullName)} value={formData.fullName||''} onChange={e => { set('fullName',e.target.value); if(modalErrors.fullName) setModalErrors(p=>({...p,fullName:''})); }} placeholder="Your full name" /><FieldErr msg={modalErrors.fullName} /></div>
//                       <div><span style={lbl}>Professional Title *</span><input style={inp(modalErrors.role)} value={formData.currentRole||''} onChange={e => { set('currentRole',e.target.value); if(modalErrors.role) setModalErrors(p=>({...p,role:''})); }} placeholder="e.g. Senior Engineer" /><FieldErr msg={modalErrors.role} /></div>
//                       <div><span style={lbl}>Location</span><input style={inp()} value={formData.location||''} onChange={e => set('location',e.target.value)} placeholder="City, Country" /></div>
//                       <div><span style={lbl}>Phone</span><input style={inp()} value={formData.phone||''} onChange={e => set('phone',e.target.value)} placeholder="+91 1234567890" /></div>
//                       <div><span style={lbl}>LinkedIn</span><input style={inp()} value={formData.linkedinUrl||''} onChange={e => set('linkedinUrl',e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
//                       <div><span style={lbl}>Mentoring Style</span><input style={inp()} value={formData.mentoringStyle||''} onChange={e => set('mentoringStyle',e.target.value)} placeholder="e.g. Collaborative" /></div>
//                     </div>
//                     <div><span style={lbl}>Bio / About</span><textarea style={{ ...inp(), resize: 'vertical', lineHeight: 1.6 }} rows={3} value={formData.whyMentor||''} onChange={e => set('whyMentor',e.target.value)} placeholder="Share your professional journey…" /></div>
//                     <div>
//                       <span style={lbl}>Specialisations / Domains</span>
//                       <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing</p>
//                       <TagRow placeholder="Add a specialisation…" valKey="skill" field="currentSkills" />
//                       {skills.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{skills.map((s,i) => <Pill key={i} label={s} onRemove={() => rmCSV('currentSkills',s)} />)}</div>}
//                     </div>
//                   </div>
//                 )}

//                 {/* Experience tab */}
//                 {modalTab === 'experience' && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Professional Background</h3>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
//                       <div><span style={lbl}>Organisation</span><input style={inp()} value={formData.companyName||''} onChange={e => set('companyName',e.target.value)} placeholder="e.g. Google" /></div>
//                       <div><span style={lbl}>Position</span><input style={inp()} value={formData.currentPosition||''} onChange={e => set('currentPosition',e.target.value)} placeholder="e.g. Principal Engineer" /></div>
//                       <div><span style={lbl}>Years of Experience *</span><input type="number" style={inp(modalErrors.yoe)} value={formData.yearsOfExperience||''} onChange={e => { set('yearsOfExperience',e.target.value); if(modalErrors.yoe) setModalErrors(p=>({...p,yoe:''})); }} placeholder="e.g. 8" /><FieldErr msg={modalErrors.yoe} /></div>
//                       <div><span style={lbl}>Hourly Rate (₹) *</span><input type="number" style={inp(modalErrors.rate)} value={formData.hourlyRate||''} onChange={e => { set('hourlyRate',e.target.value); if(modalErrors.rate) setModalErrors(p=>({...p,rate:''})); }} placeholder="e.g. 1500" /><FieldErr msg={modalErrors.rate} /></div>
//                     </div>
//                     <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 16px' }}>
//                       <p style={secHead}><Award size={11} color={T.primary} />Educational Background</p>
//                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
//                         <div><span style={lbl}>Highest Degree</span>
//                           <select value={formData.highestDegree||''} onChange={e => set('highestDegree',e.target.value)} style={{ ...inp(), background: T.bg }}>
//                             <option value="">Select degree</option>
//                             {["High School","Diploma","Bachelor's","Master's","PhD","Other"].map(o => <option key={o} value={o}>{o}</option>)}
//                           </select>
//                         </div>
//                         <div><span style={lbl}>Field of Study</span><input style={inp()} value={formData.fieldOfStudy||''} onChange={e => set('fieldOfStudy',e.target.value)} placeholder="e.g. Computer Science" /></div>
//                         <div><span style={lbl}>Institution</span><input style={inp()} value={formData.schoolName||''} onChange={e => set('schoolName',e.target.value)} placeholder="e.g. IIT Bombay" /></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Engagement tab */}
//                 {modalTab === 'engagement' && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Engagement</h3>

//                     {/* Availability editor */}
//                     <div>
//                       <p style={secHead}><Calendar size={11} color={T.primary} />Availability</p>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                         {/* Date range section */}
//                         <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: '14px 16px' }}>
//                           <p style={{ ...secHead, marginBottom: 10 }}><Calendar size={10} color={T.primary} />Section 1 — Date Range</p>
//                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
//                             <div><span style={lbl}>From</span><input type="date" value={availDateFrom} min={tomorrow()} onChange={e => { setAvailDateFrom(e.target.value); setAvailErr(''); }} style={inputSt} /></div>
//                             <div><span style={lbl}>To</span><input type="date" value={availDateTo} min={availDateFrom||tomorrow()} onChange={e => { setAvailDateTo(e.target.value); setAvailErr(''); }} style={inputSt} /></div>
//                           </div>
//                           <button type="button" onClick={() => setAvailWeekdays(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//                             <div style={{ width: 34, height: 18, borderRadius: 100, background: availWeekdays ? T.primary : T.border, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
//                               <div style={{ position: 'absolute', top: 2, left: availWeekdays ? 16 : 2, width: 10, height: 10, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
//                             </div>
//                             <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
//                           </button>
//                           {availDateFrom && availDateTo && (
//                             <div style={{ marginTop: 10, padding: '7px 11px', borderRadius: 7, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600 }}>
//                               📅 {availTotalDays} day{availTotalDays!==1?'s':''} selected{availWeekdays?' (weekdays only)':' (incl. weekends)'}
//                             </div>
//                           )}
//                         </div>

//                         {/* Time blocks section */}
//                         <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: '14px 16px' }}>
//                           <p style={{ ...secHead, marginBottom: 10 }}><Clock size={10} color={T.primary} />Section 2 — Time Blocks</p>
//                           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
//                             <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>Start</span><input type="time" value={availBlockStart} onChange={e => setAvailBlockStart(e.target.value)} style={inputSt} /></div>
//                             <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>End</span><input type="time" value={availBlockEnd} onChange={e => setAvailBlockEnd(e.target.value)} style={inputSt} /></div>
//                             {availBlockStart && availBlockEnd && slotCount(availBlockStart,availBlockEnd) > 0 && (
//                               <div style={{ padding: '7px 10px', borderRadius: 7, background: T.successBg, border: '1px solid #86efac', fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, alignSelf: 'flex-end', flexShrink: 0 }}>{slotCount(availBlockStart,availBlockEnd)} slots</div>
//                             )}
//                             <button type="button" onClick={availAddBlock} style={{ padding: '8px 14px', background: T.btn, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-end', flexShrink: 0 }}>
//                               <Plus size={13} />Add Block
//                             </button>
//                           </div>
//                           {availTimeBlocks.length > 0
//                             ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                                 {availTimeBlocks.map((b,i) => (
//                                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: T.primaryBg, border: `1px solid ${T.primaryBd}` }}>
//                                     <Clock size={12} color={T.primary} style={{ flexShrink: 0 }} />
//                                     <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, flex: 1 }}>{b.start} — {b.end}</span>
//                                     <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, background: T.successBg, border: '1px solid #86efac', padding: '2px 8px', borderRadius: 20 }}>{slotCount(b.start,b.end)} × 30 min/day</span>
//                                     <button type="button" onClick={() => setAvailTimeBlocks(p => p.filter((_,j) => j!==i))} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={12} /></button>
//                                   </div>
//                                 ))}
//                               </div>
//                             : <div style={{ textAlign: 'center', padding: 12, background: T.bg, border: `1px dashed ${T.border}`, borderRadius: 8 }}>
//                                 <p style={{ fontFamily: F, fontSize: 11.5, color: T.textLight, margin: 0 }}>Add blocks above — e.g. 9:00–12:00</p>
//                               </div>
//                           }
//                         </div>

//                         {/* Generate */}
//                         {availTimeBlocks.length > 0 && availDateFrom && availDateTo && (
//                           <div style={{ padding: '12px 16px', borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
//                             <div>
//                               <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.textDark, margin: '0 0 2px' }}>⚡ {availTotalSlots} slots will be generated</p>
//                               <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>{availTotalDays} days × {availTimeBlocks.reduce((s,b)=>s+slotCount(b.start,b.end),0)} slots/day · Duplicates skipped</p>
//                             </div>
//                             <button type="button" onClick={availGenerate} style={{ padding: '9px 18px', background: T.btn, color: '#fff', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
//                               <CheckCircle size={13} />Generate
//                             </button>
//                           </div>
//                         )}
//                         {availErr && <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.errorBg, border: `1px solid #fca5a5`, borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: T.error }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{availErr}</div>}

//                         {/* Slots grid (editable) */}
//                         {availFlat.length > 0 && (
//                           <div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
//                               <span style={{ fontFamily: F, fontSize: 11, color: T.primary, fontWeight: 700 }}><CheckCircle size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />{availFlat.length} total</span>
//                               <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700 }}>● {availFlat.filter(s=>!s.isBooked).length} available</span>
//                               {availFlat.filter(s=>s.isBooked).length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: T.warning, fontWeight: 700 }}>● {availFlat.filter(s=>s.isBooked).length} booked</span>}
//                             </div>
//                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 7 }}>
//                               {availFlat.map(slot => {
//                                 const d = new Date(slot.ds+'T00:00:00');
//                                 return (
//                                   <div key={`${slot.ds}_${slot.startTime}`} style={{ position: 'relative', padding: '9px 6px', borderRadius: 9, textAlign: 'center', background: slot.isBooked ? T.warningBg : T.primaryBg, border: `1px solid ${slot.isBooked ? '#fcd34d' : T.primaryBd}`, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
//                                     <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.4px' }}>{d.toLocaleDateString('en-IN',{weekday:'short'})}</span>
//                                     <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, fontWeight: 700, color: T.textDark, lineHeight: 1 }}>{d.getDate()}</div>
//                                     <span style={{ fontFamily: F, fontSize: 8.5, color: T.textLight }}>{d.toLocaleDateString('en-IN',{month:'short'})} {d.getFullYear().toString().slice(2)}</span>
//                                     <div style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: slot.isBooked ? T.warning : T.primary, background: T.bg, border: `1px solid ${slot.isBooked ? '#fcd34d' : T.primaryBd}`, borderRadius: 5, padding: '2px 5px', width: '100%', boxSizing: 'border-box' }}>{slot.startTime}</div>
//                                     <span style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: slot.isBooked ? T.warning : T.success }}>{slot.isBooked ? 'Booked' : 'Free'}</span>
//                                     {!slot.isBooked && <button onClick={() => availRemoveSlot(slot.ds, slot.startTime)} style={{ position: 'absolute', top: 3, right: 3, background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 3, width: 15, height: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><X size={8} /></button>}
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><Globe size={11} color={T.primary} />Languages</p>
//                       <TagRow placeholder="e.g. English, Hindi" valKey="lang" field="languages" isArr />
//                       {langs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{langs.map((l,i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr('languages',l)} />)}</div>}
//                     </div>
//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><Video size={11} color={T.primary} />Mentorship Format</p>
//                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//                         {['Online','Group Sessions','One-on-One'].map(fmt => {
//                           const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
//                           return <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set('mentorshipFormat', joinCSV(sel ? c.filter(s=>s!==fmt) : [...c, fmt])); }}
//                             style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
//                             <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? T.primary : T.borderMed }} />{fmt}
//                           </button>;
//                         })}
//                       </div>
//                     </div>
//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><MessageCircle size={11} color={T.primary} />Contact / Booking</p>
//                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//                         <div><span style={lbl}>Platform Messaging</span><input style={inp()} value={formData.platformMessaging||''} onChange={e => set('platformMessaging',e.target.value)} placeholder="@username" /></div>
//                         <div><span style={lbl}>Calendar / Booking Link</span><input style={inp()} value={formData.calendarLink||''} onChange={e => set('calendarLink',e.target.value)} placeholder="https://calendly.com/…" /></div>
//                       </div>
//                     </div>
//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><Target size={11} color={T.primary} />Areas of Guidance</p>
//                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
//                         {['Career Prep','Interview Coaching','Technical Skills','Soft Skills','Leadership','Resume Review','Startup Guidance'].map(g => {
//                           const sel = guidAreas.includes(g);
//                           return <button key={g} type="button" onClick={() => set('guidanceAreas', sel ? guidAreas.filter(x=>x!==g) : [...guidAreas,g])}
//                             style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '7px 12px', borderRadius: 8, border: `1.5px solid ${sel ? T.success : T.borderMed}`, background: sel ? T.successBg : T.bg, color: sel ? T.success : T.textMid, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
//                             <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? T.success : T.borderMed }} />{g}
//                           </button>;
//                         })}
//                       </div>
//                       <TagRow placeholder="Custom guidance area…" valKey="guid" field="guidanceAreas" isArr />
//                       {guidAreas.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{guidAreas.map((g,i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas',g)} />)}</div>}
//                     </div>
//                   </div>
//                 )}

//                 {/* Achievements tab */}
//                 {modalTab === 'achievements' && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//                     <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Achievements & Credentials</h3>
//                     <div>
//                       <p style={secHead}><Trophy size={11} color={T.primary} />Key Accomplishments</p>
//                       <TagRow placeholder="e.g. Led team that scaled to 1M users" valKey="accomp" field="accomplishments" isArr />
//                       {accomps.length > 0 && (
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
//                           {accomps.map((a,i) => (
//                             <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9 }}>
//                               <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
//                               <span style={{ fontFamily: F, fontSize: 12.5, color: T.textMid, flex: 1, wordBreak: 'break-word' }}>{a}</span>
//                               <button onClick={() => rmArr('accomplishments',a)} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={11} /></button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><BadgeCheck size={11} color={T.primary} />Certifications</p>
//                       <TagRow placeholder="e.g. AWS Certified Solutions Architect" valKey="cert" field="certifications" isArr />
//                       {certs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{certs.map((c,i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr('certifications',c)} />)}</div>}
//                     </div>
//                     <div style={{ height: 1, background: T.border }} />
//                     <div>
//                       <p style={secHead}><FileText size={11} color={T.primary} />Portfolio / Media Links</p>
//                       <div style={{ background: T.warningBg, border: '1px solid #fcd34d', borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.7 }}>
//                         Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
//                       </div>
//                       {[{label:'Portfolio',field:'portfolioLink',placeholder:'https://drive.google.com/…'},{label:'Intro Video',field:'videoLink',placeholder:'https://youtube.com/…'}].map(({label,field,placeholder}) => (
//                         <div key={field} style={{ marginBottom: 12 }}>
//                           <span style={lbl}>{label}</span>
//                           <input style={inp()} value={formData[field]||''} onChange={e => set(field,e.target.value)} placeholder={placeholder} />
//                           {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}><Eye size={11} />Preview →</a>}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal footer */}
//             <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: `1px solid ${T.border}`, background: T.surface, flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//               <button type="button" onClick={handleClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: 'pointer' }}>Cancel</button>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <button type="button" onClick={() => handleModalSave(true)} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
//                   {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
//                 </button>
//                 {modalTab !== NAV_ORDER[NAV_ORDER.length-1] && (
//                   <button type="button" onClick={handleModalNext} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: T.btn, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
//                     {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }








import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star, Pencil, X, Plus, Trash2, Loader2,
  Eye, CheckCircle, Clock, Calendar, Briefcase,
  BookOpen, Award, FileText, Globe,
  Phone, Mail, AlertCircle, ChevronRight,
  AlertTriangle, Edit, MessageCircle, Video,
  Trophy, BadgeCheck, Target, Upload, Camera,
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// import { showToast } from '../../../utils/Toastprovider';
import Loader from '../../../global/Loader';

// ── Constants ──────────────────────────────────────────────────────────────────
const F = `"Sora", "DM Sans", -apple-system, sans-serif`;
const MAX_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const NAV_ORDER = ['overview', 'experience', 'engagement', 'achievements'];

// ── Color tokens ───────────────────────────────────────────────────────────────
const T = {
  primary: '#0098cc',
  btn: '#1a1a2e',
  bg: '#ffffff',
  surface: '#f5f7fa',
  border: '#e2e6ec',
  borderMed: '#cdd3dc',
  textDark: '#111827',
  textMid: '#4b5563',
  textLight: '#9ca3af',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  successBg: '#f0fdf4',
  warningBg: '#fffbeb',
  errorBg: '#fef2f2',
  primaryBg: '#e8f6fc',
  primaryBd: '#bae3f5',
};

// ── Pure helpers ───────────────────────────────────────────────────────────────
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
const splitCSV = str => (str || '').split(',').map(s => s.trim()).filter(Boolean);
const joinCSV = arr => arr.join(', ');
const slotCount = (s, e) => { const [sh, sm] = s.split(':').map(Number), [eh, em] = e.split(':').map(Number); return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30); };

// ── Shared inline styles ───────────────────────────────────────────────────────
const inp = (err) => ({
  fontFamily: F, width: '100%', padding: '9px 12px', boxSizing: 'border-box',
  border: `1.5px solid ${err ? T.error : T.borderMed}`, borderRadius: 8,
  fontSize: 13, color: T.textDark, background: T.bg, outline: 'none', lineHeight: 1.6,
});
const lbl = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px', display: 'block' };
const secHead = { fontFamily: F, fontSize: 10, fontWeight: 700, color: T.textLight, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 };

// ── Props: onClose (required) — called when modal should close ─────────────────
export default function EditMentorProfile({ onClose }) {
  const [formData, setFormData] = useState({ availability: [] });
  const [email, setEmail] = useState('');
  const [modalTab, setModalTab] = useState('overview');
  const [modalErrors, setModalErrors] = useState({});
  const [tagInputs, setTagInputs] = useState({ skill: '', lang: '', guid: '', cert: '', accomp: '' });

  // Availability panel state
  const [availDateFrom, setAvailDateFrom] = useState('');
  const [availDateTo, setAvailDateTo] = useState('');
  const [availWeekdays, setAvailWeekdays] = useState(true);
  const [availBlockStart, setAvailBlockStart] = useState('09:00');
  const [availBlockEnd, setAvailBlockEnd] = useState('12:00');
  const [availTimeBlocks, setAvailTimeBlocks] = useState([]);
  const [availErr, setAvailErr] = useState('');

  // Photo upload state
  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoStatus, setPhotoStatus] = useState('idle');
  const [photoErrMsg, setPhotoErrMsg] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoDragging, setPhotoDragging] = useState(false);
  const photoInputRef = useRef(null);

  const serverRef = useRef(null);
  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

  useEffect(() => {
    const ud = localStorage.getItem('userData');
    if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
  }, []);
  useEffect(() => { if (email) getMentorDetails(email); }, [email]);
  useEffect(() => {
    if (data?.data) {
      serverRef.current = data.data;
      setFormData({ ...data.data });
    }
  }, [data]);
  useEffect(() => {
    if (formData.profilePhoto && photoStatus === 'idle') setPhotoPreview(formData.profilePhoto);
  }, [formData.profilePhoto]);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const skills = splitCSV(formData.currentSkills);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
  const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
  const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
  const fmts = splitCSV(formData.mentorshipFormat);

  const availFlat = (formData.availability || []).filter(s => s.date)
    .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
    .sort((a, b) => new Date(a.ds) - new Date(b.ds));

  // ── Actions ─────────────────────────────────────────────────────────────────
  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));
  const setTagInp = (k, v) => setTagInputs(p => ({ ...p, [k]: v }));

  const addCSV = (field, key) => {
    const v = tagInputs[key].trim(); if (!v) return;
    const arr = splitCSV(formData[field]);
    if (!arr.includes(v)) set(field, joinCSV([...arr, v]));
    setTagInp(key, '');
  };
  const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter(s => s !== val)));
  const addArr = (field, key) => {
    const v = tagInputs[key].trim(); if (!v) return;
    const arr = Array.isArray(formData[field]) ? formData[field] : [];
    if (!arr.includes(v)) set(field, [...arr, v]);
    setTagInp(key, '');
  };
  const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

  const handleClose = () => {
    if (serverRef.current) setFormData({ ...serverRef.current });
    onClose?.();
  };

  const handleSave = async () => {
    try {
      const enriched = {
        ...formData,
        availability: (formData.availability || []).map((slot) => {
          if (slot.day) return slot;

          const ds = new Date(slot.date).toISOString().split("T")[0];

          return {
            ...slot,
            day: new Date(ds + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long",
            }),
          };
        }),
      };

      await updateMentorDetails({
        email,
        ...enriched,
      }).unwrap();

      // showToast("Profile updated!", "success");

      // close modal immediately after successful save
      onClose?.();

      // optional fresh fetch
      getMentorDetails(email);

    } catch (error) {
      // showToast("Failed to update.", "error");
    }
  };

  const validate = (tab) => {
    const e = {};
    if (tab === 'overview') { if (!formData.fullName?.trim()) e.fullName = 'Required.'; if (!formData.currentRole?.trim()) e.role = 'Required.'; }
    if (tab === 'experience') { if (!formData.yearsOfExperience) e.yoe = 'Required.'; if (!formData.hourlyRate) e.rate = 'Required.'; }
    setModalErrors(e); return !Object.keys(e).length;
  };
  const handleModalSave = async () => {
    if (!validate(modalTab)) return;
    await handleSave();
  };

  const handleModalNext = async () => {
    if (!validate(modalTab)) return;
    const idx = NAV_ORDER.indexOf(modalTab);
    if (idx < NAV_ORDER.length - 1) { setModalTab(NAV_ORDER[idx + 1]); setModalErrors({}); }
    await handleSave(false);
  };

  // ── Photo upload ────────────────────────────────────────────────────────────
  const handlePhotoFile = useCallback((file) => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) { setPhotoErrMsg('Only JPG, PNG, WebP or GIF.'); setPhotoStatus('error'); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setPhotoErrMsg(`Max ${MAX_MB} MB.`); setPhotoStatus('error'); return; }
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoStatus('uploading'); setPhotoProgress(0); setPhotoErrMsg('');
    const ext = file.name.split('.').pop();
    const task = uploadBytesResumable(ref(storage, `profilePhotos/${email}/${Date.now()}.${ext}`), file);
    task.on('state_changed',
      snap => setPhotoProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      () => { setPhotoErrMsg('Upload failed.'); setPhotoStatus('error'); setPhotoPreview(formData.profilePhoto || ''); },
      async () => {
        try { const url = await getDownloadURL(task.snapshot.ref); setPhotoPreview(url); setPhotoStatus('done'); set('profilePhoto', url); }
        catch { setPhotoErrMsg('Could not get URL.'); setPhotoStatus('error'); }
      }
    );
  }, [email, formData.profilePhoto]);

  const clearPhoto = (e) => {
    e?.stopPropagation(); setPhotoPreview(''); setPhotoStatus('idle'); setPhotoProgress(0); setPhotoErrMsg('');
    set('profilePhoto', ''); if (photoInputRef.current) photoInputRef.current.value = '';
  };

  // ── Availability helpers ────────────────────────────────────────────────────
  const availChunkBlock = (start, end) => {
    const chunks = []; let [h, m] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    while (h * 60 + m < eh * 60 + em) {
      const s = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; m += 30;
      if (m >= 60) { h++; m -= 60; }
      chunks.push({ startTime: s, endTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
    }
    return chunks;
  };

  const availTotalDays = (() => {
    if (!availDateFrom || !availDateTo) return 0;
    let count = 0, cur = new Date(availDateFrom), to = new Date(availDateTo);
    while (cur <= to) { const d = cur.getDay(); if (!availWeekdays || (d !== 0 && d !== 6)) count++; cur.setDate(cur.getDate() + 1); }
    return count;
  })();

  const availTotalSlots = availTotalDays * availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0);

  const availAddBlock = () => {
    setAvailErr('');
    const [sh, sm] = availBlockStart.split(':').map(Number), [eh, em] = availBlockEnd.split(':').map(Number);
    if (sh * 60 + sm >= eh * 60 + em) { setAvailErr('End must be after start.'); return; }
    if (slotCount(availBlockStart, availBlockEnd) < 1) { setAvailErr('Block must be ≥ 30 min.'); return; }
    for (const b of availTimeBlocks) {
      const [bsh, bsm] = b.start.split(':').map(Number), [beh, bem] = b.end.split(':').map(Number);
      if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setAvailErr(`Overlaps with ${b.start}–${b.end}`); return; }
    }
    setAvailTimeBlocks(p => [...p, { start: availBlockStart, end: availBlockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
    setAvailBlockStart('09:00'); setAvailBlockEnd('12:00');
  };

  const availGenerate = () => {
    setAvailErr('');
    if (!availDateFrom || !availDateTo) { setAvailErr('Select a date range.'); return; }
    if (!availTimeBlocks.length) { setAvailErr('Add at least one time block.'); return; }
    const newSlots = []; let cur = new Date(availDateFrom), to = new Date(availDateTo);
    while (cur <= to) {
      const dow = cur.getDay(), dateStr = cur.toISOString().split('T')[0];
      if (!availWeekdays || (dow !== 0 && dow !== 6))
        for (const block of availTimeBlocks)
          for (const chunk of availChunkBlock(block.start, block.end))
            newSlots.push({ date: dateStr, startTime: chunk.startTime, endTime: chunk.endTime, isBooked: false });
      cur.setDate(cur.getDate() + 1);
    }
    const seen = new Set();
    const unique = newSlots.filter(s => { const k = `${s.date}_${s.startTime}`; if (seen.has(k)) return false; seen.add(k); return true; });
    setFormData(p => ({ ...p, availability: [...(p.availability || []).filter(s => s.isBooked), ...unique] }));
    setAvailDateFrom(''); setAvailDateTo(''); setAvailTimeBlocks([]); setAvailErr('');
  };

  const availRemoveSlot = (ds, startTime) =>
    setFormData(p => ({ ...p, availability: (p.availability || []).filter(s => !(new Date(s.date).toISOString().split('T')[0] === ds && s.startTime === startTime)) }));

  // ── Small sub-components ───────────────────────────────────────────────────
  const Pill = ({ label, onRemove, col = 'blue' }) => {
    const palettes = {
      blue: { bg: T.primaryBg, bd: T.primaryBd, c: T.primary },
      amber: { bg: '#fef3c7', bd: '#fcd34d', c: '#b45309' },
      teal: { bg: '#f0fdf4', bd: '#86efac', c: '#15803d' },
      purple: { bg: '#f5f3ff', bd: '#c4b5fd', c: '#7c3aed' },
    };
    const p = palettes[col] || palettes.blue;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: 'nowrap' }}>
        {label}
        {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .6, display: 'flex', alignItems: 'center' }}>×</button>}
      </span>
    );
  };

  const TagRow = ({ placeholder, valKey, field, isArr }) => (
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <input value={tagInputs[valKey]} onChange={e => setTagInp(valKey, e.target.value)}
        onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); isArr ? addArr(field, valKey) : addCSV(field, valKey); } }}
        placeholder={placeholder}
        style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${T.borderMed}`, borderRadius: 7, color: T.textDark, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
      <button type="button" onClick={() => isArr ? addArr(field, valKey) : addCSV(field, valKey)}
        style={{ padding: '8px 14px', background: T.btn, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
    </div>
  );

  const FieldErr = ({ msg }) => msg ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: T.error }}>
      <AlertCircle size={10} />{msg}
    </div>
  ) : null;

  const inputSt = { fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box', border: `1.5px solid ${T.borderMed}`, borderRadius: 7, padding: '8px 10px', color: T.textDark, background: T.bg, outline: 'none', colorScheme: 'light' };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading || Object.keys(formData).length < 2) return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </div>
  );

  const modalNav = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'engagement', label: 'Engagement', icon: MessageCircle },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box}
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:${T.primary}!important;outline:none;box-shadow:0 0 0 3px ${T.primaryBg}}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
        ::placeholder{color:${T.textLight}!important}
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
      `}</style>

      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 20 }}>
        <div style={{ background: T.bg, width: '100%', maxWidth: 780, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0, background: T.surface }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: T.textDark, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Pencil size={15} color={T.primary} />Edit Profile</h2>
            <button onClick={handleClose} disabled={isSaving} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>

            {/* Sidebar nav */}
            <div style={{ background: T.surface, borderRight: `1px solid ${T.border}`, width: 176, flexShrink: 0, overflow: 'auto' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 12 }}>
                {modalNav.map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" onClick={() => { setModalTab(id); setModalErrors({}); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', background: modalTab === id ? T.btn : 'transparent', color: modalTab === id ? '#fff' : T.textMid, border: `1px solid ${modalTab === id ? T.btn : T.border}` }}>
                    <Icon size={13} />{label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: 'auto', padding: 22 }}>

              {/* ── Overview ── */}
              {modalTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Basic Information</h3>

                  {/* Photo upload */}
                  <div>
                    <span style={lbl}>Profile Photo</span>
                    <div onDrop={e => { e.preventDefault(); setPhotoDragging(false); handlePhotoFile(e.dataTransfer.files?.[0]); }}
                      onDragOver={e => { e.preventDefault(); setPhotoDragging(true); }} onDragLeave={() => setPhotoDragging(false)}
                      onClick={() => photoStatus !== 'uploading' && photoInputRef.current?.click()}
                      style={{ borderRadius: 12, border: `2px dashed ${photoDragging ? T.primary : photoStatus === 'error' ? T.error : T.borderMed}`, background: photoDragging ? T.primaryBg : T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: photoStatus === 'uploading' ? 'not-allowed' : 'pointer', overflow: 'hidden', minHeight: 70 }}>
                      <input ref={photoInputRef} type="file" accept={ALLOWED_TYPES.join(',')} style={{ display: 'none' }} onChange={e => handlePhotoFile(e.target.files?.[0])} />
                      {photoPreview
                        ? <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={photoPreview} alt="preview" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', border: `2px solid ${photoStatus === 'done' ? T.success : T.borderMed}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
                            {photoStatus === 'done' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: T.success, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={9} color="#fff" /></div>}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            {photoStatus === 'uploading'
                              ? <><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}><Loader2 size={11} color={T.primary} style={{ animation: 'spin .9s linear infinite' }} /><span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Uploading… {photoProgress}%</span></div>
                                <div style={{ height: 3, background: T.border, borderRadius: 100, overflow: 'hidden' }}><div style={{ height: '100%', width: `${photoProgress}%`, background: T.primary, borderRadius: 100, transition: 'width .2s' }} /></div></>
                              : <><span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: photoStatus === 'done' ? T.success : T.textMid }}>{photoStatus === 'done' ? 'Uploaded!' : 'Ready'}</span><p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: '2px 0 0' }}>Click to replace</p></>
                            }
                          </div>
                          {photoStatus !== 'uploading' && <button type="button" onClick={clearPhoto} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={12} /></button>}
                        </div>
                        : <div style={{ textAlign: 'center', padding: '20px' }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                            {photoDragging ? <Upload size={17} color={T.primary} /> : <Camera size={17} color={T.primary} />}
                          </div>
                          <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textMid, margin: '0 0 3px' }}>{photoDragging ? 'Drop to upload' : 'Upload Profile Photo'}</p>
                          <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
                        </div>
                      }
                    </div>
                    {photoStatus === 'error' && photoErrMsg && <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.errorBg, border: `1px solid #fca5a5`, borderRadius: 7, padding: '7px 11px', fontFamily: F, fontSize: 11, color: T.error, marginTop: 6 }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{photoErrMsg}</div>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
                    <div><span style={lbl}>Full Name *</span><input style={inp(modalErrors.fullName)} value={formData.fullName || ''} onChange={e => { set('fullName', e.target.value); if (modalErrors.fullName) setModalErrors(p => ({ ...p, fullName: '' })); }} placeholder="Your full name" /><FieldErr msg={modalErrors.fullName} /></div>
                    <div><span style={lbl}>Professional Title *</span><input style={inp(modalErrors.role)} value={formData.currentRole || ''} onChange={e => { set('currentRole', e.target.value); if (modalErrors.role) setModalErrors(p => ({ ...p, role: '' })); }} placeholder="e.g. Senior Engineer" /><FieldErr msg={modalErrors.role} /></div>
                    <div><span style={lbl}>Location</span><input style={inp()} value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" /></div>
                    <div><span style={lbl}>Phone</span><input style={inp()} value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 1234567890" /></div>
                    <div><span style={lbl}>LinkedIn</span><input style={inp()} value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
                    <div><span style={lbl}>Mentoring Style</span><input style={inp()} value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative" /></div>
                  </div>
                  <div><span style={lbl}>Bio / About</span><textarea style={{ ...inp(), resize: 'vertical', lineHeight: 1.6 }} rows={3} value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey…" /></div>
                  <div>
                    <span style={lbl}>Specialisations / Domains</span>
                    <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing</p>
                    <TagRow placeholder="Add a specialisation…" valKey="skill" field="currentSkills" />
                    {skills.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV('currentSkills', s)} />)}</div>}
                  </div>
                </div>
              )}

              {/* ── Experience ── */}
              {modalTab === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Professional Background</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
                    <div><span style={lbl}>Organisation</span><input style={inp()} value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Google" /></div>
                    <div><span style={lbl}>Position</span><input style={inp()} value={formData.currentPosition || ''} onChange={e => set('currentPosition', e.target.value)} placeholder="e.g. Principal Engineer" /></div>
                    <div><span style={lbl}>Years of Experience *</span><input type="number" style={inp(modalErrors.yoe)} value={formData.yearsOfExperience || ''} onChange={e => { set('yearsOfExperience', e.target.value); if (modalErrors.yoe) setModalErrors(p => ({ ...p, yoe: '' })); }} placeholder="e.g. 8" /><FieldErr msg={modalErrors.yoe} /></div>
                    <div><span style={lbl}>Hourly Rate (₹) *</span><input type="number" style={inp(modalErrors.rate)} value={formData.hourlyRate || ''} onChange={e => { set('hourlyRate', e.target.value); if (modalErrors.rate) setModalErrors(p => ({ ...p, rate: '' })); }} placeholder="e.g. 1500" /><FieldErr msg={modalErrors.rate} /></div>
                  </div>
                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: '14px 16px' }}>
                    <p style={{ ...secHead, marginBottom: 12 }}><Award size={11} color={T.primary} />Educational Background</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
                      <div><span style={lbl}>Highest Degree</span>
                        <select value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)} style={{ ...inp(), background: T.bg }}>
                          <option value="">Select degree</option>
                          {["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><span style={lbl}>Field of Study</span><input style={inp()} value={formData.fieldOfStudy || ''} onChange={e => set('fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" /></div>
                      <div><span style={lbl}>Institution</span><input style={inp()} value={formData.schoolName || ''} onChange={e => set('schoolName', e.target.value)} placeholder="e.g. IIT Bombay" /></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Engagement ── */}
              {modalTab === 'engagement' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Engagement</h3>

                  {/* Availability editor */}
                  <div>
                    <p style={secHead}><Calendar size={11} color={T.primary} />Availability</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: '14px 16px' }}>
                        <p style={{ ...secHead, marginBottom: 10 }}><Calendar size={10} color={T.primary} />Section 1 — Date Range</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <div><span style={lbl}>From</span><input type="date" value={availDateFrom} min={tomorrow()} onChange={e => { setAvailDateFrom(e.target.value); setAvailErr(''); }} style={inputSt} /></div>
                          <div><span style={lbl}>To</span><input type="date" value={availDateTo} min={availDateFrom || tomorrow()} onChange={e => { setAvailDateTo(e.target.value); setAvailErr(''); }} style={inputSt} /></div>
                        </div>
                        <button type="button" onClick={() => setAvailWeekdays(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          <div style={{ width: 34, height: 18, borderRadius: 100, background: availWeekdays ? T.primary : T.border, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                            <div style={{ position: 'absolute', top: 2, left: availWeekdays ? 16 : 2, width: 10, height: 10, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                          </div>
                          <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
                        </button>
                        {availDateFrom && availDateTo && (
                          <div style={{ marginTop: 10, padding: '7px 11px', borderRadius: 7, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600 }}>
                            📅 {availTotalDays} day{availTotalDays !== 1 ? 's' : ''} selected{availWeekdays ? ' (weekdays only)' : ' (incl. weekends)'}
                          </div>
                        )}
                      </div>

                      <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: '14px 16px' }}>
                        <p style={{ ...secHead, marginBottom: 10 }}><Clock size={10} color={T.primary} />Section 2 — Time Blocks</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
                          <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>Start</span><input type="time" value={availBlockStart} onChange={e => setAvailBlockStart(e.target.value)} style={inputSt} /></div>
                          <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>End</span><input type="time" value={availBlockEnd} onChange={e => setAvailBlockEnd(e.target.value)} style={inputSt} /></div>
                          {availBlockStart && availBlockEnd && slotCount(availBlockStart, availBlockEnd) > 0 && (
                            <div style={{ padding: '7px 10px', borderRadius: 7, background: T.successBg, border: '1px solid #86efac', fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, alignSelf: 'flex-end', flexShrink: 0 }}>{slotCount(availBlockStart, availBlockEnd)} slots</div>
                          )}
                          <button type="button" onClick={availAddBlock} style={{ padding: '8px 14px', background: T.btn, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-end', flexShrink: 0 }}>
                            <Plus size={13} />Add Block
                          </button>
                        </div>
                        {availTimeBlocks.length > 0
                          ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {availTimeBlocks.map((b, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: T.primaryBg, border: `1px solid ${T.primaryBd}` }}>
                                <Clock size={12} color={T.primary} style={{ flexShrink: 0 }} />
                                <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, flex: 1 }}>{b.start} — {b.end}</span>
                                <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, background: T.successBg, border: '1px solid #86efac', padding: '2px 8px', borderRadius: 20 }}>{slotCount(b.start, b.end)} × 30 min/day</span>
                                <button type="button" onClick={() => setAvailTimeBlocks(p => p.filter((_, j) => j !== i))} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={12} /></button>
                              </div>
                            ))}
                          </div>
                          : <div style={{ textAlign: 'center', padding: 12, background: T.bg, border: `1px dashed ${T.border}`, borderRadius: 8 }}>
                            <p style={{ fontFamily: F, fontSize: 11.5, color: T.textLight, margin: 0 }}>Add blocks above — e.g. 9:00–12:00</p>
                          </div>
                        }
                      </div>

                      {availTimeBlocks.length > 0 && availDateFrom && availDateTo && (
                        <div style={{ padding: '12px 16px', borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                          <div>
                            <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.textDark, margin: '0 0 2px' }}>⚡ {availTotalSlots} slots will be generated</p>
                            <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>{availTotalDays} days × {availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day · Duplicates skipped</p>
                          </div>
                          <button type="button" onClick={availGenerate} style={{ padding: '9px 18px', background: T.btn, color: '#fff', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            <CheckCircle size={13} />Generate
                          </button>
                        </div>
                      )}
                      {availErr && <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.errorBg, border: `1px solid #fca5a5`, borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: T.error }}><AlertCircle size={12} style={{ flexShrink: 0 }} />{availErr}</div>}

                      {availFlat.length > 0 && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <span style={{ fontFamily: F, fontSize: 11, color: T.primary, fontWeight: 700 }}>{availFlat.length} total</span>
                            <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700 }}>● {availFlat.filter(s => !s.isBooked).length} available</span>
                            {availFlat.filter(s => s.isBooked).length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: T.warning, fontWeight: 700 }}>● {availFlat.filter(s => s.isBooked).length} booked</span>}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 7 }}>
                            {availFlat.map(slot => {
                              const d = new Date(slot.ds + 'T00:00:00');
                              return (
                                <div key={`${slot.ds}_${slot.startTime}`} style={{ position: 'relative', padding: '9px 6px', borderRadius: 9, textAlign: 'center', background: slot.isBooked ? T.warningBg : T.primaryBg, border: `1px solid ${slot.isBooked ? '#fcd34d' : T.primaryBd}`, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                                  <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: T.primary, textTransform: 'uppercase', letterSpacing: '.4px' }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, fontWeight: 700, color: T.textDark, lineHeight: 1 }}>{d.getDate()}</div>
                                  <span style={{ fontFamily: F, fontSize: 8.5, color: T.textLight }}>{d.toLocaleDateString('en-IN', { month: 'short' })} {d.getFullYear().toString().slice(2)}</span>
                                  <div style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: slot.isBooked ? T.warning : T.primary, background: T.bg, border: `1px solid ${slot.isBooked ? '#fcd34d' : T.primaryBd}`, borderRadius: 5, padding: '2px 5px', width: '100%', boxSizing: 'border-box' }}>{slot.startTime}</div>
                                  <span style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: slot.isBooked ? T.warning : T.success }}>{slot.isBooked ? 'Booked' : 'Free'}</span>
                                  {!slot.isBooked && <button onClick={() => availRemoveSlot(slot.ds, slot.startTime)} style={{ position: 'absolute', top: 3, right: 3, background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 3, width: 15, height: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><X size={8} /></button>}
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
                    <p style={secHead}><Globe size={11} color={T.primary} />Languages</p>
                    <TagRow placeholder="e.g. English, Hindi" valKey="lang" field="languages" isArr />
                    {langs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr('languages', l)} />)}</div>}
                  </div>
                  <div style={{ height: 1, background: T.border }} />
                  <div>
                    <p style={secHead}><Video size={11} color={T.primary} />Mentorship Format</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Online', 'Group Sessions', 'One-on-One'].map(fmt => {
                        const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
                        return <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set('mentorshipFormat', joinCSV(sel ? c.filter(s => s !== fmt) : [...c, fmt])); }}
                          style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? T.primary : T.borderMed }} />{fmt}
                        </button>;
                      })}
                    </div>
                  </div>
                  <div style={{ height: 1, background: T.border }} />
                  <div>
                    <p style={secHead}><MessageCircle size={11} color={T.primary} />Contact / Booking</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div><span style={lbl}>Platform Messaging</span><input style={inp()} value={formData.platformMessaging || ''} onChange={e => set('platformMessaging', e.target.value)} placeholder="@username" /></div>
                      <div><span style={lbl}>Calendar / Booking Link</span><input style={inp()} value={formData.calendarLink || ''} onChange={e => set('calendarLink', e.target.value)} placeholder="https://calendly.com/…" /></div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: T.border }} />
                  <div>
                    <p style={secHead}><Target size={11} color={T.primary} />Areas of Guidance</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      {['Career Prep', 'Interview Coaching', 'Technical Skills', 'Soft Skills', 'Leadership', 'Resume Review', 'Startup Guidance'].map(g => {
                        const sel = guidAreas.includes(g);
                        return <button key={g} type="button" onClick={() => set('guidanceAreas', sel ? guidAreas.filter(x => x !== g) : [...guidAreas, g])}
                          style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '7px 12px', borderRadius: 8, border: `1.5px solid ${sel ? T.success : T.borderMed}`, background: sel ? T.successBg : T.bg, color: sel ? T.success : T.textMid, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? T.success : T.borderMed }} />{g}
                        </button>;
                      })}
                    </div>
                    <TagRow placeholder="Custom guidance area…" valKey="guid" field="guidanceAreas" isArr />
                    {guidAreas.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas', g)} />)}</div>}
                  </div>
                </div>
              )}

              {/* ── Achievements ── */}
              {modalTab === 'achievements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: T.textDark, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>Achievements & Credentials</h3>
                  <div>
                    <p style={secHead}><Trophy size={11} color={T.primary} />Key Accomplishments</p>
                    <TagRow placeholder="e.g. Led team that scaled to 1M users" valKey="accomp" field="accomplishments" isArr />
                    {accomps.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                        {accomps.map((a, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9 }}>
                            <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
                            <span style={{ fontFamily: F, fontSize: 12.5, color: T.textMid, flex: 1, wordBreak: 'break-word' }}>{a}</span>
                            <button onClick={() => rmArr('accomplishments', a)} style={{ background: T.errorBg, border: `1px solid #fca5a5`, color: T.error, borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={11} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ height: 1, background: T.border }} />
                  <div>
                    <p style={secHead}><BadgeCheck size={11} color={T.primary} />Certifications</p>
                    <TagRow placeholder="e.g. AWS Certified Solutions Architect" valKey="cert" field="certifications" isArr />
                    {certs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr('certifications', c)} />)}</div>}
                  </div>
                  <div style={{ height: 1, background: T.border }} />
                  <div>
                    <p style={secHead}><FileText size={11} color={T.primary} />Portfolio / Media Links</p>
                    <div style={{ background: T.warningBg, border: '1px solid #fcd34d', borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.7 }}>
                      Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
                    </div>
                    {[{ label: 'Portfolio', field: 'portfolioLink', placeholder: 'https://drive.google.com/…' }, { label: 'Intro Video', field: 'videoLink', placeholder: 'https://youtube.com/…' }].map(({ label, field, placeholder }) => (
                      <div key={field} style={{ marginBottom: 12 }}>
                        <span style={lbl}>{label}</span>
                        <input style={inp()} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
                        {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}><Eye size={11} />Preview →</a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: `1px solid ${T.border}`, background: T.surface, flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={handleClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: 'pointer' }}>Cancel</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => handleModalSave(false)} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
                {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
              </button>
              {modalTab !== NAV_ORDER[NAV_ORDER.length - 1] && (
                <button type="button" onClick={handleModalNext} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: T.btn, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
                  {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}















