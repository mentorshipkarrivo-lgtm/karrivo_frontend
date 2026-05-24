





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















