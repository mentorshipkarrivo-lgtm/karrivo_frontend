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

// // ─── Constants ───────────────────────────────────────────────────────────────
// const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;
// const MAX_MB = 5;
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// const NAV_ORDER = ['overview', 'experience', 'engagement', 'achievements'];

// // ─── Pure Helpers ─────────────────────────────────────────────────────────────
// const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
// const calcEnd = t => { const [h, m] = t.split(':').map(Number), tot = h * 60 + m + 30; return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };
// const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
// const splitCSV = str => (str || '').split(',').map(s => s.trim()).filter(Boolean);
// const joinCSV = arr => arr.join(', ');
// const slotCount = (s, e) => { const [sh, sm] = s.split(':').map(Number), [eh, em] = e.split(':').map(Number); return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30); };

// // ─── Shared Styles ────────────────────────────────────────────────────────────
// const token = {
//   bg: '#062117', card: '#0a2d1e', cyan: '#0098cc',
//   green: '#22c55e', amber: '#e8a020', red: '#e05050',
//   textPrimary: '#e8f5f0', textSecondary: '#8fbfb0', textMuted: '#4a8070',
//   border: 'rgba(0,152,204,0.14)', borderStrong: 'rgba(0,152,204,0.26)',
//   borderDash: 'rgba(0,152,204,0.26)',
// };

// // ─── Atoms ───────────────────────────────────────────────────────────────────
// const Pill = ({ label, onRemove, col = 'cyan' }) => {
//   const palettes = {
//     cyan: { bg: 'rgba(0,152,204,0.12)', bd: 'rgba(0,152,204,0.22)', c: '#0098cc' },
//     amber: { bg: 'rgba(232,160,32,0.12)', bd: 'rgba(232,160,32,0.25)', c: '#e8a020' },
//     teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: '#22c55e' },
//     purple: { bg: 'rgba(167,139,250,0.1)', bd: 'rgba(167,139,250,0.25)', c: '#a78bfa' },
//   };
//   const p = palettes[col] || palettes.cyan;
//   return (
//     <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: 'nowrap' }}>
//       {label}
//       {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .7, display: 'flex', alignItems: 'center' }}>×</button>}
//     </span>
//   );
// };

// const Lbl = ({ children, required }) => (
//   <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px' }}>
//     {children}{required && <span style={{ color: token.red, marginLeft: 2 }}>*</span>}
//   </p>
// );

// const Field = ({ value, onChange, placeholder, multiline, type = 'text', error }) => {
//   const base = { fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${error ? token.red : token.borderStrong}`, borderRadius: 8, fontSize: 13, color: token.textPrimary, background: 'rgba(0,0,0,0.25)', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box', colorScheme: 'dark' };
//   return multiline
//     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical' }} />
//     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
// };

// const Select = ({ value, onChange, children }) => (
//   <select value={value} onChange={onChange} style={{ fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${token.borderStrong}`, borderRadius: 8, fontSize: 13, color: value ? token.textPrimary : token.textMuted, background: token.card, outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }}>
//     {children}
//   </select>
// );

// const FieldErr = ({ msg }) => msg ? (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: token.red }}>
//     <AlertCircle size={10} />{msg}
//   </div>
// ) : null;

// const TagRow = ({ placeholder, value, onChange, onAdd }) => (
//   <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//     <input value={value} onChange={e => onChange(e.target.value)} onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} placeholder={placeholder}
//       style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${token.borderStrong}`, borderRadius: 7, color: token.textPrimary, background: 'rgba(0,0,0,0.25)', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }} />
//     <button type="button" onClick={onAdd} style={{ padding: '8px 14px', background: token.cyan, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
//   </div>
// );

// const IconBox = ({ icon: Icon, size = 15, bg = 'rgba(0,152,204,0.12)', bd = token.borderStrong, boxSize = 32, radius = 8 }) => (
//   <div style={{ width: boxSize, height: boxSize, borderRadius: radius, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//     <Icon size={size} color={token.cyan} />
//   </div>
// );

// const InfoRow = ({ icon: Icon, children, href }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
//     <IconBox icon={Icon} size={12} boxSize={28} radius={7} />
//     {href
//       ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: token.cyan, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}<ExternalLink size={10} /></a>
//       : <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
//     }
//   </div>
// );

// // ─── Photo Upload ─────────────────────────────────────────────────────────────
// const PhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState('idle');
//   const [errMsg, setErrMsg] = useState('');
//   const [preview, setPreview] = useState(currentUrl);
//   const [dragging, setDragging] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => { setPreview(currentUrl); }, [currentUrl]);

//   const handleFile = useCallback((file) => {
//     if (!file) return;
//     if (!ALLOWED_TYPES.includes(file.type)) { setErrMsg('Only JPG, PNG, WebP or GIF.'); setStatus('error'); return; }
//     if (file.size > MAX_MB * 1024 * 1024) { setErrMsg(`Max ${MAX_MB} MB.`); setStatus('error'); return; }
//     setPreview(URL.createObjectURL(file));
//     setStatus('uploading'); setProgress(0); setErrMsg('');
//     const ext = file.name.split('.').pop();
//     const task = uploadBytesResumable(ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`), file);
//     task.on('state_changed',
//       snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
//       () => { setErrMsg('Upload failed.'); setStatus('error'); setPreview(currentUrl); },
//       async () => { try { const url = await getDownloadURL(task.snapshot.ref); setPreview(url); setStatus('done'); onUpload?.(url); } catch { setErrMsg('Could not get URL.'); setStatus('error'); } }
//     );
//   }, [userId, currentUrl, onUpload]);

//   const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }, [handleFile]);
//   const clear = e => { e?.stopPropagation(); setPreview(''); setStatus('idle'); setProgress(0); setErrMsg(''); onUpload?.(''); if (inputRef.current) inputRef.current.value = ''; };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       <Lbl>Profile Photo</Lbl>
//       <div onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
//         onClick={() => status !== 'uploading' && inputRef.current?.click()}
//         style={{ width: '100%', minHeight: preview ? 'auto' : 70, borderRadius: 12, border: `2px dashed ${dragging ? token.cyan : status === 'error' ? token.red : token.borderDash}`, background: dragging ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: status === 'uploading' ? 'not-allowed' : 'pointer', overflow: 'hidden' }}>
//         <input ref={inputRef} type="file" accept={ALLOWED_TYPES.join(',')} style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
//         {preview ? (
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
//             <div style={{ position: 'relative', flexShrink: 0 }}>
//               <img src={preview} alt="preview" style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', border: `2px solid ${status === 'done' ? token.green : token.borderStrong}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
//               {status === 'done' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: token.green, border: '2px solid #0a2d1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
//             </div>
//             <div style={{ flex: 1, minWidth: 0 }}>
//               {status === 'uploading' ? (
//                 <>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><Loader2 size={12} color={token.cyan} style={{ animation: 'spin .9s linear infinite' }} /><span style={{ fontFamily: F, fontSize: 12, color: token.textSecondary, fontWeight: 600 }}>Uploading… {progress}%</span></div>
//                   <div style={{ width: '100%', height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 100, overflow: 'hidden' }}><div style={{ height: 4, width: `${progress}%`, background: `linear-gradient(90deg,${token.cyan},#22d3ee)`, borderRadius: 100, transition: 'width .2s' }} /></div>
//                 </>
//               ) : <><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: status === 'done' ? token.green : token.textSecondary }}>{status === 'done' ? 'Uploaded!' : 'Ready'}</span><p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '2px 0 0' }}>Click to replace</p></>}
//             </div>
//             {status !== 'uploading' && <button type="button" onClick={clear} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', color: token.red, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={13} /></button>}
//           </div>
//         ) : (
//           <div style={{ textAlign: 'center', padding: '24px 20px' }}>
//             <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
//               {dragging ? <Upload size={18} color={token.cyan} /> : <Camera size={18} color={token.cyan} />}
//             </div>
//             <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textSecondary, margin: '0 0 3px' }}>{dragging ? 'Drop to upload' : 'Upload Profile Photo'}</p>
//             <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
//           </div>
//         )}
//       </div>
//       {status === 'error' && errMsg && (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: token.red }}>
//           <AlertCircle size={13} style={{ flexShrink: 0 }} />{errMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Availability Panel ───────────────────────────────────────────────────────
// const AvailPanel = ({ availability, isEditing, setFormData }) => {
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [weekdaysOnly, setWeekdaysOnly] = useState(true);
//   const [blockStart, setBlockStart] = useState('09:00');
//   const [blockEnd, setBlockEnd] = useState('12:00');
//   const [timeBlocks, setTimeBlocks] = useState([]);
//   const [err, setErr] = useState('');

//   const flat = (availability || []).filter(s => s.date)
//     .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
//     .sort((a, b) => new Date(a.ds) - new Date(b.ds));

//   const chunkBlock = (start, end) => {
//     const chunks = []; let [h, m] = start.split(':').map(Number);
//     const [eh, em] = end.split(':').map(Number);
//     while (h * 60 + m < eh * 60 + em) {
//       const s = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; m += 30;
//       if (m >= 60) { h++; m -= 60; }
//       chunks.push({ startTime: s, endTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
//     }
//     return chunks;
//   };

//   const totalDays = (() => {
//     if (!dateFrom || !dateTo) return 0;
//     let count = 0, cur = new Date(dateFrom + 'T12:00:00');
//     const end = new Date(dateTo + 'T12:00:00');
//     while (cur <= end) { const dow = cur.getDay(); if (!weekdaysOnly || (dow !== 0 && dow !== 6)) count++; cur.setDate(cur.getDate() + 1); }
//     return count;
//   })();
//   const totalSlotsPreview = totalDays * timeBlocks.reduce((sum, b) => sum + slotCount(b.start, b.end), 0);

//   const addBlock = () => {
//     setErr('');
//     const [sh, sm] = blockStart.split(':').map(Number), [eh, em] = blockEnd.split(':').map(Number);
//     if (sh * 60 + sm >= eh * 60 + em) { setErr('End must be after start.'); return; }
//     if (slotCount(blockStart, blockEnd) < 1) { setErr('Block must be ≥ 30 min.'); return; }
//     for (const b of timeBlocks) {
//       const [bsh, bsm] = b.start.split(':').map(Number), [beh, bem] = b.end.split(':').map(Number);
//       if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setErr(`Overlaps with ${b.start}–${b.end}`); return; }
//     }
//     setTimeBlocks(p => [...p, { start: blockStart, end: blockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
//     setBlockStart('09:00'); setBlockEnd('12:00');
//   };

//   const generate = () => {
//     setErr('');
//     if (!dateFrom || !dateTo) { setErr('Select a date range.'); return; }

//     let cur = new Date(dateFrom + 'T12:00:00');  // ← Explicitly add time
//     const end = new Date(dateTo + 'T12:00:00');

//     while (cur <= end) {
//       const dow = cur.getDay();
//       console.log(`Date: ${cur.toISOString().split('T')[0]}, Day: ${cur.toLocaleDateString('en-US', { weekday: 'long' })}, weekdaysOnly: ${weekdaysOnly}`);

//       if (!weekdaysOnly || (dow !== 0 && dow !== 6)) {  // Skip weekends if toggled
//         // ... generate slots
//       }
//       cur.setDate(cur.getDate() + 1);
//     }
//   };
//   const remove = (ds, startTime) =>
//     setFormData(p => ({ ...p, availability: (p.availability || []).filter(s => !(new Date(s.date).toISOString().split('T')[0] === ds && s.startTime === startTime)) }));

//   const inputSt = { fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box', border: `1.5px solid ${token.borderStrong}`, borderRadius: 7, padding: '8px 10px', color: token.textPrimary, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' };

//   const available = flat.filter(s => !s.isBooked);
//   const booked = flat.filter(s => s.isBooked);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

//       {/* ── Editor ── */}
//       {isEditing && (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//           {/* Date Range */}
//           <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${token.borderDash}`, borderRadius: 12, padding: '14px 16px' }}>
//             <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
//               <Calendar size={11} color={token.cyan} style={{ flexShrink: 0 }} />Section 1 — Date Range
//             </p>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
//               <div><Lbl>From</Lbl><input type="date" value={dateFrom} min={tomorrow()} onChange={e => { setDateFrom(e.target.value); setErr(''); }} style={inputSt} /></div>
//               <div><Lbl>To</Lbl><input type="date" value={dateTo} min={dateFrom || tomorrow()} onChange={e => { setDateTo(e.target.value); setErr(''); }} style={inputSt} /></div>
//             </div>
//             <button type="button" onClick={() => setWeekdaysOnly(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//               <div style={{ width: 34, height: 18, borderRadius: 100, background: weekdaysOnly ? token.cyan : 'rgba(0,0,0,0.3)', border: `1.5px solid ${weekdaysOnly ? token.cyan : token.borderStrong}`, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
//                 <div style={{ position: 'absolute', top: 2, left: weekdaysOnly ? 16 : 2, width: 10, height: 10, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
//               </div>
//               <span style={{ fontFamily: F, fontSize: 12, color: token.textSecondary, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
//             </button>
//             {dateFrom && dateTo && (
//               <div style={{ marginTop: 10, padding: '7px 11px', borderRadius: 7, background: 'rgba(0,152,204,0.08)', border: `1px solid rgba(0,152,204,0.2)`, fontFamily: F, fontSize: 11.5, color: token.cyan, fontWeight: 600 }}>
//                 📅 {totalDays} day{totalDays !== 1 ? 's' : ''} selected{weekdaysOnly ? ' (weekdays only)' : ' (incl. weekends)'}
//               </div>
//             )}
//           </div>

//           {/* Time Blocks */}
//           <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${token.borderDash}`, borderRadius: 12, padding: '14px 16px' }}>
//             <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
//               <Clock size={11} color={token.cyan} style={{ flexShrink: 0 }} />Section 2 — Time Blocks
//             </p>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
//               <div style={{ flex: 1, minWidth: 100 }}><Lbl>Start</Lbl><input type="time" value={blockStart} onChange={e => setBlockStart(e.target.value)} style={inputSt} /></div>
//               <div style={{ flex: 1, minWidth: 100 }}><Lbl>End</Lbl><input type="time" value={blockEnd} onChange={e => setBlockEnd(e.target.value)} style={inputSt} /></div>
//               {blockStart && blockEnd && slotCount(blockStart, blockEnd) > 0 && (
//                 <div style={{ padding: '7px 10px', borderRadius: 7, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700, alignSelf: 'flex-end', flexShrink: 0 }}>
//                   {slotCount(blockStart, blockEnd)} slots
//                 </div>
//               )}
//               <button type="button" onClick={addBlock} style={{ padding: '8px 14px', background: token.cyan, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-end', flexShrink: 0 }}>
//                 <Plus size={13} />Add Block
//               </button>
//             </div>
//             {timeBlocks.length > 0
//               ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                 {timeBlocks.map((b, i) => (
//                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: 'rgba(0,152,204,0.08)', border: `1px solid rgba(0,152,204,0.2)` }}>
//                     <Clock size={13} color={token.cyan} style={{ flexShrink: 0 }} />
//                     <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textPrimary, flex: 1 }}>{b.start} — {b.end}</span>
//                     <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 8px', borderRadius: 20 }}>
//                       {slotCount(b.start, b.end)} × 30 min/day
//                     </span>
//                     <button type="button" onClick={() => setTimeBlocks(p => p.filter((_, j) => j !== i))} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', color: token.red, borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               : <div style={{ textAlign: 'center', padding: 14, background: 'rgba(0,0,0,0.1)', border: `1px dashed rgba(0,152,204,0.14)`, borderRadius: 8 }}>
//                 <p style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, margin: 0 }}>Add blocks above — e.g. 9:00–12:00, 15:00–18:00</p>
//               </div>
//             }
//           </div>

//           {/* Generate */}
//           {timeBlocks.length > 0 && dateFrom && dateTo && (
//             <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,152,204,0.06)', border: `1px solid rgba(0,152,204,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
//               <div>
//                 <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.textPrimary, margin: '0 0 2px' }}>⚡ {totalSlotsPreview} slots will be generated</p>
//                 <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: 0 }}>{totalDays} days × {timeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day · Duplicates skipped</p>
//               </div>
//               <button type="button" onClick={generate} style={{ padding: '10px 20px', background: token.cyan, color: '#fff', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
//                 <CheckCircle size={14} />Generate
//               </button>
//             </div>
//           )}
//           {err && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: token.red }}>
//               <AlertCircle size={13} style={{ flexShrink: 0 }} />{err}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── Slots Grid Display ── */}
//       {flat.length === 0
//         ? <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${token.borderStrong}`, borderRadius: 10 }}>
//           <Calendar size={22} color={token.textMuted} style={{ margin: '0 auto 7px', display: 'block' }} />
//           <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: 0 }}>No sessions scheduled yet.</p>
//         </div>
//         : <div>
//           {/* Summary row */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
//             <span style={{ fontFamily: F, fontSize: 11, color: token.cyan, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
//               <CheckCircle size={11} />{flat.length} total
//             </span>
//             <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700 }}>● {available.length} available</span>
//             {booked.length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: token.amber, fontWeight: 700 }}>● {booked.length} booked</span>}
//           </div>

//           {/* 5-per-row slot grid */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
//             {flat.map(slot => {
//               const d = new Date(slot.ds);
//               const key = `${slot.ds}_${slot.startTime}`;
//               return (
//                 <div key={key} style={{ position: 'relative', padding: '10px 8px', borderRadius: 10, textAlign: 'center', background: slot.isBooked ? 'rgba(232,160,32,0.1)' : 'rgba(0,152,204,0.07)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.3)' : 'rgba(0,152,204,0.2)'}`, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
//                   {/* Day label */}
//                   <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px' }}>
//                     {d.toLocaleDateString('en-IN', { weekday: 'short' })}
//                   </span>
//                   {/* Date number */}
//                   <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: token.textPrimary, lineHeight: 1 }}>
//                     {d.getDate()}
//                   </div>
//                   {/* Month */}
//                   <span style={{ fontFamily: F, fontSize: 9, color: token.textMuted }}>
//                     {d.toLocaleDateString('en-IN', { month: 'short' })} {d.getFullYear().toString().slice(2)}
//                   </span>
//                   {/* Time */}
//                   <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: slot.isBooked ? token.amber : token.textSecondary, background: slot.isBooked ? 'rgba(232,160,32,0.12)' : 'rgba(0,0,0,0.2)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.25)' : 'rgba(0,152,204,0.15)'}`, borderRadius: 6, padding: '3px 6px', width: '100%', boxSizing: 'border-box' }}>
//                     {slot.startTime}
//                   </div>
//                   {/* Status dot */}
//                   {slot.isBooked
//                     ? <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: token.amber }}>Booked</span>
//                     : <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: token.green }}>Free</span>
//                   }
//                   {/* Remove button in edit mode */}
//                   {isEditing && !slot.isBooked && (
//                     <button onClick={() => remove(slot.ds, slot.startTime)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(224,80,80,0.15)', border: '1px solid rgba(224,80,80,0.3)', color: token.red, borderRadius: 4, width: 16, height: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
//                       <X size={9} />
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       }
//     </div>
//   );
// };

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard = ({ title, subtitle, icon: Icon, onEdit, isSaving, children, emptyState }) => (
//   <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, overflow: 'hidden' }}>
//     <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${token.border}` }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
//         {Icon && <IconBox icon={Icon} />}
//         <div style={{ minWidth: 0 }}>
//           <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: token.textPrimary, margin: 0 }}>{title}</h2>
//           {subtitle && <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: '2px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
//         </div>
//       </div>
//       <button onClick={onEdit} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: token.textSecondary, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', opacity: isSaving ? .5 : 1, fontFamily: F, whiteSpace: 'nowrap' }}>
//         {isSaving ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Edit size={13} />}
//         {isSaving ? 'Saving…' : 'Edit'}
//       </button>
//     </div>
//     <div style={{ padding: '18px 22px' }}>
//       {children || (emptyState && (
//         <div style={{ textAlign: 'center', padding: '28px 16px' }}>
//           <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>{emptyState.message}</p>
//           <button onClick={onEdit} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>{emptyState.cta}</button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ─── Pending Card ─────────────────────────────────────────────────────────────
// const PendingCard = ({ mentorData, onEdit }) => {
//   const pending = [
//     !mentorData.profilePhoto && 'Profile Photo', !mentorData.location && 'Location',
//     !mentorData.phone && 'Phone number', !mentorData.linkedinUrl && 'LinkedIn URL',
//     !mentorData.whyMentor && 'Bio / About', !mentorData.currentSkills && 'Specialisations',
//     !mentorData.guidanceAreas?.length && 'Areas of Guidance', !mentorData.hourlyRate && 'Hourly rate',
//     !mentorData.yearsOfExperience && 'Years of experience', !mentorData.highestDegree && 'Education',
//     !mentorData.mentorshipFormat && 'Mentorship Format', !mentorData.languages?.length && 'Languages',
//   ].filter(Boolean);
//   if (!pending.length) return null;
//   return (
//     <div style={{ background: token.card, borderRadius: 16, border: '1px solid rgba(232,160,32,0.22)', overflow: 'hidden' }}>
//       <div style={{ background: 'rgba(232,160,32,0.12)', padding: '14px 20px', borderBottom: '1px solid rgba(232,160,32,0.18)', display: 'flex', alignItems: 'center', gap: 8 }}>
//         <AlertTriangle size={15} color={token.amber} />
//         <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: 0, flex: 1 }}>Pending Details</h3>
//         <span style={{ background: token.amber, color: '#fff', fontFamily: F, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>{pending.length}</span>
//       </div>
//       <div style={{ padding: '12px 20px' }}>
//         <p style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, margin: '0 0 10px' }}>Complete these to improve visibility.</p>
//         {pending.map((item, i) => (
//           <button key={i} onClick={onEdit} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < pending.length - 1 ? `1px solid ${token.border}` : 'none' }}>
//             <span style={{ width: 7, height: 7, borderRadius: '50%', background: token.amber, flexShrink: 0 }} />
//             <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, flex: 1, textAlign: 'left' }}>{item}</span>
//             <ChevronRight size={13} color={token.textMuted} />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── Edit Modal ───────────────────────────────────────────────────────────────
// const EditModal = ({ isOpen, onClose, section, formData, setFormData, onSave, isSaving, userId }) => {
//   const [cur, setCur] = useState(section);
//   const [errors, setErrors] = useState({});
//   const [inputs, setInputs] = useState({ skill: '', lang: '', guid: '', cert: '', accomp: '' });
//   const wasOpen = useRef(false);

//   useEffect(() => { if (isOpen && !wasOpen.current) { setCur(section); setErrors({}); } wasOpen.current = isOpen; }, [isOpen]); // eslint-disable-line

//   if (!isOpen) return null;

//   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));
//   const setInp = (k, v) => setInputs(p => ({ ...p, [k]: v }));

//   const addCSV = (field, key) => { const v = inputs[key].trim(); if (!v) return; const arr = splitCSV(formData[field]); if (!arr.includes(v)) set(field, joinCSV([...arr, v])); setInp(key, ''); };
//   const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter(s => s !== val)));
//   const addArr = (field, key) => { const v = inputs[key].trim(); if (!v) return; const arr = Array.isArray(formData[field]) ? formData[field] : []; if (!arr.includes(v)) set(field, [...arr, v]); setInp(key, ''); };
//   const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

//   const validate = () => {
//     const e = {};
//     if (cur === 'overview') { if (!formData.fullName?.trim()) e.fullName = 'Required.'; if (!formData.currentRole?.trim()) e.role = 'Required.'; }
//     if (cur === 'experience') { if (!formData.yearsOfExperience) e.yoe = 'Required.'; if (!formData.hourlyRate) e.rate = 'Required.'; }
//     setErrors(e); return !Object.keys(e).length;
//   };

//   const handleSave = async (close) => { if (!validate()) return; await onSave(close); };
//   const handleNext = async () => { if (!validate()) return; const idx = NAV_ORDER.indexOf(cur); if (idx < NAV_ORDER.length - 1) { setCur(NAV_ORDER[idx + 1]); setErrors({}); } await onSave(false); };

//   const skills = splitCSV(formData.currentSkills);
//   const langs = Array.isArray(formData.languages) ? formData.languages : [];
//   const guids = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
//   const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
//   const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
//   const isLast = cur === NAV_ORDER[NAV_ORDER.length - 1];

//   const nav = [
//     { id: 'overview', label: 'Overview', icon: Award },
//     { id: 'experience', label: 'Experience', icon: Briefcase },
//     { id: 'engagement', label: 'Engagement', icon: MessageCircle },
//     { id: 'achievements', label: 'Achievements', icon: Trophy },
//   ];

//   const tabs = {
//     overview: (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//         <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Basic Information</h3>
//         <div style={{ maxWidth: 300 }}>
//           <PhotoUpload currentUrl={formData.profilePhoto || ''} onUpload={url => set('profilePhoto', url)} userId={userId} />
//         </div>        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
//           <div><Lbl required>Full Name</Lbl><Field value={formData.fullName || ''} onChange={e => { set('fullName', e.target.value); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })); }} placeholder="Your full name" error={errors.fullName} /><FieldErr msg={errors.fullName} /></div>
//           <div><Lbl required>Professional Title</Lbl><Field value={formData.currentRole || ''} onChange={e => { set('currentRole', e.target.value); if (errors.role) setErrors(p => ({ ...p, role: '' })); }} placeholder="e.g. Senior Engineer" error={errors.role} /><FieldErr msg={errors.role} /></div>
//           <div><Lbl>Location</Lbl><Field value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" /></div>
//           <div><Lbl>Phone</Lbl><Field value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 1234567890" /></div>
//           <div><Lbl>LinkedIn</Lbl><Field value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
//           <div><Lbl>Mentoring Style</Lbl><Field value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative, Goal-oriented" /></div>
//         </div>
//         <div><Lbl>Bio / About</Lbl><Field value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey…" multiline /></div>
//         <div>
//           <Lbl>Specialisations / Domains</Lbl>
//           <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing</p>
//           <TagRow placeholder="Add a specialisation…" value={inputs.skill} onChange={v => setInp('skill', v)} onAdd={() => addCSV('currentSkills', 'skill')} />
//           {skills.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV('currentSkills', s)} />)}</div>}
//         </div>
//       </div>
//     ),
//     experience: (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//         <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Professional Background</h3>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
//           <div><Lbl>Organisation</Lbl><Field value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Google" /></div>
//           <div><Lbl>Position</Lbl><Field value={formData.currentPosition || ''} onChange={e => set('currentPosition', e.target.value)} placeholder="e.g. Principal Engineer" /></div>
//           <div><Lbl required>Years of Experience</Lbl><Field type="number" value={formData.yearsOfExperience || ''} onChange={e => { set('yearsOfExperience', e.target.value); if (errors.yoe) setErrors(p => ({ ...p, yoe: '' })); }} placeholder="e.g. 8" error={errors.yoe} /><FieldErr msg={errors.yoe} /></div>
//           <div><Lbl required>Hourly Rate (₹)</Lbl><Field type="number" value={formData.hourlyRate || ''} onChange={e => { set('hourlyRate', e.target.value); if (errors.rate) setErrors(p => ({ ...p, rate: '' })); }} placeholder="e.g. 1500" error={errors.rate} /><FieldErr msg={errors.rate} /></div>
//         </div>
//         <div style={{ background: 'rgba(0,0,0,0.15)', border: `1px solid ${token.border}`, borderRadius: 10, padding: '14px 16px' }}>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>Educational Background</p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
//             <div><Lbl>Highest Degree</Lbl><Select value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)}><option value="">Select degree</option>{["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map(o => <option key={o} value={o}>{o}</option>)}</Select></div>
//             <div><Lbl>Field of Study</Lbl><Field value={formData.fieldOfStudy || ''} onChange={e => set('fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" /></div>
//             <div><Lbl>Institution</Lbl><Field value={formData.schoolName || ''} onChange={e => set('schoolName', e.target.value)} placeholder="e.g. IIT Bombay" /></div>
//           </div>
//         </div>
//       </div>
//     ),
//     engagement: (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//         <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Engagement</h3>
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={12} />Availability</p>
//           <AvailPanel availability={formData.availability} isEditing setFormData={setFormData} />
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />Languages</p>
//           <TagRow placeholder="e.g. English, Hindi" value={inputs.lang} onChange={v => setInp('lang', v)} onAdd={() => addArr('languages', 'lang')} />
//           {langs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr('languages', l)} />)}</div>}
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Video size={12} />Mentorship Format</p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//             {['Online', 'Group Sessions', 'One-on-One'].map(fmt => {
//               const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
//               return (
//                 <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set('mentorshipFormat', joinCSV(sel ? c.filter(s => s !== fmt) : [...c, fmt])); }}
//                   style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 14px', borderRadius: 8, border: `1.5px solid ${sel ? token.cyan : token.borderStrong}`, background: sel ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.15)', color: sel ? token.cyan : token.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
//                   <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? token.cyan : token.borderStrong }} />{fmt}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={12} />Contact / Booking</p>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//             <div><Lbl>Platform Messaging</Lbl><Field value={formData.platformMessaging || ''} onChange={e => set('platformMessaging', e.target.value)} placeholder="@username" /></div>
//             <div><Lbl>Calendar / Booking Link</Lbl><Field value={formData.calendarLink || ''} onChange={e => set('calendarLink', e.target.value)} placeholder="https://calendly.com/…" /></div>
//           </div>
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><Target size={12} />Areas of Guidance</p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
//             {['Career Prep', 'Interview Coaching', 'Technical Skills', 'Soft Skills', 'Leadership', 'Resume Review', 'Startup Guidance'].map(g => {
//               const sel = guids.includes(g);
//               return (
//                 <button key={g} type="button" onClick={() => set('guidanceAreas', sel ? guids.filter(x => x !== g) : [...guids, g])}
//                   style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${sel ? token.green : token.borderStrong}`, background: sel ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0.15)', color: sel ? token.green : token.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
//                   <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? token.green : token.borderStrong }} />{g}
//                 </button>
//               );
//             })}
//           </div>
//           <TagRow placeholder="Custom guidance area…" value={inputs.guid} onChange={v => setInp('guid', v)} onAdd={() => addArr('guidanceAreas', 'guid')} />
//           {guids.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{guids.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas', g)} />)}</div>}
//         </div>
//       </div>
//     ),
//     achievements: (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//         <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Achievements & Credentials</h3>
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={12} />Key Accomplishments</p>
//           <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '0 0 4px' }}>Notable projects, awards, publications…</p>
//           <TagRow placeholder="e.g. Led team that scaled to 1M users" value={inputs.accomp} onChange={v => setInp('accomp', v)} onAdd={() => addArr('accomplishments', 'accomp')} />
//           {accomps.length > 0 && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
//               {accomps.map((a, i) => (
//                 <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${token.border}`, borderRadius: 9 }}>
//                   <Trophy size={13} color={token.amber} style={{ flexShrink: 0, marginTop: 1 }} />
//                   <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, flex: 1, wordBreak: 'break-word' }}>{a}</span>
//                   <button onClick={() => rmArr('accomplishments', a)} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.2)', color: token.red, borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={11} /></button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><BadgeCheck size={12} />Certifications</p>
//           <TagRow placeholder="e.g. AWS Certified Solutions Architect" value={inputs.cert} onChange={v => setInp('cert', v)} onAdd={() => addArr('certifications', 'cert')} />
//           {certs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr('certifications', c)} />)}</div>}
//         </div>
//         <div style={{ height: 1, background: token.border }} />
//         <div>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={12} />Portfolio / Media Links</p>
//           <div style={{ background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.22)', borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: token.textSecondary, marginBottom: 14, lineHeight: 1.7 }}>
//             Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
//           </div>
//           {[{ label: 'Portfolio', field: 'portfolioLink', placeholder: 'https://drive.google.com/…' }, { label: 'Intro Video', field: 'videoLink', placeholder: 'https://youtube.com/…' }].map(({ label, field, placeholder }) => (
//             <div key={field} style={{ marginBottom: 12 }}>
//               <Lbl>{label}</Lbl>
//               <Field value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
//               {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: token.cyan, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}><Eye size={12} />Preview →</a>}
//             </div>
//           ))}
//         </div>
//       </div>
//     ),
//   };

//   return (
//     <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 20 }}>
//       <div style={{ background: token.card, width: '100%', maxWidth: 760, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: `1px solid ${token.borderStrong}`, borderRadius: 16 }}>
//         {/* Header */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${token.border}`, flexShrink: 0 }}>
//           <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: token.textPrimary, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Pencil size={16} color={token.cyan} />Edit Profile</h2>
//           <button onClick={onClose} disabled={isSaving} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${token.border}`, color: token.textSecondary, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
//         </div>

//         {/* Body */}
//         <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
//           {/* Sidebar nav */}
//           <div style={{ background: 'rgba(0,0,0,0.2)', borderRight: `1px solid ${token.border}`, width: 176, flexShrink: 0, overflow: 'auto' }}>
//             <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 12 }}>
//               {nav.map(({ id, label, icon: Icon }) => (
//                 <button key={id} type="button" onClick={() => { setCur(id); setErrors({}); }}
//                   style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', background: cur === id ? token.cyan : 'transparent', color: cur === id ? '#fff' : token.textMuted, border: `1px solid ${cur === id ? token.cyan : token.border}` }}>
//                   <Icon size={13} />{label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//           {/* Content */}
//           <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>{tabs[cur]}</div>
//         </div>

//         {/* Footer */}
//         <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: `1px solid ${token.border}`, background: 'rgba(0,0,0,0.2)', flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//           <button type="button" onClick={onClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${token.borderStrong}`, borderRadius: 8, color: token.textSecondary, background: 'transparent', cursor: 'pointer' }}>Cancel</button>
//           <div style={{ display: 'flex', gap: 8 }}>
//             <button type="button" onClick={() => handleSave(true)} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${token.borderStrong}`, borderRadius: 8, color: token.textSecondary, background: 'transparent', cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
//               {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
//             </button>
//             {!isLast && (
//               <button type="button" onClick={handleNext} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: token.cyan, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
//                 {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── AvailView (read-only: date cards → click → slots) ───────────────────────
// const AvailView = ({ availability }) => {
//   const [selectedDs, setSelectedDs] = useState(null);

//   const flat = (availability || [])
//     .filter(s => s.date)
//     .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
//     .sort((a, b) => new Date(a.ds) - new Date(b.ds));

//   // Unique dates, preserving order
//   const uniqueDates = [...new Map(flat.map(s => [s.ds, s])).values()];

//   const slotsForDate = selectedDs ? flat.filter(s => s.ds === selectedDs) : [];
//   const dateObj = selectedDs ? new Date(selectedDs + 'T12:00:00') : null;

//   if (flat.length === 0) return (
//     <div style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${token.borderStrong}`, borderRadius: 10 }}>
//       <Calendar size={22} color={token.textMuted} style={{ margin: '0 auto 7px', display: 'block' }} />
//       <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: 0 }}>No sessions scheduled yet.</p>
//     </div>
//   );

//   const totalAvail = flat.filter(s => !s.isBooked).length;
//   const totalBooked = flat.filter(s => s.isBooked).length;

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//       {/* Summary strip */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
//         <span style={{ fontFamily: F, fontSize: 11, color: token.cyan, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
//           <Calendar size={11} />{uniqueDates.length} date{uniqueDates.length !== 1 ? 's' : ''}
//         </span>
//         <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700 }}>● {totalAvail} available</span>
//         {totalBooked > 0 && <span style={{ fontFamily: F, fontSize: 11, color: token.amber, fontWeight: 700 }}>● {totalBooked} booked</span>}
//         {selectedDs && (
//           <button onClick={() => setSelectedDs(null)} style={{ marginLeft: 'auto', fontFamily: F, fontSize: 11, color: token.textMuted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
//             <X size={11} />Clear
//           </button>
//         )}
//       </div>

//       {/* Date cards — 5 per row */}
//       <div className="mp-avail-grid">
//         {uniqueDates.map(({ ds }) => {
//           const d = new Date(ds + 'T12:00:00');
//           const slots = flat.filter(s => s.ds === ds);
//           const avail = slots.filter(s => !s.isBooked).length;
//           const booked = slots.filter(s => s.isBooked).length;
//           const isSelected = selectedDs === ds;
//           const allBooked = avail === 0;

//           return (
//             <button
//               key={ds}
//               type="button"
//               onClick={() => setSelectedDs(isSelected ? null : ds)}
//               style={{
//                 padding: '10px 8px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
//                 background: isSelected ? token.cyan : allBooked ? 'rgba(232,160,32,0.08)' : 'rgba(0,152,204,0.07)',
//                 border: `1.5px solid ${isSelected ? token.cyan : allBooked ? 'rgba(232,160,32,0.3)' : 'rgba(0,152,204,0.2)'}`,
//                 display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center',
//                 transition: 'all .15s', fontFamily: F,
//                 boxShadow: isSelected ? `0 4px 16px rgba(0,152,204,0.3)` : 'none',
//               }}
//             >
//               {/* Weekday */}
//               <span style={{ fontSize: 9, fontWeight: 700, color: isSelected ? 'rgba(255,255,255,0.75)' : token.cyan, textTransform: 'uppercase', letterSpacing: '.5px' }}>
//                 {d.toLocaleDateString('en-IN', { weekday: 'short' })}
//               </span>
//               {/* Day number */}
//               <div style={{ fontSize: 20, fontWeight: 800, color: isSelected ? '#fff' : token.textPrimary, lineHeight: 1 }}>
//                 {d.getDate()}
//               </div>
//               {/* Month year */}
//               <span style={{ fontSize: 9, color: isSelected ? 'rgba(255,255,255,0.6)' : token.textMuted }}>
//                 {d.toLocaleDateString('en-IN', { month: 'short' })} '{d.getFullYear().toString().slice(2)}
//               </span>
//               {booked > 0 && (
//                 <span style={{ fontSize: 8.5, fontWeight: 700, color: isSelected ? '#fff' : token.amber, background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(232,160,32,0.12)', border: `1px solid ${isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(232,160,32,0.25)'}`, borderRadius: 20, padding: '1px 6px', marginTop: 2 }}>
//                   {booked} booked
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Slot panel — expands below when a date is selected */}
//       {selectedDs && (
//         <div style={{
//           background: 'rgba(0,0,0,0.2)', border: `1px solid ${token.borderStrong}`,
//           borderRadius: 12, padding: '14px 16px', animation: 'fadeUp .2s ease both',
//         }}>
//           <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
//             <Clock size={11} />
//             {dateObj?.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//             <span style={{ color: token.textMuted, fontWeight: 500, textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>· {slotsForDate.length} slot{slotsForDate.length !== 1 ? 's' : ''}</span>
//           </p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//             {slotsForDate.map(slot => (
//               <div key={`${slot.ds}_${slot.startTime}`} style={{
//                 display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
//                 borderRadius: 9,
//                 border: `1px solid ${slot.isBooked ? 'rgba(255,255,255,0.06)' : 'rgba(0,152,204,0.2)'}`,
//                 background: slot.isBooked ? 'rgba(0,0,0,0.18)' : 'rgba(0,152,204,0.07)',
//                 opacity: slot.isBooked ? 0.45 : 1,
//                 cursor: slot.isBooked ? 'not-allowed' : 'default',
//                 position: 'relative', overflow: 'hidden',
//               }}>
//                 <Clock size={12} color={slot.isBooked ? token.textMuted : token.cyan} style={{ flexShrink: 0 }} />
//                 <span style={{
//                   fontFamily: F, fontSize: 12.5, fontWeight: 700,
//                   color: slot.isBooked ? token.textMuted : token.textPrimary,
//                   textDecoration: slot.isBooked ? 'line-through' : 'none',
//                 }}>
//                   {slot.startTime} — {slot.endTime}
//                 </span>
//                 {slot.isBooked && (
//                   <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.textMuted, letterSpacing: '.3px' }}>
//                     Booked
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const MentorProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editSection, setEditSection] = useState('overview');
//   const [formData, setFormData] = useState({ availability: [] });
//   const [email, setEmail] = useState('');
//   const serverRef = useRef(null);

//   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
//   const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

//   useEffect(() => { const ud = localStorage.getItem('userData'); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
//   useEffect(() => { if (email) getMentorDetails(email); }, [email]);
//   useEffect(() => { if (data?.data) { serverRef.current = data.data; if (!isEditing) setFormData({ ...data.data }); } }, [data, isEditing]);

//   const handleEdit = (sec = 'overview') => { setEditSection(sec); setIsEditing(true); };
//   const handleClose = () => { setIsEditing(false); if (serverRef.current) setFormData({ ...serverRef.current }); };

//   const handleSave = async (shouldClose = true) => {
//     try {
//       const enriched = { ...formData, availability: (formData.availability || []).map(slot => { if (slot.day) return slot; const ds = new Date(slot.date).toISOString().split('T')[0]; return { ...slot, day: new Date(ds + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' }) }; }) };
//       await updateMentorDetails({ email, ...enriched }).unwrap();
//       try { showToast('Profile updated!', 'success'); } catch { }
//       if (shouldClose) { handleClose(); getMentorDetails(email); }
//     } catch { try { showToast('Failed to update.', 'error'); } catch { } }
//   };

//   if (isLoading || error || Object.keys(formData).length < 2) return (
//     <div style={{ fontFamily: F, minHeight: '100vh', background: token.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>
//   );

//   const skills = splitCSV(formData.currentSkills);
//   const langs = Array.isArray(formData.languages) ? formData.languages : [];
//   const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
//   const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
//   const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
//   const fmts = splitCSV(formData.mentorshipFormat);
//   const bio = formData.whyMentor || '';
//   const initials = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
//   const allFlat = (formData.availability || []).filter(s => s.date).map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }));

//   const cFields = [formData.fullName, formData.profilePhoto, formData.currentRole, formData.location, formData.companyName, formData.yearsOfExperience, formData.highestDegree, formData.currentSkills, formData.guidanceAreas?.length, formData.mentorshipFormat, formData.languages?.length, formData.hourlyRate];
//   const completionPct = Math.round(cFields.filter(Boolean).length / cFields.length * 100);

//   const completionSteps = [
//     { label: 'Full Name, Photo & Title', done: !!(formData.fullName && formData.currentRole) },
//     { label: 'Location & Contact', done: !!(formData.location && formData.phone) },
//     { label: 'Organisation & Experience', done: !!(formData.companyName && formData.yearsOfExperience) },
//     { label: 'Educational Background', done: !!(formData.highestDegree) },
//     { label: 'Specialisations & Domains', done: !!(formData.currentSkills) },
//     { label: 'Engagement & Availability', done: !!(formData.mentorshipFormat && formData.languages?.length) },
//   ];

//   const detailItems = [
//     formData.location && { label: 'Location', value: formData.location, icon: MapPin },
//     formData.yearsOfExperience && { label: 'Experience', value: `${formData.yearsOfExperience} yr`, icon: Briefcase },
//     formData.companyName && { label: 'Organisation', value: formData.companyName, icon: Briefcase },
//     formData.currentPosition && { label: 'Position', value: formData.currentPosition, icon: Briefcase },
//     formData.highestDegree && { label: 'Degree', value: formData.highestDegree, icon: Award },
//     formData.fieldOfStudy && { label: 'Field of Study', value: formData.fieldOfStudy, icon: BookOpen },
//     formData.schoolName && { label: 'Institution', value: formData.schoolName, icon: Award },
//     formData.mentoringStyle && { label: 'Mentoring Style', value: formData.mentoringStyle, icon: Star },
//   ].filter(Boolean);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         *,*::before,*::after{box-sizing:border-box}
//         @keyframes spin{to{transform:rotate(360deg)}}
//         @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//         html,body{font-family:${F};-webkit-font-smoothing:antialiased}
//         input:focus,textarea:focus,select:focus{border-color:${token.cyan}!important;outline:none}
//         ::-webkit-scrollbar{width:4px}
//         ::-webkit-scrollbar-thumb{background:rgba(0,152,204,0.26);border-radius:4px}
//         ::placeholder{color:${token.textMuted}!important}
//         input[type="time"]::-webkit-calendar-picker-indicator,
//         input[type="date"]::-webkit-calendar-picker-indicator{opacity:.4;cursor:pointer;filter:invert(1)}

//         .mp-wrap{max-width:1100px;margin:0 auto;padding:24px 20px 60px}
//         .mp-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;align-items:start;animation:fadeUp .4s ease .08s both}
//         .mp-left{display:flex;flex-direction:column;gap:16px;min-width:0}
//         .mp-sidebar{display:flex;flex-direction:column;gap:16px;min-width:0}
//         .mp-hero{background:linear-gradient(135deg,#071e12 0%,#0a2a18 50%,#062117 100%);border:1px solid ${token.border};border-radius:16px;padding:28px 28px 24px;margin-bottom:20px;animation:fadeUp .3s ease both}
//         .mp-avail-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}

//         @media(max-width:1024px){.mp-grid{grid-template-columns:1fr 280px;gap:16px}}
//         @media(max-width:900px){.mp-grid{grid-template-columns:1fr}.mp-sidebar{display:grid;grid-template-columns:1fr 1fr;gap:14px}.mp-avail-grid{grid-template-columns:repeat(4,1fr)}}
//         @media(max-width:768px){
//           .mp-sidebar{grid-template-columns:1fr}
//           .mp-avail-grid{grid-template-columns:repeat(3,1fr)}
//           .mp-hero{padding:18px 16px 16px}
//         }
//         @media(max-width:600px){
//           .mp-wrap{padding:12px 12px 40px}
//           .mp-hero{padding:16px 14px 14px;border-radius:12px;margin-bottom:12px}
//           .mp-avail-grid{grid-template-columns:repeat(3,1fr)}
//         }
//         @media(max-width:480px){
//           .mp-wrap{padding:10px 10px 36px}
//           .mp-avail-grid{grid-template-columns:repeat(2,1fr)}
//         }
//         @media(max-width:360px){
//           .mp-avail-grid{grid-template-columns:repeat(2,1fr)}
//         }

//         /* Modal responsive */
//         @media(max-width:768px){
//           .mp-modal{border-radius:16px 16px 0 0;max-height:95vh}
//           .mp-modal-overlay{align-items:flex-end;padding:0}
//           .mp-modal-body{flex-direction:column!important}
//           .mp-modal-nav{border-right:none!important;border-bottom:1px solid ${token.border};width:100%!important;flex-shrink:0}
//           .mp-modal-nav nav{flex-direction:row!important;padding:10px 14px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
//         }
//         @media(max-width:480px){
//           .mp-modal-footer{flex-direction:column;align-items:stretch}
//           .mp-modal-footer button{width:100%;justify-content:center}
//         }
//       `}</style>

//       <div style={{ fontFamily: F, minHeight: '100vh', background: token.bg, color: token.textPrimary }}>
//         <div className="mp-wrap">

//           {/* ── Hero ── */}
//           <div className="mp-hero">
//             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0, flex: 1 }}>
//                 {/* Avatar */}
//                 <div style={{ position: 'relative', flexShrink: 0 }}>
//                   {formData.profilePhoto
//                     ? <img src={formData.profilePhoto} alt={formData.fullName} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', border: `2px solid ${token.borderStrong}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
//                     : <div style={{ width: 72, height: 72, borderRadius: 14, background: 'rgba(0,152,204,0.12)', border: `2px solid ${token.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: token.cyan, fontFamily: F }}>{initials}</div>
//                   }
//                   {formData.status === 'approved' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: token.green, border: '2px solid #062117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
//                 </div>
//                 {/* Info */}
//                 <div style={{ minWidth: 0, flex: 1 }}>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6, alignItems: 'center' }}>
//                     {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
//                     <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.amber, background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)', padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating || '5.0'}</span>
//                     {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.green, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
//                   </div>
//                   <h1 style={{ fontFamily: F, fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 800, color: token.textPrimary, margin: '0 0 3px', lineHeight: 1.2, wordBreak: 'break-word' }}>
//                     {formData.fullName || <span style={{ color: token.textMuted, fontStyle: 'italic', fontWeight: 500 }}>No name added</span>}
//                   </h1>
//                   <p style={{ fontFamily: F, fontSize: 13, color: token.textSecondary, margin: '0 0 8px', fontWeight: 500 }}>
//                     {formData.currentRole || 'Mentor'}{formData.companyName && <span style={{ color: token.textMuted }}> · {formData.companyName}</span>}
//                   </p>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//                     {formData.location && <span style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{formData.location}</span>}
//                     {formData.email && <span style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{formData.email}</span>}
//                     {formData.createdAt && <span style={{ fontFamily: F, fontSize: 11, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
//                   </div>
//                 </div>
//               </div>
//               {/* Stats */}
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
//                 <div style={{ background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, borderRadius: 10, padding: '10px 14px', textAlign: 'center', minWidth: 66 }}>
//                   <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: token.textPrimary, lineHeight: 1 }}>{formData.yearsOfExperience || 0}yr</div>
//                   <div style={{ fontFamily: F, fontSize: 10, color: token.textMuted, marginTop: 3, fontWeight: 600 }}>Exp.</div>
//                 </div>
//                 <div style={{ background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'baseline', gap: 5 }}>
//                   <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: token.cyan }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
//                   <span style={{ fontFamily: F, fontSize: 11, color: token.textMuted }}>/hr</span>
//                 </div>
//                 <button onClick={() => handleEdit('overview')} style={{ background: token.cyan, border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: F }}>
//                   <Edit size={13} />Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ── Main Grid ── */}
//           <div className="mp-grid">
//             {/* LEFT */}
//             <div className="mp-left">

//               {/* Profile Overview */}
//               <SectionCard title="Profile Overview" subtitle="Visible to potential mentees." icon={Award} onEdit={() => handleEdit('overview')} isSaving={isSaving}>
//                 {bio && (
//                   <div style={{ marginBottom: 18 }}>
//                     <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>About</p>
//                     <p style={{ fontFamily: F, fontSize: 13, color: token.textSecondary, lineHeight: 1.8, margin: 0, wordBreak: 'break-word' }}>{bio}</p>
//                   </div>
//                 )}
//                 {(formData.email || formData.phone || formData.location || formData.linkedinUrl) && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: skills.length ? 18 : 0 }}>
//                     {formData.email && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
//                     {formData.phone && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
//                     {formData.location && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
//                     {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
//                   </div>
//                 )}
//                 {skills.length > 0 && (
//                   <div>
//                     <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Specialisations & Domains</p>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <Pill key={i} label={s} />)}</div>
//                   </div>
//                 )}
//                 {!bio && !skills.length && !formData.email && (
//                   <div style={{ textAlign: 'center', padding: '20px 0' }}>
//                     <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No profile info added yet.</p>
//                     <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
//                   </div>
//                 )}
//               </SectionCard>

//               {/* Professional Background */}
//               <SectionCard title="Professional Background" icon={Briefcase} onEdit={() => handleEdit('experience')} isSaving={isSaving}
//                 emptyState={detailItems.length === 0 ? { message: 'No professional background added.', cta: 'Add Details →' } : null}>
//                 {detailItems.length > 0 && (
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
//                     {detailItems.map((item, i) => (
//                       <div key={i}>
//                         <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 4px' }}>{item.label}</p>
//                         <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textPrimary, margin: 0, wordBreak: 'break-word' }}>{item.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </SectionCard>

//               {/* Engagement */}
//               <SectionCard title="Engagement Information" icon={MessageCircle} onEdit={() => handleEdit('engagement')} isSaving={isSaving}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//                   {fmts.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Mentorship Format</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{fmts.map((f, i) => <Pill key={i} label={f} />)}</div></div>}
//                   {langs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Languages</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" />)}</div></div>}
//                   {guidAreas.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Areas of Guidance</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" />)}</div></div>}
//                   {(formData.calendarLink || formData.platformMessaging) && (
//                     <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Booking</p>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                         {formData.calendarLink && <InfoRow icon={Calendar} href={formData.calendarLink}>Book a Session</InfoRow>}
//                         {formData.platformMessaging && <InfoRow icon={MessageCircle}>{formData.platformMessaging}</InfoRow>}
//                       </div>
//                     </div>
//                   )}
//                   <div>
//                     <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Availability</p>
//                     <AvailView availability={formData.availability} />
//                   </div>
//                   {!fmts.length && !langs.length && !guidAreas.length && !formData.calendarLink && allFlat.length === 0 && (
//                     <div style={{ textAlign: 'center', padding: '16px 0' }}>
//                       <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No engagement details added.</p>
//                       <button onClick={() => handleEdit('engagement')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Add Engagement Info →</button>
//                     </div>
//                   )}
//                 </div>
//               </SectionCard>

//               {/* Achievements */}
//               <SectionCard title="Achievements & Credentials" icon={Trophy} onEdit={() => handleEdit('achievements')} isSaving={isSaving}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//                   {accomps.length > 0 && (
//                     <div>
//                       <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Key Accomplishments</p>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
//                         {accomps.map((a, i) => (
//                           <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.18)', borderRadius: 9 }}>
//                             <Trophy size={13} color={token.amber} style={{ flexShrink: 0, marginTop: 1 }} />
//                             <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, wordBreak: 'break-word' }}>{a}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {certs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Certifications</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" />)}</div></div>}
//                   {(formData.portfolioLink || formData.videoLink) && (
//                     <div>
//                       <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Documents & Media</p>
//                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
//                         {[{ label: 'Portfolio', field: 'portfolioLink', icon: BookOpen }, { label: 'Intro Video', field: 'videoLink', icon: Eye }].filter(d => formData[d.field]).map(({ label, field, icon: Icon }) => (
//                           <a key={field} href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(0,0,0,0.15)', border: `1px solid ${token.border}`, borderRadius: 9, textDecoration: 'none', minWidth: 0 }}>
//                             <IconBox icon={Icon} size={12} boxSize={24} radius={6} />
//                             <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: token.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
//                             <ExternalLink size={10} color={token.textMuted} style={{ marginLeft: 'auto', flexShrink: 0 }} />
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {!accomps.length && !certs.length && !formData.portfolioLink && !formData.videoLink && (
//                     <div style={{ textAlign: 'center', padding: '16px 0' }}>
//                       <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No achievements added yet.</p>
//                       <button onClick={() => handleEdit('achievements')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Add Achievements →</button>
//                     </div>
//                   )}
//                 </div>
//               </SectionCard>
//             </div>

//             {/* SIDEBAR */}
//             <div className="mp-sidebar">
//               {/* Completion */}
//               <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, padding: 20 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
//                   <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: 0 }}>Profile Completion</h3>
//                   <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: completionPct === 100 ? token.green : token.cyan }}>{completionPct}%</span>
//                 </div>
//                 <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
//                   <div style={{ height: 6, borderRadius: 100, width: `${completionPct}%`, background: completionPct === 100 ? token.green : `linear-gradient(90deg,${token.cyan},#22d3ee)`, transition: 'width .7s ease' }} />
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   {completionSteps.map((step, i) => (
//                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       {step.done ? <CheckCircle size={16} color={token.green} style={{ flexShrink: 0 }} /> : <Circle size={16} color={token.borderStrong} style={{ flexShrink: 0 }} />}
//                       <span style={{ fontFamily: F, fontSize: 12.5, color: step.done ? token.textSecondary : token.textMuted, fontWeight: step.done ? 600 : 500 }}>{step.label}</span>
//                     </div>
//                   ))}
//                 </div>
//                 {completionPct < 100
//                   ? <button onClick={() => handleEdit('overview')} style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: token.cyan, border: 'none', borderRadius: 9, padding: 10, cursor: 'pointer' }}>Complete Your Profile</button>
//                   : <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CheckCircle size={16} color={token.green} /><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: token.green }}>Profile Complete!</span></div>
//                 }
//               </div>

//               {completionPct < 100 && <PendingCard mentorData={formData} onEdit={() => handleEdit('overview')} />}

//               {/* Quick Stats */}
//               <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, padding: 20 }}>
//                 <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: '0 0 14px' }}>Quick Stats</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   {[
//                     { label: 'Completed Sessions', value: formData.completedBookings || 0, icon: TrendingUp, col: token.cyan },
//                     { label: 'Total Mentees', value: formData.totalMentees || 0, icon: Users, col: token.green },
//                     { label: 'Rating', value: `${formData.rating || '5.0'} ★`, icon: Star, col: token.amber },
//                     { label: 'Available Slots', value: allFlat.filter(s => !s.isBooked).length, icon: Calendar, col: token.cyan },
//                   ].map(({ label, value, icon: Icon, col }) => (
//                     <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 9, border: `1px solid ${token.border}` }}>
//                       <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}22`, border: `1px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={14} color={col} /></div>
//                       <div style={{ minWidth: 0 }}>
//                         <div style={{ fontFamily: F, fontSize: 10, color: token.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
//                         <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: token.textPrimary, lineHeight: 1.2 }}>{value}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <EditModal
//         isOpen={isEditing} onClose={handleClose} section={editSection}
//         formData={formData} setFormData={setFormData}
//         onSave={handleSave} isSaving={isSaving} userId={email}
//       />
//     </>
//   );
// };

// export default MentorProfile;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, Star, Pencil, X, Plus, Trash2, Loader2,
  Eye, CheckCircle, Clock, Calendar, Briefcase,
  BookOpen, Award, FileText, TrendingUp, Users, Globe,
  Phone, Mail, AlertCircle, ExternalLink, ChevronRight,
  Circle, AlertTriangle, Edit, MessageCircle, Video,
  Trophy, BadgeCheck, Target, Upload, Camera,
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
import { showToast } from '../../../utils/Toastprovider';
import Loader from '../../../global/Loader';

// ─── Constants ───────────────────────────────────────────────────────────────
const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;
const MAX_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const NAV_ORDER = ['overview', 'experience', 'engagement', 'achievements'];

// ─── Pure Helpers ─────────────────────────────────────────────────────────────
const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const calcEnd = t => { const [h, m] = t.split(':').map(Number), tot = h * 60 + m + 30; return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
const splitCSV = str => (str || '').split(',').map(s => s.trim()).filter(Boolean);
const joinCSV = arr => arr.join(', ');
const slotCount = (s, e) => { const [sh, sm] = s.split(':').map(Number), [eh, em] = e.split(':').map(Number); return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30); };

// ─── Shared Styles ────────────────────────────────────────────────────────────
const token = {
  bg: '#062117', card: '#0a2d1e', cyan: '#0098cc',
  green: '#22c55e', amber: '#e8a020', red: '#e05050',
  textPrimary: '#e8f5f0', textSecondary: '#8fbfb0', textMuted: '#4a8070',
  border: 'rgba(0,152,204,0.14)', borderStrong: 'rgba(0,152,204,0.26)',
  borderDash: 'rgba(0,152,204,0.26)',
};

// ─── Atoms ───────────────────────────────────────────────────────────────────
const Pill = ({ label, onRemove, col = 'cyan' }) => {
  const palettes = {
    cyan: { bg: 'rgba(0,152,204,0.12)', bd: 'rgba(0,152,204,0.22)', c: '#0098cc' },
    amber: { bg: 'rgba(232,160,32,0.12)', bd: 'rgba(232,160,32,0.25)', c: '#e8a020' },
    teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: '#22c55e' },
    purple: { bg: 'rgba(167,139,250,0.1)', bd: 'rgba(167,139,250,0.25)', c: '#a78bfa' },
  };
  const p = palettes[col] || palettes.cyan;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: p.bg, border: `1px solid ${p.bd}`, color: p.c, whiteSpace: 'nowrap' }}>
      {label}
      {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .7, display: 'flex', alignItems: 'center' }}>×</button>}
    </span>
  );
};

const Lbl = ({ children, required }) => (
  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px' }}>
    {children}{required && <span style={{ color: token.red, marginLeft: 2 }}>*</span>}
  </p>
);

const Field = ({ value, onChange, placeholder, multiline, type = 'text', error }) => {
  const base = { fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${error ? token.red : token.borderStrong}`, borderRadius: 8, fontSize: 13, color: token.textPrimary, background: 'rgba(0,0,0,0.25)', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box', colorScheme: 'dark' };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={{ fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${token.borderStrong}`, borderRadius: 8, fontSize: 13, color: value ? token.textPrimary : token.textMuted, background: token.card, outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }}>
    {children}
  </select>
);

const FieldErr = ({ msg }) => msg ? (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: token.red }}>
    <AlertCircle size={10} />{msg}
  </div>
) : null;

const TagRow = ({ placeholder, value, onChange, onAdd }) => (
  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
    <input value={value} onChange={e => onChange(e.target.value)} onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} placeholder={placeholder}
      style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${token.borderStrong}`, borderRadius: 7, color: token.textPrimary, background: 'rgba(0,0,0,0.25)', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }} />
    <button type="button" onClick={onAdd} style={{ padding: '8px 14px', background: token.cyan, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
  </div>
);

const IconBox = ({ icon: Icon, size = 15, bg = 'rgba(0,152,204,0.12)', bd = token.borderStrong, boxSize = 32, radius = 8 }) => (
  <div style={{ width: boxSize, height: boxSize, borderRadius: radius, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <Icon size={size} color={token.cyan} />
  </div>
);

const InfoRow = ({ icon: Icon, children, href }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
    <IconBox icon={Icon} size={12} boxSize={28} radius={7} />
    {href
      ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: token.cyan, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}<ExternalLink size={10} /></a>
      : <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    }
  </div>
);

// ─── Photo Upload ─────────────────────────────────────────────────────────────
const PhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');
  const [preview, setPreview] = useState(currentUrl);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setPreview(currentUrl); }, [currentUrl]);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) { setErrMsg('Only JPG, PNG, WebP or GIF.'); setStatus('error'); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setErrMsg(`Max ${MAX_MB} MB.`); setStatus('error'); return; }
    setPreview(URL.createObjectURL(file));
    setStatus('uploading'); setProgress(0); setErrMsg('');
    const ext = file.name.split('.').pop();
    const task = uploadBytesResumable(ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`), file);
    task.on('state_changed',
      snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      () => { setErrMsg('Upload failed.'); setStatus('error'); setPreview(currentUrl); },
      async () => { try { const url = await getDownloadURL(task.snapshot.ref); setPreview(url); setStatus('done'); onUpload?.(url); } catch { setErrMsg('Could not get URL.'); setStatus('error'); } }
    );
  }, [userId, currentUrl, onUpload]);

  const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }, [handleFile]);
  const clear = e => { e?.stopPropagation(); setPreview(''); setStatus('idle'); setProgress(0); setErrMsg(''); onUpload?.(''); if (inputRef.current) inputRef.current.value = ''; };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Lbl>Profile Photo</Lbl>
      <div onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
        onClick={() => status !== 'uploading' && inputRef.current?.click()}
        style={{ width: '100%', minHeight: preview ? 'auto' : 70, borderRadius: 12, border: `2px dashed ${dragging ? token.cyan : status === 'error' ? token.red : token.borderDash}`, background: dragging ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: status === 'uploading' ? 'not-allowed' : 'pointer', overflow: 'hidden' }}>
        <input ref={inputRef} type="file" accept={ALLOWED_TYPES.join(',')} style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        {preview ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={preview} alt="preview" style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', border: `2px solid ${status === 'done' ? token.green : token.borderStrong}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
              {status === 'done' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: token.green, border: '2px solid #0a2d1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {status === 'uploading' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><Loader2 size={12} color={token.cyan} style={{ animation: 'spin .9s linear infinite' }} /><span style={{ fontFamily: F, fontSize: 12, color: token.textSecondary, fontWeight: 600 }}>Uploading… {progress}%</span></div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 100, overflow: 'hidden' }}><div style={{ height: 4, width: `${progress}%`, background: `linear-gradient(90deg,${token.cyan},#22d3ee)`, borderRadius: 100, transition: 'width .2s' }} /></div>
                </>
              ) : <><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: status === 'done' ? token.green : token.textSecondary }}>{status === 'done' ? 'Uploaded!' : 'Ready'}</span><p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '2px 0 0' }}>Click to replace</p></>}
            </div>
            {status !== 'uploading' && <button type="button" onClick={clear} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', color: token.red, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={13} /></button>}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 20px' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              {dragging ? <Upload size={18} color={token.cyan} /> : <Camera size={18} color={token.cyan} />}
            </div>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textSecondary, margin: '0 0 3px' }}>{dragging ? 'Drop to upload' : 'Upload Profile Photo'}</p>
            <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
          </div>
        )}
      </div>
      {status === 'error' && errMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: token.red }}>
          <AlertCircle size={13} style={{ flexShrink: 0 }} />{errMsg}
        </div>
      )}
    </div>
  );
};

// ─── Availability Panel ───────────────────────────────────────────────────────
const AvailPanel = ({ availability, isEditing, setFormData }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [weekdaysOnly, setWeekdaysOnly] = useState(true);
  const [blockStart, setBlockStart] = useState('09:00');
  const [blockEnd, setBlockEnd] = useState('12:00');
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [err, setErr] = useState('');

  const flat = (availability || []).filter(s => s.date)
    .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
    .sort((a, b) => new Date(a.ds) - new Date(b.ds));

  const chunkBlock = (start, end) => {
    const chunks = []; let [h, m] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    while (h * 60 + m < eh * 60 + em) {
      const s = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; m += 30;
      if (m >= 60) { h++; m -= 60; }
      chunks.push({ startTime: s, endTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
    }
    return chunks;
  };

  const totalDays = (() => {
    if (!dateFrom || !dateTo) return 0;
    let count = 0;
    // FIX: Use local date parsing instead of UTC time
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    
    let cur = new Date(fromDate);
    while (cur <= toDate) {
      const dow = cur.getDay();
      if (!weekdaysOnly || (dow !== 0 && dow !== 6)) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  })();

  const totalSlotsPreview = totalDays * timeBlocks.reduce((sum, b) => sum + slotCount(b.start, b.end), 0);

  const addBlock = () => {
    setErr('');
    const [sh, sm] = blockStart.split(':').map(Number), [eh, em] = blockEnd.split(':').map(Number);
    if (sh * 60 + sm >= eh * 60 + em) { setErr('End must be after start.'); return; }
    if (slotCount(blockStart, blockEnd) < 1) { setErr('Block must be ≥ 30 min.'); return; }
    for (const b of timeBlocks) {
      const [bsh, bsm] = b.start.split(':').map(Number), [beh, bem] = b.end.split(':').map(Number);
      if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setErr(`Overlaps with ${b.start}–${b.end}`); return; }
    }
    setTimeBlocks(p => [...p, { start: blockStart, end: blockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
    setBlockStart('09:00'); setBlockEnd('12:00');
  };

  const generate = () => {
    setErr('');
    if (!dateFrom || !dateTo) { setErr('Select a date range.'); return; }
    if (timeBlocks.length === 0) { setErr('Add at least one time block.'); return; }

    // FIX: Use local date parsing (no timezone shifts)
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    
    const newSlots = [];
    let cur = new Date(fromDate);

    while (cur <= toDate) {
      const dow = cur.getDay();
      const dateStr = cur.toISOString().split('T')[0]; // Get YYYY-MM-DD in local time

      // Skip weekends if toggle is on
      if (!weekdaysOnly || (dow !== 0 && dow !== 6)) {
        // Generate all time blocks for this date
        for (const block of timeBlocks) {
          const chunks = chunkBlock(block.start, block.end);
          for (const chunk of chunks) {
            newSlots.push({
              date: dateStr,
              startTime: chunk.startTime,
              endTime: chunk.endTime,
              isBooked: false,
            });
          }
        }
      }

      cur.setDate(cur.getDate() + 1);
    }

    // Remove duplicates based on date + startTime
    const seen = new Set();
    const uniqueSlots = newSlots.filter(slot => {
      const key = `${slot.date}_${slot.startTime}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Update formData with new slots (append, don't replace)
    setFormData(p => ({
      ...p,
      availability: [
        ...(p.availability || []).filter(s => s.isBooked), // Keep booked slots
        ...uniqueSlots, // Add new generated slots
      ],
    }));

    // Clear inputs after generation
    setDateFrom('');
    setDateTo('');
    setTimeBlocks([]);
    setErr('');
  };

  const remove = (ds, startTime) =>
    setFormData(p => ({ ...p, availability: (p.availability || []).filter(s => !(new Date(s.date).toISOString().split('T')[0] === ds && s.startTime === startTime)) }));

  const inputSt = { fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box', border: `1.5px solid ${token.borderStrong}`, borderRadius: 7, padding: '8px 10px', color: token.textPrimary, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' };

  const available = flat.filter(s => !s.isBooked);
  const booked = flat.filter(s => s.isBooked);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── Editor ── */}
      {isEditing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Date Range */}
          <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${token.borderDash}`, borderRadius: 12, padding: '14px 16px' }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={11} color={token.cyan} style={{ flexShrink: 0 }} />Section 1 — Date Range
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div><Lbl>From</Lbl><input type="date" value={dateFrom} min={tomorrow()} onChange={e => { setDateFrom(e.target.value); setErr(''); }} style={inputSt} /></div>
              <div><Lbl>To</Lbl><input type="date" value={dateTo} min={dateFrom || tomorrow()} onChange={e => { setDateTo(e.target.value); setErr(''); }} style={inputSt} /></div>
            </div>
            <button type="button" onClick={() => setWeekdaysOnly(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: 34, height: 18, borderRadius: 100, background: weekdaysOnly ? token.cyan : 'rgba(0,0,0,0.3)', border: `1.5px solid ${weekdaysOnly ? token.cyan : token.borderStrong}`, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2, left: weekdaysOnly ? 16 : 2, width: 10, height: 10, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
              </div>
              <span style={{ fontFamily: F, fontSize: 12, color: token.textSecondary, fontWeight: 600 }}>Weekdays only (Mon–Fri)</span>
            </button>
            {dateFrom && dateTo && (
              <div style={{ marginTop: 10, padding: '7px 11px', borderRadius: 7, background: 'rgba(0,152,204,0.08)', border: `1px solid rgba(0,152,204,0.2)`, fontFamily: F, fontSize: 11.5, color: token.cyan, fontWeight: 600 }}>
                📅 {totalDays} day{totalDays !== 1 ? 's' : ''} selected{weekdaysOnly ? ' (weekdays only)' : ' (incl. weekends)'}
              </div>
            )}
          </div>

          {/* Time Blocks */}
          <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${token.borderDash}`, borderRadius: 12, padding: '14px 16px' }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={11} color={token.cyan} style={{ flexShrink: 0 }} />Section 2 — Time Blocks
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
              <div style={{ flex: 1, minWidth: 100 }}><Lbl>Start</Lbl><input type="time" value={blockStart} onChange={e => setBlockStart(e.target.value)} style={inputSt} /></div>
              <div style={{ flex: 1, minWidth: 100 }}><Lbl>End</Lbl><input type="time" value={blockEnd} onChange={e => setBlockEnd(e.target.value)} style={inputSt} /></div>
              {blockStart && blockEnd && slotCount(blockStart, blockEnd) > 0 && (
                <div style={{ padding: '7px 10px', borderRadius: 7, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700, alignSelf: 'flex-end', flexShrink: 0 }}>
                  {slotCount(blockStart, blockEnd)} slots
                </div>
              )}
              <button type="button" onClick={addBlock} style={{ padding: '8px 14px', background: token.cyan, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-end', flexShrink: 0 }}>
                <Plus size={13} />Add Block
              </button>
            </div>
            {timeBlocks.length > 0
              ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {timeBlocks.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: 'rgba(0,152,204,0.08)', border: `1px solid rgba(0,152,204,0.2)` }}>
                    <Clock size={13} color={token.cyan} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textPrimary, flex: 1 }}>{b.start} — {b.end}</span>
                    <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 8px', borderRadius: 20 }}>
                      {slotCount(b.start, b.end)} × 30 min/day
                    </span>
                    <button type="button" onClick={() => setTimeBlocks(p => p.filter((_, j) => j !== i))} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', color: token.red, borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              : <div style={{ textAlign: 'center', padding: 14, background: 'rgba(0,0,0,0.1)', border: `1px dashed rgba(0,152,204,0.14)`, borderRadius: 8 }}>
                <p style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, margin: 0 }}>Add blocks above — e.g. 9:00–12:00, 15:00–18:00</p>
              </div>
            }
          </div>

          {/* Generate */}
          {timeBlocks.length > 0 && dateFrom && dateTo && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,152,204,0.06)', border: `1px solid rgba(0,152,204,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.textPrimary, margin: '0 0 2px' }}>⚡ {totalSlotsPreview} slots will be generated</p>
                <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: 0 }}>{totalDays} days × {timeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day · Duplicates skipped</p>
              </div>
              <button type="button" onClick={generate} style={{ padding: '10px 20px', background: token.cyan, color: '#fff', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                <CheckCircle size={14} />Generate
              </button>
            </div>
          )}
          {err && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)', borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: token.red }}>
              <AlertCircle size={13} style={{ flexShrink: 0 }} />{err}
            </div>
          )}
        </div>
      )}

      {/* ── Slots Grid Display ── */}
      {flat.length === 0
        ? <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${token.borderStrong}`, borderRadius: 10 }}>
          <Calendar size={22} color={token.textMuted} style={{ margin: '0 auto 7px', display: 'block' }} />
          <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: 0 }}>No sessions scheduled yet.</p>
        </div>
        : <div>
          {/* Summary row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: F, fontSize: 11, color: token.cyan, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
              <CheckCircle size={11} />{flat.length} total
            </span>
            <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700 }}>● {available.length} available</span>
            {booked.length > 0 && <span style={{ fontFamily: F, fontSize: 11, color: token.amber, fontWeight: 700 }}>● {booked.length} booked</span>}
          </div>

          {/* 5-per-row slot grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {flat.map(slot => {
              const d = new Date(slot.ds + 'T00:00:00');
              const key = `${slot.ds}_${slot.startTime}`;
              return (
                <div key={key} style={{ position: 'relative', padding: '10px 8px', borderRadius: 10, textAlign: 'center', background: slot.isBooked ? 'rgba(232,160,32,0.1)' : 'rgba(0,152,204,0.07)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.3)' : 'rgba(0,152,204,0.2)'}`, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  {/* Day label */}
                  <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px' }}>
                    {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                  </span>
                  {/* Date number */}
                  <div style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: token.textPrimary, lineHeight: 1 }}>
                    {d.getDate()}
                  </div>
                  {/* Month */}
                  <span style={{ fontFamily: F, fontSize: 9, color: token.textMuted }}>
                    {d.toLocaleDateString('en-IN', { month: 'short' })} {d.getFullYear().toString().slice(2)}
                  </span>
                  {/* Time */}
                  <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: slot.isBooked ? token.amber : token.textSecondary, background: slot.isBooked ? 'rgba(232,160,32,0.12)' : 'rgba(0,0,0,0.2)', border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.25)' : 'rgba(0,152,204,0.15)'}`, borderRadius: 6, padding: '3px 6px', width: '100%', boxSizing: 'border-box' }}>
                    {slot.startTime}
                  </div>
                  {/* Status dot */}
                  {slot.isBooked
                    ? <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: token.amber }}>Booked</span>
                    : <span style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: token.green }}>Free</span>
                  }
                  {/* Remove button in edit mode */}
                  {isEditing && !slot.isBooked && (
                    <button onClick={() => remove(slot.ds, slot.startTime)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(224,80,80,0.15)', border: '1px solid rgba(224,80,80,0.3)', color: token.red, borderRadius: 4, width: 16, height: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      <X size={9} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, icon: Icon, onEdit, isSaving, children, emptyState }) => (
  <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderBottom: `1px solid ${token.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        {Icon && <IconBox icon={Icon} />}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: token.textPrimary, margin: 0 }}>{title}</h2>
          {subtitle && <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: '2px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
      </div>
      <button onClick={onEdit} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: token.textSecondary, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', opacity: isSaving ? .5 : 1, fontFamily: F, whiteSpace: 'nowrap' }}>
        {isSaving ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Edit size={13} />}
        {isSaving ? 'Saving…' : 'Edit'}
      </button>
    </div>
    <div style={{ padding: '18px 22px' }}>
      {children || (emptyState && (
        <div style={{ textAlign: 'center', padding: '28px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>{emptyState.message}</p>
          <button onClick={onEdit} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>{emptyState.cta}</button>
        </div>
      ))}
    </div>
  </div>
);

// ─── Pending Card ─────────────────────────────────────────────────────────────
const PendingCard = ({ mentorData, onEdit }) => {
  const pending = [
    !mentorData.profilePhoto && 'Profile Photo', !mentorData.location && 'Location',
    !mentorData.phone && 'Phone number', !mentorData.linkedinUrl && 'LinkedIn URL',
    !mentorData.whyMentor && 'Bio / About', !mentorData.currentSkills && 'Specialisations',
    !mentorData.guidanceAreas?.length && 'Areas of Guidance', !mentorData.hourlyRate && 'Hourly rate',
    !mentorData.yearsOfExperience && 'Years of experience', !mentorData.highestDegree && 'Education',
    !mentorData.mentorshipFormat && 'Mentorship Format', !mentorData.languages?.length && 'Languages',
  ].filter(Boolean);
  if (!pending.length) return null;
  return (
    <div style={{ background: token.card, borderRadius: 16, border: '1px solid rgba(232,160,32,0.22)', overflow: 'hidden' }}>
      <div style={{ background: 'rgba(232,160,32,0.12)', padding: '14px 20px', borderBottom: '1px solid rgba(232,160,32,0.18)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertTriangle size={15} color={token.amber} />
        <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: 0, flex: 1 }}>Pending Details</h3>
        <span style={{ background: token.amber, color: '#fff', fontFamily: F, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>{pending.length}</span>
      </div>
      <div style={{ padding: '12px 20px' }}>
        <p style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, margin: '0 0 10px' }}>Complete these to improve visibility.</p>
        {pending.map((item, i) => (
          <button key={i} onClick={onEdit} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < pending.length - 1 ? `1px solid ${token.border}` : 'none' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: token.amber, flexShrink: 0 }} />
            <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, flex: 1, textAlign: 'left' }}>{item}</span>
            <ChevronRight size={13} color={token.textMuted} />
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────
const EditModal = ({ isOpen, onClose, section, formData, setFormData, onSave, isSaving, userId }) => {
  const [cur, setCur] = useState(section);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({ skill: '', lang: '', guid: '', cert: '', accomp: '' });
  const wasOpen = useRef(false);

  useEffect(() => { if (isOpen && !wasOpen.current) { setCur(section); setErrors({}); } wasOpen.current = isOpen; }, [isOpen]); // eslint-disable-line

  if (!isOpen) return null;

  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));
  const setInp = (k, v) => setInputs(p => ({ ...p, [k]: v }));

  const addCSV = (field, key) => { const v = inputs[key].trim(); if (!v) return; const arr = splitCSV(formData[field]); if (!arr.includes(v)) set(field, joinCSV([...arr, v])); setInp(key, ''); };
  const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter(s => s !== val)));
  const addArr = (field, key) => { const v = inputs[key].trim(); if (!v) return; const arr = Array.isArray(formData[field]) ? formData[field] : []; if (!arr.includes(v)) set(field, [...arr, v]); setInp(key, ''); };
  const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

  const validate = () => {
    const e = {};
    if (cur === 'overview') { if (!formData.fullName?.trim()) e.fullName = 'Required.'; if (!formData.currentRole?.trim()) e.role = 'Required.'; }
    if (cur === 'experience') { if (!formData.yearsOfExperience) e.yoe = 'Required.'; if (!formData.hourlyRate) e.rate = 'Required.'; }
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSave = async (close) => { if (!validate()) return; await onSave(close); };
  const handleNext = async () => { if (!validate()) return; const idx = NAV_ORDER.indexOf(cur); if (idx < NAV_ORDER.length - 1) { setCur(NAV_ORDER[idx + 1]); setErrors({}); } await onSave(false); };

  const skills = splitCSV(formData.currentSkills);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const guids = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
  const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
  const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
  const isLast = cur === NAV_ORDER[NAV_ORDER.length - 1];

  const nav = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'engagement', label: 'Engagement', icon: MessageCircle },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  const tabs = {
    overview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Basic Information</h3>
        <div style={{ maxWidth: 300 }}>
          <PhotoUpload currentUrl={formData.profilePhoto || ''} onUpload={url => set('profilePhoto', url)} userId={userId} />
        </div>        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          <div><Lbl required>Full Name</Lbl><Field value={formData.fullName || ''} onChange={e => { set('fullName', e.target.value); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })); }} placeholder="Your full name" error={errors.fullName} /><FieldErr msg={errors.fullName} /></div>
          <div><Lbl required>Professional Title</Lbl><Field value={formData.currentRole || ''} onChange={e => { set('currentRole', e.target.value); if (errors.role) setErrors(p => ({ ...p, role: '' })); }} placeholder="e.g. Senior Engineer" error={errors.role} /><FieldErr msg={errors.role} /></div>
          <div><Lbl>Location</Lbl><Field value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" /></div>
          <div><Lbl>Phone</Lbl><Field value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 1234567890" /></div>
          <div><Lbl>LinkedIn</Lbl><Field value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
          <div><Lbl>Mentoring Style</Lbl><Field value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative, Goal-oriented" /></div>
        </div>
        <div><Lbl>Bio / About</Lbl><Field value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey…" multiline /></div>
        <div>
          <Lbl>Specialisations / Domains</Lbl>
          <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing</p>
          <TagRow placeholder="Add a specialisation…" value={inputs.skill} onChange={v => setInp('skill', v)} onAdd={() => addCSV('currentSkills', 'skill')} />
          {skills.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV('currentSkills', s)} />)}</div>}
        </div>
      </div>
    ),
    experience: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Professional Background</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          <div><Lbl>Organisation</Lbl><Field value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Google" /></div>
          <div><Lbl>Position</Lbl><Field value={formData.currentPosition || ''} onChange={e => set('currentPosition', e.target.value)} placeholder="e.g. Principal Engineer" /></div>
          <div><Lbl required>Years of Experience</Lbl><Field type="number" value={formData.yearsOfExperience || ''} onChange={e => { set('yearsOfExperience', e.target.value); if (errors.yoe) setErrors(p => ({ ...p, yoe: '' })); }} placeholder="e.g. 8" error={errors.yoe} /><FieldErr msg={errors.yoe} /></div>
          <div><Lbl required>Hourly Rate (₹)</Lbl><Field type="number" value={formData.hourlyRate || ''} onChange={e => { set('hourlyRate', e.target.value); if (errors.rate) setErrors(p => ({ ...p, rate: '' })); }} placeholder="e.g. 1500" error={errors.rate} /><FieldErr msg={errors.rate} /></div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.15)', border: `1px solid ${token.border}`, borderRadius: 10, padding: '14px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>Educational Background</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
            <div><Lbl>Highest Degree</Lbl><Select value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)}><option value="">Select degree</option>{["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map(o => <option key={o} value={o}>{o}</option>)}</Select></div>
            <div><Lbl>Field of Study</Lbl><Field value={formData.fieldOfStudy || ''} onChange={e => set('fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" /></div>
            <div><Lbl>Institution</Lbl><Field value={formData.schoolName || ''} onChange={e => set('schoolName', e.target.value)} placeholder="e.g. IIT Bombay" /></div>
          </div>
        </div>
      </div>
    ),
    engagement: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Engagement</h3>
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={12} />Availability</p>
          <AvailPanel availability={formData.availability} isEditing setFormData={setFormData} />
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />Languages</p>
          <TagRow placeholder="e.g. English, Hindi" value={inputs.lang} onChange={v => setInp('lang', v)} onAdd={() => addArr('languages', 'lang')} />
          {langs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr('languages', l)} />)}</div>}
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Video size={12} />Mentorship Format</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Online', 'Group Sessions', 'One-on-One'].map(fmt => {
              const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
              return (
                <button key={fmt} type="button" onClick={() => { const c = splitCSV(formData.mentorshipFormat); set('mentorshipFormat', joinCSV(sel ? c.filter(s => s !== fmt) : [...c, fmt])); }}
                  style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 14px', borderRadius: 8, border: `1.5px solid ${sel ? token.cyan : token.borderStrong}`, background: sel ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.15)', color: sel ? token.cyan : token.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? token.cyan : token.borderStrong }} />{fmt}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={12} />Contact / Booking</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div><Lbl>Platform Messaging</Lbl><Field value={formData.platformMessaging || ''} onChange={e => set('platformMessaging', e.target.value)} placeholder="@username" /></div>
            <div><Lbl>Calendar / Booking Link</Lbl><Field value={formData.calendarLink || ''} onChange={e => set('calendarLink', e.target.value)} placeholder="https://calendly.com/…" /></div>
          </div>
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><Target size={12} />Areas of Guidance</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {['Career Prep', 'Interview Coaching', 'Technical Skills', 'Soft Skills', 'Leadership', 'Resume Review', 'Startup Guidance'].map(g => {
              const sel = guids.includes(g);
              return (
                <button key={g} type="button" onClick={() => set('guidanceAreas', sel ? guids.filter(x => x !== g) : [...guids, g])}
                  style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${sel ? token.green : token.borderStrong}`, background: sel ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0.15)', color: sel ? token.green : token.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: sel ? token.green : token.borderStrong }} />{g}
                </button>
              );
            })}
          </div>
          <TagRow placeholder="Custom guidance area…" value={inputs.guid} onChange={v => setInp('guid', v)} onAdd={() => addArr('guidanceAreas', 'guid')} />
          {guids.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{guids.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas', g)} />)}</div>}
        </div>
      </div>
    ),
    achievements: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: token.textPrimary, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${token.border}` }}>Achievements & Credentials</h3>
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={12} />Key Accomplishments</p>
          <p style={{ fontFamily: F, fontSize: 11, color: token.textMuted, margin: '0 0 4px' }}>Notable projects, awards, publications…</p>
          <TagRow placeholder="e.g. Led team that scaled to 1M users" value={inputs.accomp} onChange={v => setInp('accomp', v)} onAdd={() => addArr('accomplishments', 'accomp')} />
          {accomps.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
              {accomps.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${token.border}`, borderRadius: 9 }}>
                  <Trophy size={13} color={token.amber} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, flex: 1, wordBreak: 'break-word' }}>{a}</span>
                  <button onClick={() => rmArr('accomplishments', a)} style={{ background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.2)', color: token.red, borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={11} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><BadgeCheck size={12} />Certifications</p>
          <TagRow placeholder="e.g. AWS Certified Solutions Architect" value={inputs.cert} onChange={v => setInp('cert', v)} onAdd={() => addArr('certifications', 'cert')} />
          {certs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr('certifications', c)} />)}</div>}
        </div>
        <div style={{ height: 1, background: token.border }} />
        <div>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={12} />Portfolio / Media Links</p>
          <div style={{ background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.22)', borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: token.textSecondary, marginBottom: 14, lineHeight: 1.7 }}>
            Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
          </div>
          {[{ label: 'Portfolio', field: 'portfolioLink', placeholder: 'https://drive.google.com/…' }, { label: 'Intro Video', field: 'videoLink', placeholder: 'https://youtube.com/…' }].map(({ label, field, placeholder }) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <Lbl>{label}</Lbl>
              <Field value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
              {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: token.cyan, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}><Eye size={12} />Preview →</a>}
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 20 }}>
      <div style={{ background: token.card, width: '100%', maxWidth: 760, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: `1px solid ${token.borderStrong}`, borderRadius: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${token.border}`, flexShrink: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: token.textPrimary, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Pencil size={16} color={token.cyan} />Edit Profile</h2>
          <button onClick={onClose} disabled={isSaving} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${token.border}`, color: token.textSecondary, borderRadius: 7, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Sidebar nav */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRight: `1px solid ${token.border}`, width: 176, flexShrink: 0, overflow: 'auto' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 12 }}>
              {nav.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => { setCur(id); setErrors({}); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', background: cur === id ? token.cyan : 'transparent', color: cur === id ? '#fff' : token.textMuted, border: `1px solid ${cur === id ? token.cyan : token.border}` }}>
                  <Icon size={13} />{label}
                </button>
              ))}
            </nav>
          </div>
          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>{tabs[cur]}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: `1px solid ${token.border}`, background: 'rgba(0,0,0,0.2)', flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={onClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${token.borderStrong}`, borderRadius: 8, color: token.textSecondary, background: 'transparent', cursor: 'pointer' }}>Cancel</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => handleSave(true)} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${token.borderStrong}`, borderRadius: 8, color: token.textSecondary, background: 'transparent', cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
              {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
            </button>
            {!isLast && (
              <button type="button" onClick={handleNext} disabled={isSaving} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: token.cyan, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
                {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── AvailView (read-only: date cards → click → slots) ───────────────────────
const AvailView = ({ availability }) => {
  const [selectedDs, setSelectedDs] = useState(null);

  const flat = (availability || [])
    .filter(s => s.date)
    .map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }))
    .sort((a, b) => new Date(a.ds) - new Date(b.ds));

  // Unique dates, preserving order
  const uniqueDates = [...new Map(flat.map(s => [s.ds, s])).values()];

  const slotsForDate = selectedDs ? flat.filter(s => s.ds === selectedDs) : [];
  const dateObj = selectedDs ? new Date(selectedDs + 'T00:00:00') : null;

  if (flat.length === 0) return (
    <div style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${token.borderStrong}`, borderRadius: 10 }}>
      <Calendar size={22} color={token.textMuted} style={{ margin: '0 auto 7px', display: 'block' }} />
      <p style={{ fontFamily: F, fontSize: 12, color: token.textMuted, margin: 0 }}>No sessions scheduled yet.</p>
    </div>
  );

  const totalAvail = flat.filter(s => !s.isBooked).length;
  const totalBooked = flat.filter(s => s.isBooked).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Summary strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: F, fontSize: 11, color: token.cyan, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Calendar size={11} />{uniqueDates.length} date{uniqueDates.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontFamily: F, fontSize: 11, color: token.green, fontWeight: 700 }}>● {totalAvail} available</span>
        {totalBooked > 0 && <span style={{ fontFamily: F, fontSize: 11, color: token.amber, fontWeight: 700 }}>● {totalBooked} booked</span>}
        {selectedDs && (
          <button onClick={() => setSelectedDs(null)} style={{ marginLeft: 'auto', fontFamily: F, fontSize: 11, color: token.textMuted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <X size={11} />Clear
          </button>
        )}
      </div>

      {/* Date cards — 5 per row */}
      <div className="mp-avail-grid">
        {uniqueDates.map(({ ds }) => {
          const d = new Date(ds + 'T00:00:00');
          const slots = flat.filter(s => s.ds === ds);
          const avail = slots.filter(s => !s.isBooked).length;
          const booked = slots.filter(s => s.isBooked).length;
          const isSelected = selectedDs === ds;
          const allBooked = avail === 0;

          return (
            <button
              key={ds}
              type="button"
              onClick={() => setSelectedDs(isSelected ? null : ds)}
              style={{
                padding: '10px 8px', borderRadius: 10, textAlign: 'center', cursor: 'pointer',
                background: isSelected ? token.cyan : allBooked ? 'rgba(232,160,32,0.08)' : 'rgba(0,152,204,0.07)',
                border: `1.5px solid ${isSelected ? token.cyan : allBooked ? 'rgba(232,160,32,0.3)' : 'rgba(0,152,204,0.2)'}`,
                display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center',
                transition: 'all .15s', fontFamily: F,
                boxShadow: isSelected ? `0 4px 16px rgba(0,152,204,0.3)` : 'none',
              }}
            >
              {/* Weekday */}
              <span style={{ fontSize: 9, fontWeight: 700, color: isSelected ? 'rgba(255,255,255,0.75)' : token.cyan, textTransform: 'uppercase', letterSpacing: '.5px' }}>
                {d.toLocaleDateString('en-IN', { weekday: 'short' })}
              </span>
              {/* Day number */}
              <div style={{ fontSize: 20, fontWeight: 800, color: isSelected ? '#fff' : token.textPrimary, lineHeight: 1 }}>
                {d.getDate()}
              </div>
              {/* Month year */}
              <span style={{ fontSize: 9, color: isSelected ? 'rgba(255,255,255,0.6)' : token.textMuted }}>
                {d.toLocaleDateString('en-IN', { month: 'short' })} '{d.getFullYear().toString().slice(2)}
              </span>
              {booked > 0 && (
                <span style={{ fontSize: 8.5, fontWeight: 700, color: isSelected ? '#fff' : token.amber, background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(232,160,32,0.12)', border: `1px solid ${isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(232,160,32,0.25)'}`, borderRadius: 20, padding: '1px 6px', marginTop: 2 }}>
                  {booked} booked
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Slot panel — expands below when a date is selected */}
      {selectedDs && (
        <div style={{
          background: 'rgba(0,0,0,0.2)', border: `1px solid ${token.borderStrong}`,
          borderRadius: 12, padding: '14px 16px', animation: 'fadeUp .2s ease both',
        }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={11} />
            {dateObj?.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            <span style={{ color: token.textMuted, fontWeight: 500, textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>· {slotsForDate.length} slot{slotsForDate.length !== 1 ? 's' : ''}</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {slotsForDate.map(slot => (
              <div key={`${slot.ds}_${slot.startTime}`} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                borderRadius: 9,
                border: `1px solid ${slot.isBooked ? 'rgba(255,255,255,0.06)' : 'rgba(0,152,204,0.2)'}`,
                background: slot.isBooked ? 'rgba(0,0,0,0.18)' : 'rgba(0,152,204,0.07)',
                opacity: slot.isBooked ? 0.45 : 1,
                cursor: slot.isBooked ? 'not-allowed' : 'default',
                position: 'relative', overflow: 'hidden',
              }}>
                <Clock size={12} color={slot.isBooked ? token.textMuted : token.cyan} style={{ flexShrink: 0 }} />
                <span style={{
                  fontFamily: F, fontSize: 12.5, fontWeight: 700,
                  color: slot.isBooked ? token.textMuted : token.textPrimary,
                  textDecoration: slot.isBooked ? 'line-through' : 'none',
                }}>
                  {slot.startTime} — {slot.endTime}
                </span>
                {slot.isBooked && (
                  <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.textMuted, letterSpacing: '.3px' }}>
                    Booked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState('overview');
  const [formData, setFormData] = useState({ availability: [] });
  const [email, setEmail] = useState('');
  const serverRef = useRef(null);

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

  useEffect(() => { const ud = localStorage.getItem('userData'); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
  useEffect(() => { if (email) getMentorDetails(email); }, [email]);
  useEffect(() => { if (data?.data) { serverRef.current = data.data; if (!isEditing) setFormData({ ...data.data }); } }, [data, isEditing]);

  const handleEdit = (sec = 'overview') => { setEditSection(sec); setIsEditing(true); };
  const handleClose = () => { setIsEditing(false); if (serverRef.current) setFormData({ ...serverRef.current }); };

  const handleSave = async (shouldClose = true) => {
    try {
      const enriched = { ...formData, availability: (formData.availability || []).map(slot => { if (slot.day) return slot; const ds = new Date(slot.date).toISOString().split('T')[0]; return { ...slot, day: new Date(ds + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }) }; }) };
      await updateMentorDetails({ email, ...enriched }).unwrap();
      try { showToast('Profile updated!', 'success'); } catch { }
      if (shouldClose) { handleClose(); getMentorDetails(email); }
    } catch { try { showToast('Failed to update.', 'error'); } catch { } }
  };

  if (isLoading || error || Object.keys(formData).length < 2) return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: token.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>
  );

  const skills = splitCSV(formData.currentSkills);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
  const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
  const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
  const fmts = splitCSV(formData.mentorshipFormat);
  const bio = formData.whyMentor || '';
  const initials = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
  const allFlat = (formData.availability || []).filter(s => s.date).map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }));

  const cFields = [formData.fullName, formData.profilePhoto, formData.currentRole, formData.location, formData.companyName, formData.yearsOfExperience, formData.highestDegree, formData.currentSkills, formData.guidanceAreas?.length, formData.mentorshipFormat, formData.languages?.length, formData.hourlyRate];
  const completionPct = Math.round(cFields.filter(Boolean).length / cFields.length * 100);

  const completionSteps = [
    { label: 'Full Name, Photo & Title', done: !!(formData.fullName && formData.currentRole) },
    { label: 'Location & Contact', done: !!(formData.location && formData.phone) },
    { label: 'Organisation & Experience', done: !!(formData.companyName && formData.yearsOfExperience) },
    { label: 'Educational Background', done: !!(formData.highestDegree) },
    { label: 'Specialisations & Domains', done: !!(formData.currentSkills) },
    { label: 'Engagement & Availability', done: !!(formData.mentorshipFormat && formData.languages?.length) },
  ];

  const detailItems = [
    formData.location && { label: 'Location', value: formData.location, icon: MapPin },
    formData.yearsOfExperience && { label: 'Experience', value: `${formData.yearsOfExperience} yr`, icon: Briefcase },
    formData.companyName && { label: 'Organisation', value: formData.companyName, icon: Briefcase },
    formData.currentPosition && { label: 'Position', value: formData.currentPosition, icon: Briefcase },
    formData.highestDegree && { label: 'Degree', value: formData.highestDegree, icon: Award },
    formData.fieldOfStudy && { label: 'Field of Study', value: formData.fieldOfStudy, icon: BookOpen },
    formData.schoolName && { label: 'Institution', value: formData.schoolName, icon: Award },
    formData.mentoringStyle && { label: 'Mentoring Style', value: formData.mentoringStyle, icon: Star },
  ].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        html,body{font-family:${F};-webkit-font-smoothing:antialiased}
        input:focus,textarea:focus,select:focus{border-color:${token.cyan}!important;outline:none}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(0,152,204,0.26);border-radius:4px}
        ::placeholder{color:${token.textMuted}!important}
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:.4;cursor:pointer;filter:invert(1)}

        .mp-wrap{max-width:1300px;margin:0 auto;padding:24px 20px 60px}
        .mp-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;align-items:start;animation:fadeUp .4s ease .08s both}
        .mp-left{display:flex;flex-direction:column;gap:16px;min-width:0}
        .mp-sidebar{display:flex;flex-direction:column;gap:16px;min-width:0}
        .mp-hero{background:linear-gradient(135deg,#071e12 0%,#0a2a18 50%,#062117 100%);border:1px solid ${token.border};border-radius:16px;padding:28px 28px 24px;margin-bottom:20px;animation:fadeUp .3s ease both}
        .mp-avail-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}

        @media(max-width:1024px){.mp-grid{grid-template-columns:1fr 280px;gap:16px}}
        @media(max-width:900px){.mp-grid{grid-template-columns:1fr}.mp-sidebar{display:grid;grid-template-columns:1fr 1fr;gap:14px}.mp-avail-grid{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:768px){
          .mp-sidebar{grid-template-columns:1fr}
          .mp-avail-grid{grid-template-columns:repeat(3,1fr)}
          .mp-hero{padding:18px 16px 16px}
        }
        @media(max-width:600px){
          .mp-wrap{padding:12px 12px 40px}
          .mp-hero{padding:16px 14px 14px;border-radius:12px;margin-bottom:12px}
          .mp-avail-grid{grid-template-columns:repeat(3,1fr)}
        }
        @media(max-width:480px){
          .mp-wrap{padding:10px 10px 36px}
          .mp-avail-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:360px){
          .mp-avail-grid{grid-template-columns:repeat(2,1fr)}
        }

        /* Modal responsive */
        @media(max-width:768px){
          .mp-modal{border-radius:16px 16px 0 0;max-height:95vh}
          .mp-modal-overlay{align-items:flex-end;padding:0}
          .mp-modal-body{flex-direction:column!important}
          .mp-modal-nav{border-right:none!important;border-bottom:1px solid ${token.border};width:100%!important;flex-shrink:0}
          .mp-modal-nav nav{flex-direction:row!important;padding:10px 14px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
        }
        @media(max-width:480px){
          .mp-modal-footer{flex-direction:column;align-items:stretch}
          .mp-modal-footer button{width:100%;justify-content:center}
        }
      `}</style>

      <div style={{ fontFamily: F, minHeight: '100vh', background: token.bg, color: token.textPrimary }}>
        <div className="mp-wrap">

          {/* ── Hero ── */}
          <div className="mp-hero">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0, flex: 1 }}>
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {formData.profilePhoto
                    ? <img src={formData.profilePhoto} alt={formData.fullName} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', border: `2px solid ${token.borderStrong}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
                    : <div style={{ width: 72, height: 72, borderRadius: 14, background: 'rgba(0,152,204,0.12)', border: `2px solid ${token.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: token.cyan, fontFamily: F }}>{initials}</div>
                  }
                  {formData.status === 'approved' && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: token.green, border: '2px solid #062117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
                </div>
                {/* Info */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6, alignItems: 'center' }}>
                    {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.cyan, textTransform: 'uppercase', letterSpacing: '.5px', background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
                    <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.amber, background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)', padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating || '5.0'}</span>
                    {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.green, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
                  </div>
                  <h1 style={{ fontFamily: F, fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 800, color: token.textPrimary, margin: '0 0 3px', lineHeight: 1.2, wordBreak: 'break-word' }}>
                    {formData.fullName || <span style={{ color: token.textMuted, fontStyle: 'italic', fontWeight: 500 }}>No name added</span>}
                  </h1>
                  <p style={{ fontFamily: F, fontSize: 13, color: token.textSecondary, margin: '0 0 8px', fontWeight: 500 }}>
                    {formData.currentRole || 'Mentor'}{formData.companyName && <span style={{ color: token.textMuted }}> · {formData.companyName}</span>}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {formData.location && <span style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{formData.location}</span>}
                    {formData.email && <span style={{ fontFamily: F, fontSize: 11.5, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{formData.email}</span>}
                    {formData.createdAt && <span style={{ fontFamily: F, fontSize: 11, color: token.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, borderRadius: 10, padding: '10px 14px', textAlign: 'center', minWidth: 66 }}>
                  <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: token.textPrimary, lineHeight: 1 }}>{formData.yearsOfExperience || 0}yr</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: token.textMuted, marginTop: 3, fontWeight: 600 }}>Exp.</div>
                </div>
                <div style={{ background: 'rgba(0,152,204,0.12)', border: `1px solid ${token.borderStrong}`, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: token.cyan }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
                  <span style={{ fontFamily: F, fontSize: 11, color: token.textMuted }}>/hr</span>
                </div>
                <button onClick={() => handleEdit('overview')} style={{ background: token.cyan, border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: F }}>
                  <Edit size={13} />Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="mp-grid">
            {/* LEFT */}
            <div className="mp-left">

              {/* Profile Overview */}
              <SectionCard title="Profile Overview" subtitle="Visible to potential mentees." icon={Award} onEdit={() => handleEdit('overview')} isSaving={isSaving}>
                {bio && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>About</p>
                    <p style={{ fontFamily: F, fontSize: 13, color: token.textSecondary, lineHeight: 1.8, margin: 0, wordBreak: 'break-word' }}>{bio}</p>
                  </div>
                )}
                {(formData.email || formData.phone || formData.location || formData.linkedinUrl) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: skills.length ? 18 : 0 }}>
                    {formData.email && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
                    {formData.phone && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
                    {formData.location && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
                    {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
                  </div>
                )}
                {skills.length > 0 && (
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Specialisations & Domains</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <Pill key={i} label={s} />)}</div>
                  </div>
                )}
                {!bio && !skills.length && !formData.email && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No profile info added yet.</p>
                    <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
                  </div>
                )}
              </SectionCard>

              {/* Professional Background */}
              <SectionCard title="Professional Background" icon={Briefcase} onEdit={() => handleEdit('experience')} isSaving={isSaving}
                emptyState={detailItems.length === 0 ? { message: 'No professional background added.', cta: 'Add Details →' } : null}>
                {detailItems.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                    {detailItems.map((item, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 4px' }}>{item.label}</p>
                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: token.textPrimary, margin: 0, wordBreak: 'break-word' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Engagement */}
              <SectionCard title="Engagement Information" icon={MessageCircle} onEdit={() => handleEdit('engagement')} isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {fmts.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Mentorship Format</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{fmts.map((f, i) => <Pill key={i} label={f} />)}</div></div>}
                  {langs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Languages</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" />)}</div></div>}
                  {guidAreas.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Areas of Guidance</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" />)}</div></div>}
                  {(formData.calendarLink || formData.platformMessaging) && (
                    <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Booking</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {formData.calendarLink && <InfoRow icon={Calendar} href={formData.calendarLink}>Book a Session</InfoRow>}
                        {formData.platformMessaging && <InfoRow icon={MessageCircle}>{formData.platformMessaging}</InfoRow>}
                      </div>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Availability</p>
                    <AvailView availability={formData.availability} />
                  </div>
                  {!fmts.length && !langs.length && !guidAreas.length && !formData.calendarLink && allFlat.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No engagement details added.</p>
                      <button onClick={() => handleEdit('engagement')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Add Engagement Info →</button>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Achievements */}
              <SectionCard title="Achievements & Credentials" icon={Trophy} onEdit={() => handleEdit('achievements')} isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {accomps.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Key Accomplishments</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {accomps.map((a, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.18)', borderRadius: 9 }}>
                            <Trophy size={13} color={token.amber} style={{ flexShrink: 0, marginTop: 1 }} />
                            <span style={{ fontFamily: F, fontSize: 12.5, color: token.textSecondary, wordBreak: 'break-word' }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {certs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Certifications</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" />)}</div></div>}
                  {(formData.portfolioLink || formData.videoLink) && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Documents & Media</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
                        {[{ label: 'Portfolio', field: 'portfolioLink', icon: BookOpen }, { label: 'Intro Video', field: 'videoLink', icon: Eye }].filter(d => formData[d.field]).map(({ label, field, icon: Icon }) => (
                          <a key={field} href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(0,0,0,0.15)', border: `1px solid ${token.border}`, borderRadius: 9, textDecoration: 'none', minWidth: 0 }}>
                            <IconBox icon={Icon} size={12} boxSize={24} radius={6} />
                            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: token.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
                            <ExternalLink size={10} color={token.textMuted} style={{ marginLeft: 'auto', flexShrink: 0 }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {!accomps.length && !certs.length && !formData.portfolioLink && !formData.videoLink && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: token.textMuted, margin: '0 0 10px' }}>No achievements added yet.</p>
                      <button onClick={() => handleEdit('achievements')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: token.cyan, background: 'none', border: 'none', cursor: 'pointer' }}>Add Achievements →</button>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* SIDEBAR */}
            <div className="mp-sidebar">
              {/* Completion */}
              <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: 0 }}>Profile Completion</h3>
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: completionPct === 100 ? token.green : token.cyan }}>{completionPct}%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
                  <div style={{ height: 6, borderRadius: 100, width: `${completionPct}%`, background: completionPct === 100 ? token.green : `linear-gradient(90deg,${token.cyan},#22d3ee)`, transition: 'width .7s ease' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {completionSteps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {step.done ? <CheckCircle size={16} color={token.green} style={{ flexShrink: 0 }} /> : <Circle size={16} color={token.borderStrong} style={{ flexShrink: 0 }} />}
                      <span style={{ fontFamily: F, fontSize: 12.5, color: step.done ? token.textSecondary : token.textMuted, fontWeight: step.done ? 600 : 500 }}>{step.label}</span>
                    </div>
                  ))}
                </div>
                {completionPct < 100
                  ? <button onClick={() => handleEdit('overview')} style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: token.cyan, border: 'none', borderRadius: 9, padding: 10, cursor: 'pointer' }}>Complete Your Profile</button>
                  : <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CheckCircle size={16} color={token.green} /><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: token.green }}>Profile Complete!</span></div>
                }
              </div>

              {completionPct < 100 && <PendingCard mentorData={formData} onEdit={() => handleEdit('overview')} />}

              {/* Quick Stats */}
              <div style={{ background: token.card, borderRadius: 16, border: `1px solid ${token.border}`, padding: 20 }}>
                <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: token.textPrimary, margin: '0 0 14px' }}>Quick Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Completed Sessions', value: formData.completedBookings || 0, icon: TrendingUp, col: token.cyan },
                    { label: 'Total Mentees', value: formData.totalMentees || 0, icon: Users, col: token.green },
                    { label: 'Rating', value: `${formData.rating || '5.0'} ★`, icon: Star, col: token.amber },
                    { label: 'Available Slots', value: allFlat.filter(s => !s.isBooked).length, icon: Calendar, col: token.cyan },
                  ].map(({ label, value, icon: Icon, col }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 9, border: `1px solid ${token.border}` }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}22`, border: `1px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={14} color={col} /></div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: F, fontSize: 10, color: token.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
                        <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: token.textPrimary, lineHeight: 1.2 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditing} onClose={handleClose} section={editSection}
        formData={formData} setFormData={setFormData}
        onSave={handleSave} isSaving={isSaving} userId={email}
      />
    </>
  );
};

export default MentorProfile;

