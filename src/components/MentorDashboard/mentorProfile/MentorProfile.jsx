import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, Star, Pencil, X, Plus, Trash2, Loader2,
  Eye, CheckCircle, Clock, Calendar, Briefcase,
  BookOpen, Award, FileText, TrendingUp, Users, Globe,
  Phone, Mail, AlertCircle, ExternalLink, ChevronRight,
  Circle, AlertTriangle, Edit, UserX, MessageCircle, Video,
  Trophy, BadgeCheck, Target, Upload, Camera,
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
import { showToast } from '../../../utils/Toastprovider';

const BG = '#062117';
const CARD = '#0a2d1e';
const ACC = '#0098cc';
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
const PUR = '#a78bfa';
const PUR_L = 'rgba(167,139,250,0.1)';
const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;

// ── Helpers ────────────────────────────────────────────────────────────────
const fmtDate = s =>
  s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const calcEnd = t => {
  const [h, m] = t.split(':').map(Number), tot = h * 60 + m + 30;
  return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`;
};
const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0];
};


const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ProfilePhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | done | error
  const [errMsg, setErrMsg] = useState('');
  const [preview, setPreview] = useState(currentUrl);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setPreview(currentUrl); }, [currentUrl]);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) { setErrMsg('Only JPG, PNG, WebP or GIF.'); setStatus('error'); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setErrMsg(`Max ${MAX_MB} MB.`); setStatus('error'); return; }

    setPreview(URL.createObjectURL(file));
    setStatus('uploading'); setProgress(0); setErrMsg('');

    const ext = file.name.split('.').pop();
    const task = uploadBytesResumable(ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`), file);

    task.on('state_changed',
      snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      () => { setErrMsg('Upload failed. Try again.'); setStatus('error'); setPreview(currentUrl); },
      async () => {
        try { const url = await getDownloadURL(task.snapshot.ref); setPreview(url); setStatus('done'); onUpload?.(url); }
        catch { setErrMsg('Could not get download URL.'); setStatus('error'); }
      }
    );
  }, [userId, currentUrl, onUpload]);

  const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }, [handleFile]);
  const onDragOver = e => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const clear = e => { e?.stopPropagation(); setPreview(''); setStatus('idle'); setProgress(0); setErrMsg(''); onUpload?.(''); if (inputRef.current) inputRef.current.value = ''; };

  const isUploading = status === 'uploading';
  const isDone = status === 'done';
  const isError = status === 'error';
  const hasPhoto = !!preview;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.7px', margin: 0 }}>Profile Photo</p>
      <div
        onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
        onClick={() => !isUploading && inputRef.current?.click()}
        style={{ width: '100%', minHeight: hasPhoto ? 'auto' : 110, borderRadius: 12, border: `2px dashed ${dragging ? ACC : isError ? RED : BOR_B}`, background: dragging ? ACC_L : 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isUploading ? 'not-allowed' : 'pointer', transition: 'border-color .2s,background .2s', overflow: 'hidden' }}
      >
        <input ref={inputRef} type="file" accept={ALLOWED.join(',')} style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />

        {hasPhoto ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={preview} alt="preview" style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', border: `2px solid ${isDone ? GRN : BOR_B}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
              {isDone && <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: GRN, border: '2px solid #0a2d1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={10} color="#fff" /></div>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {isUploading ? (
                <><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><Loader2 size={12} color={ACC} style={{ animation: 'spin .9s linear infinite' }} /><span style={{ fontFamily: F, fontSize: 12, color: TXT_M, fontWeight: 600 }}>Uploading… {progress}%</span></div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 100, overflow: 'hidden' }}><div style={{ height: 4, width: `${progress}%`, background: `linear-gradient(90deg,${ACC},#22d3ee)`, borderRadius: 100, transition: 'width .2s' }} /></div></>
              ) : isDone ? (
                <><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: GRN }}>Photo uploaded!</span><p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '2px 0 0' }}>Click to replace</p></>
              ) : (
                <><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: TXT_M }}>Photo ready</span><p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '2px 0 0' }}>Click to replace</p></>
              )}
            </div>
            {!isUploading && <button type="button" onClick={clear} style={{ background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, color: RED, borderRadius: 7, padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><X size={13} /></button>}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 20px' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              {dragging ? <Upload size={18} color={ACC} /> : <Camera size={18} color={ACC} />}
            </div>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT_M, margin: '0 0 3px' }}>{dragging ? 'Drop to upload' : 'Upload Profile Photo'}</p>
            <p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
          </div>
        )}
      </div>
      {isError && errMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: RED }}>
          <AlertCircle size={13} style={{ flexShrink: 0 }} />{errMsg}
        </div>
      )}
    </div>
  );
};


const TagPill = ({ label, onRemove, col = 'cyan' }) => {
  const m = { cyan: { bg: ACC_L, bd: ACC_M, c: ACC }, amber: { bg: AMB_L, bd: 'rgba(232,160,32,0.25)', c: AMB }, teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: GRN }, purple: { bg: PUR_L, bd: 'rgba(167,139,250,0.25)', c: PUR } };
  const s = m[col] || m.cyan;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: s.bg, border: `1px solid ${s.bd}`, color: s.c, whiteSpace: 'nowrap' }}>
      {label}{onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: s.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .7, display: 'flex', alignItems: 'center' }}>×</button>}
    </span>
  );
};

const Lbl = ({ children, required }) => (
  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px' }}>
    {children}{required && <span style={{ color: RED, marginLeft: 2 }}>*</span>}
  </p>
);

const Inp = ({ value, onChange, placeholder, multiline, type = 'text', error }) => {
  const base = { fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${error ? RED : BOR_B}`, borderRadius: 8, fontSize: 13, color: TXT, background: 'rgba(0,0,0,0.25)', outline: 'none', lineHeight: 1.6, transition: 'border-color .15s', boxSizing: 'border-box', colorScheme: 'dark' };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Sel = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={{ fontFamily: F, width: '100%', padding: '9px 12px', border: `1.5px solid ${BOR_B}`, borderRadius: 8, fontSize: 13, color: value ? TXT : TXT_S, background: '#0a2d1e', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box', colorScheme: 'dark' }}>{children}</select>
);

const FieldErr = ({ msg }) => msg
  ? <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: RED }}><AlertCircle size={10} />{msg}</div>
  : null;

const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
    <input value={value} onChange={e => onChange(e.target.value)} onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} placeholder={placeholder}
      style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px', border: `1.5px solid ${BOR_B}`, borderRadius: 7, color: TXT, background: 'rgba(0,0,0,0.25)', outline: 'none', colorScheme: 'dark' }} />
    <button type="button" onClick={onAdd} style={{ padding: '8px 14px', background: ACC, color: '#fff', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
  </div>
);

const AvailPanel = ({ availability, isEditing, setFormData }) => {
  const [nd, setNd] = useState('');
  const [nt, setNt] = useState('09:00');
  const [err, setErr] = useState('');

  const flat = (availability || []).filter(s => s.date).map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] })).sort((a, b) => new Date(a.ds) - new Date(b.ds));

  const add = () => {
    setErr('');
    if (!nd) { setErr('Select a date.'); return; }
    const end = calcEnd(nt);
    const [sh, sm] = nt.split(':').map(Number), ne = sh * 60 + sm + 30;
    for (const ex of flat.filter(s => s.ds === nd)) {
      const [xh, xm] = ex.startTime.split(':').map(Number), [yh, ym] = ex.endTime.split(':').map(Number);
      if ((sh * 60 + sm) < (yh * 60 + ym) && ne > (xh * 60 + xm)) { setErr(`Conflicts with ${ex.startTime}–${ex.endTime}`); return; }
    }
    setFormData(p => ({ ...p, availability: [...(p.availability || []), { date: new Date(nd), startTime: nt, endTime: end, isBooked: false }] }));
    setNd(''); setNt('09:00');
  };

  const remove = ds => setFormData(p => ({ ...p, availability: (p.availability || []).filter(s => new Date(s.date).toISOString().split('T')[0] !== ds) }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {isEditing && (
        <div style={{ background: 'rgba(0,0,0,0.2)', border: `1.5px dashed ${BOR_B}`, borderRadius: 10, padding: '14px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px' }}>Add New Session (30 min)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-end' }}>
            <div><Lbl>Date</Lbl><input type="date" value={nd} min={tomorrow()} onChange={e => { setNd(e.target.value); setErr(''); }} style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${err && !nd ? RED : BOR_B}`, borderRadius: 7, padding: '8px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} /></div>
            <div><Lbl>Start Time</Lbl><input type="time" value={nt} min="06:00" max="23:00" onChange={e => setNt(e.target.value)} style={{ fontFamily: F, fontSize: 12, border: `1.5px solid ${BOR_B}`, borderRadius: 7, padding: '8px 10px', color: TXT, background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark' }} /></div>
            <div><Lbl>End Time</Lbl><div style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 7, border: `1px solid ${BOR}`, background: 'rgba(0,0,0,0.2)', color: TXT_M, minWidth: 78 }}>{calcEnd(nt)}</div></div>
            <button onClick={add} style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 7, border: 'none', background: ACC, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Plus size={13} />Add</button>
          </div>
          {err && <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, borderRadius: 6, padding: '6px 10px', fontFamily: F, fontSize: 11, color: RED }}><AlertCircle size={11} />{err}</div>}
        </div>
      )}
      {flat.length === 0
        ? <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(0,0,0,0.15)', border: `1px dashed ${BOR_B}`, borderRadius: 10 }}><Calendar size={22} color={TXT_S} style={{ margin: '0 auto 7px', display: 'block' }} /><p style={{ fontFamily: F, fontSize: 12, color: TXT_S, margin: 0 }}>No sessions scheduled yet.</p></div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: F, fontSize: 11, color: ACC, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}><CheckCircle size={11} />{flat.length} session{flat.length > 1 ? 's' : ''} scheduled</div>
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
                  {isEditing && !slot.isBooked && <button onClick={() => remove(slot.ds)} style={{ background: RED_L, border: `1px solid rgba(224,80,80,0.25)`, color: RED, borderRadius: 6, padding: '5px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={12} /></button>}
                </div>
              );
            })}
          </div>
        )
      }
    </div>
  );
};


const SectionCard = ({ title, subtitle, icon: Icon, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
  <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '20px 24px', borderBottom: `1px solid ${BOR}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {Icon && <div style={{ width: 32, height: 32, borderRadius: 8, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={15} color={ACC} /></div>}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: TXT, margin: 0 }}>{title}</h2>
          {subtitle && <p style={{ fontFamily: F, fontSize: 12, color: TXT_S, margin: '2px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
      </div>
      <button onClick={onEdit} disabled={isSaving} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.12)`, color: TXT_M, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', opacity: isSaving ? .5 : 1, fontFamily: F, whiteSpace: 'nowrap' }}>
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


const InfoRow = ({ icon: Icon, children, href }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 28, height: 28, borderRadius: 7, background: ACC_L, border: `1px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={12} color={ACC} /></div>
    {href
      ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: ACC, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>{children}<ExternalLink size={10} /></a>
      : <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    }
  </div>
);


const PendingDetailsCard = ({ mentorData, onEdit }) => {
  const pending = [
    !mentorData.profilePhoto && 'Profile Photo',
    !mentorData.location && 'Location',
    !mentorData.phone && 'Phone number',
    !mentorData.linkedinUrl && 'LinkedIn URL',
    !mentorData.whyMentor && 'Bio / About',
    !mentorData.currentSkills && 'Specialisations / Domains',
    !mentorData.guidanceAreas?.length && 'Areas of Guidance',
    !mentorData.hourlyRate && 'Hourly rate',
    !mentorData.yearsOfExperience && 'Years of experience',
    !mentorData.highestDegree && 'Educational Background',
    !mentorData.mentorshipFormat && 'Mentorship Format',
    !mentorData.languages?.length && 'Languages Spoken',
  ].filter(Boolean);

  if (!pending.length) return null;
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


const EditModal = ({ isOpen, onClose, section, formData, setFormData, onSave, isSaving, userId }) => {
  const [cur, setCur] = useState(section);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [guidInput, setGuidInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [accompInput, setAccomp] = useState('');

  // ── KEY FIX ──────────────────────────────────────────────────────────────
  // Only reset `cur` when the modal OPENS (isOpen: false → true).
  // Do NOT include `section` as a dependency — that caused the reset loop:
  // every time the parent re-rendered after getMentorDetails resolved,
  // React saw `section` in deps and re-ran the effect, snapping cur back to 'overview'.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      // Modal just opened — jump to whichever section was requested
      setCur(section);
      setErrors({});
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]); // <-- intentionally omit `section` from deps
  // ── END FIX ──────────────────────────────────────────────────────────────

  if (!isOpen) return null;

  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const addCSV = (field, input, setInput) => {
    const v = input.trim(); if (!v) return;
    const arr = (formData[field] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!arr.includes(v)) set(field, [...arr, v].join(', '));
    setInput('');
  };
  const rmCSV = (field, val) => set(field, (formData[field] || '').split(',').map(s => s.trim()).filter(s => s && s !== val).join(', '));

  const addArr = (field, input, setInput) => {
    const v = input.trim(); if (!v) return;
    const arr = Array.isArray(formData[field]) ? formData[field] : [];
    if (!arr.includes(v)) set(field, [...arr, v]);
    setInput('');
  };
  const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

  const validate = () => {
    const e = {};
    if (cur === 'overview') { if (!formData.fullName?.trim()) e.fullName = 'Required.'; if (!formData.currentRole?.trim()) e.role = 'Required.'; }
    if (cur === 'experience') { if (!formData.yearsOfExperience && formData.yearsOfExperience !== 0) e.yoe = 'Required.'; if (!formData.hourlyRate) e.rate = 'Required.'; }
    setErrors(e); return !Object.keys(e).length;
  };

  // Save without closing — stays on current section
  const save = async () => {
    if (!validate()) return;
    await onSave(false);
  };

  // ── KEY FIX ──────────────────────────────────────────────────────────────
  // Capture the next section BEFORE the async save so it's never stale.
  // Then call onSave(false) — the parent re-render that follows will NOT
  // reset `cur` because `section` is no longer a useEffect dependency.
  const saveNext = async () => {
    if (!validate()) return;
    const order = ['overview', 'experience', 'engagement', 'achievements'];
    const idx = order.indexOf(cur);
    if (idx < order.length - 1) {
      const next = order[idx + 1];
      setCur(next);   // navigate immediately, synchronously, before any await
      setErrors({});
    }
    await onSave(false); // parent re-renders but cur is already on the new section
  };
  // ── END FIX ──────────────────────────────────────────────────────────────

  const skills = (formData.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const guids = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
  const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
  const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'engagement', label: 'Engagement', icon: MessageCircle },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  // ── Overview ─────────────────────────────────────────────────────────────
  const tabOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Basic Information</h3>
      <ProfilePhotoUpload currentUrl={formData.profilePhoto || ''} onUpload={url => set('profilePhoto', url)} userId={userId} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
        <div>
          <Lbl required>Full Name</Lbl>
          <Inp value={formData.fullName || ''} onChange={e => { set('fullName', e.target.value); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })); }} placeholder="Your full name" error={errors.fullName} />
          <FieldErr msg={errors.fullName} />
        </div>
        <div>
          <Lbl required>Professional Title / Role</Lbl>
          <Inp value={formData.currentRole || ''} onChange={e => { set('currentRole', e.target.value); if (errors.role) setErrors(p => ({ ...p, role: '' })); }} placeholder="e.g. Senior Engineer, Career Coach" error={errors.role} />
          <FieldErr msg={errors.role} />
        </div>
        <div>
          <Lbl>Location <span style={{ fontWeight: 400, color: TXT_S, fontSize: 9, textTransform: 'none' }}>(optional)</span></Lbl>
          <Inp value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
        </div>
        <div><Lbl>Phone</Lbl><Inp value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 1234567890" /></div>
        <div><Lbl>LinkedIn</Lbl><Inp value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
      </div>
      <div><Lbl>Bio / About</Lbl><Inp value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey and mentoring goals…" multiline /></div>
      <div><Lbl>Mentoring Style</Lbl><Inp value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative, Goal-oriented" /></div>
      <div>
        <Lbl>Specialisations / Domains of Expertise</Lbl>
        <p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing, HR Policy</p>
        <TagInputRow placeholder="Add a specialisation…" value={skillInput} onChange={setSkillInput} onAdd={() => addCSV('currentSkills', skillInput, setSkillInput)} />
        {skills.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => rmCSV('currentSkills', s)} />)}</div>}
      </div>
    </div>
  );

  // ── Experience ────────────────────────────────────────────────────────────
  const tabExperience = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Professional Background</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
        <div><Lbl>Current Organisation</Lbl><Inp value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Google, Self-employed" /></div>
        <div><Lbl>Current Position</Lbl><Inp value={formData.currentPosition || ''} onChange={e => set('currentPosition', e.target.value)} placeholder="e.g. Principal Engineer" /></div>
        <div>
          <Lbl required>Years of Experience</Lbl>
          <Inp type="number" value={formData.yearsOfExperience || ''} onChange={e => { set('yearsOfExperience', e.target.value); if (errors.yoe) setErrors(p => ({ ...p, yoe: '' })); }} placeholder="e.g. 8" error={errors.yoe} />
          <FieldErr msg={errors.yoe} />
        </div>
        <div>
          <Lbl required>Hourly Rate (₹)</Lbl>
          <Inp type="number" value={formData.hourlyRate || ''} onChange={e => { set('hourlyRate', e.target.value); if (errors.rate) setErrors(p => ({ ...p, rate: '' })); }} placeholder="e.g. 1500" error={errors.rate} />
          <FieldErr msg={errors.rate} />
        </div>
        <div><Lbl>Session Duration</Lbl><Inp value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)} placeholder="e.g. 45 min" /></div>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.15)', border: `1px solid ${BOR}`, borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>Educational Background</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
          <div>
            <Lbl>Highest Degree</Lbl>
            <Sel value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)}>
              <option value="">Select degree</option>
              {["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
            </Sel>
          </div>
          <div><Lbl>Field of Study</Lbl><Inp value={formData.fieldOfStudy || ''} onChange={e => set('fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" /></div>
          <div><Lbl>Institution</Lbl><Inp value={formData.schoolName || ''} onChange={e => set('schoolName', e.target.value)} placeholder="e.g. IIT Bombay" /></div>
        </div>
      </div>
    </div>
  );

  // ── Engagement ────────────────────────────────────────────────────────────
  const tabEngagement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Engagement Information</h3>
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={12} />Availability</p>
        <AvailPanel availability={formData.availability} isEditing={true} setFormData={setFormData} />
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} />Languages Spoken</p>
        <TagInputRow placeholder="e.g. English, Hindi, Telugu" value={langInput} onChange={setLangInput} onAdd={() => addArr('languages', langInput, setLangInput)} />
        {langs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{langs.map((l, i) => <TagPill key={i} label={l} col="amber" onRemove={() => rmArr('languages', l)} />)}</div>}
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><Video size={12} />Mentorship Format</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: 8 }}>
          {['Online', 'In-Person', 'Group Sessions', 'One-on-One'].map(fmt => {
            const sel = (formData.mentorshipFormat || '').includes(fmt);
            return (
              <button key={fmt} type="button"
                onClick={() => { const c = (formData.mentorshipFormat || '').split(',').map(s => s.trim()).filter(Boolean); set('mentorshipFormat', (sel ? c.filter(s => s !== fmt) : [...c, fmt]).join(', ')); }}
                style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 14px', borderRadius: 8, border: `1.5px solid ${sel ? ACC : BOR_B}`, background: sel ? ACC_L : 'rgba(0,0,0,0.15)', color: sel ? ACC : TXT_M, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? ACC : BOR_B, flexShrink: 0 }} />{fmt}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={12} />Contact / Booking Method</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><Lbl>Platform Messaging</Lbl><Inp value={formData.platformMessaging || ''} onChange={e => set('platformMessaging', e.target.value)} placeholder="@username or handle" /></div>
          <div><Lbl>Calendar / Booking Link</Lbl><Inp value={formData.calendarLink || ''} onChange={e => set('calendarLink', e.target.value)} placeholder="https://calendly.com/…" /></div>
        </div>
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><Target size={12} />Areas of Guidance</p>
        <p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '0 0 8px' }}>e.g. Career prep, Interview coaching, Technical skills, Soft skills</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: 8, marginBottom: 8 }}>
          {['Career Prep', 'Interview Coaching', 'Technical Skills', 'Soft Skills', 'Leadership', 'Resume Review', 'Startup Guidance'].map(g => {
            const sel = guids.includes(g);
            return (
              <button key={g} type="button" onClick={() => set('guidanceAreas', sel ? guids.filter(x => x !== g) : [...guids, g])}
                style={{ fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 12px', borderRadius: 8, border: `1.5px solid ${sel ? GRN : BOR_B}`, background: sel ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0.15)', color: sel ? GRN : TXT_M, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? GRN : BOR_B, flexShrink: 0 }} />{g}
              </button>
            );
          })}
        </div>
        <TagInputRow placeholder="Add custom guidance area…" value={guidInput} onChange={setGuidInput} onAdd={() => addArr('guidanceAreas', guidInput, setGuidInput)} />
        {guids.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{guids.map((g, i) => <TagPill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas', g)} />)}</div>}
      </div>
    </div>
  );

  // ── Achievements ──────────────────────────────────────────────────────────
  const tabAchievements = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: TXT, margin: 0, paddingBottom: 12, borderBottom: `1px solid ${BOR}` }}>Achievements & Credentials</h3>
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={12} />Key Accomplishments</p>
        <p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '0 0 4px' }}>Notable projects, awards, publications, open-source contributions…</p>
        <TagInputRow placeholder="e.g. Led team that scaled product to 1M users" value={accompInput} onChange={setAccomp} onAdd={() => addArr('accomplishments', accompInput, setAccomp)} />
        {accomps.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {accomps.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${BOR}`, borderRadius: 9 }}>
                <Trophy size={13} color={AMB} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M, flex: 1 }}>{a}</span>
                <button onClick={() => rmArr('accomplishments', a)} style={{ background: RED_L, border: `1px solid rgba(224,80,80,0.2)`, color: RED, borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Trash2 size={11} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}><BadgeCheck size={12} />Certifications / Licenses</p>
        <p style={{ fontFamily: F, fontSize: 11, color: TXT_S, margin: '0 0 4px' }}>e.g. AWS Solutions Architect, PMP, CFA, Google Cloud Professional</p>
        <TagInputRow placeholder="e.g. AWS Certified Solutions Architect" value={certInput} onChange={setCertInput} onAdd={() => addArr('certifications', certInput, setCertInput)} />
        {certs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{certs.map((c, i) => <TagPill key={i} label={c} col="purple" onRemove={() => rmArr('certifications', c)} />)}</div>}
      </div>
      <div style={{ height: 1, background: BOR }} />
      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FileText size={12} />Resume / Portfolio Links <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 10, marginLeft: 4 }}>(optional)</span>
        </p>
        <div style={{ background: AMB_L, border: `1px solid rgba(232,160,32,0.22)`, borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: TXT_M, marginBottom: 14, lineHeight: 1.7 }}>
          Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
        </div>
        {[
          { label: 'Resume / CV', field: 'resumeLink', placeholder: 'https://drive.google.com/…' },
          { label: 'Portfolio', field: 'portfolioLink', placeholder: 'https://drive.google.com/… or portfolio URL' },
          { label: 'Intro Video', field: 'videoLink', placeholder: 'https://drive.google.com/… or YouTube link' },
        ].map(({ label, field, placeholder }) => (
          <div key={field} style={{ marginBottom: 12 }}>
            <Lbl>{label}</Lbl>
            <Inp value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={placeholder} />
            {formData[field] && <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: ACC, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}><Eye size={12} />Preview →</a>}
          </div>
        ))}
      </div>
    </div>
  );

  const tabContent = () => {
    switch (cur) {
      case 'overview': return tabOverview();
      case 'experience': return tabExperience();
      case 'engagement': return tabEngagement();
      case 'achievements': return tabAchievements();
      default: return tabOverview();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflowY: 'auto' }} className="mp-modal-overlay">
      <div style={{ background: '#0a2d1e', width: '100%', maxWidth: 760, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: `1px solid ${BOR_B}` }} className="mp-modal">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${BOR}`, flexShrink: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: TXT, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Pencil size={16} color={ACC} />Edit Profile</h2>
          <button onClick={onClose} disabled={isSaving} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${BOR}`, color: TXT_M, borderRadius: 7, padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, minHeight: 0, flexDirection: 'column' }} className="mp-modal-body">
          {/* Nav */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: `1px solid ${BOR}`, flexShrink: 0 }} className="mp-nav">
            <nav style={{ display: 'flex', gap: 4, padding: '10px 14px', overflowX: 'auto' }}>
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => { setCur(id); setErrors({}); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', background: cur === id ? ACC : 'transparent', color: cur === id ? '#fff' : TXT_S, border: `1px solid ${cur === id ? ACC : BOR}` }}>
                  <Icon size={13} /><span className="mp-nav-label">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>{tabContent()}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: `1px solid ${BOR}`, background: 'rgba(0,0,0,0.2)', flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={onClose} disabled={isSaving} style={{ fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${BOR_B}`, borderRadius: 8, color: TXT_M, background: 'transparent', cursor: 'pointer' }}>Cancel</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={async () => { if (!validate()) return; await onSave(true); }} disabled={isSaving}
              style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: `1px solid ${BOR_B}`, borderRadius: 8, color: TXT_M, background: 'transparent', cursor: 'pointer', opacity: isSaving ? .6 : 1 }}>
              {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
            </button>
            {cur !== 'achievements' && (
              <button
                type="button"
                onClick={saveNext}
                disabled={isSaving}
                style={{ fontFamily: F, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, color: '#fff', background: ACC, cursor: 'pointer', opacity: isSaving ? .6 : 1 }}
              >
                {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState('overview');
  const [formData, setFormData] = useState({ availability: [] });
  const [email, setEmail] = useState('');
  const serverDataRef = useRef(null);


  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

  useEffect(() => { const ud = localStorage.getItem('userData'); if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } } }, []);
  useEffect(() => { if (email) getMentorDetails(email); }, [email]);
  useEffect(() => {
    if (data?.data) {
      serverDataRef.current = data.data;
      if (!isEditing) setFormData({ ...data.data });
    }
  }, [data, isEditing]);
  const handleEdit = (sec = 'overview') => { setEditSection(sec); setIsEditing(true); };
  const handleClose = () => {
    setIsEditing(false);
    if (serverDataRef.current) setFormData({ ...serverDataRef.current });
  };

  const handleSave = async (shouldClose = true) => {
    try {
      await updateMentorDetails({ email, ...formData }).unwrap();
      showToast('Profile updated!', 'success');
      if (shouldClose) {
        handleClose();                // close immediately — never blocked
        getMentorDetails(email);      // refresh in background, no await
      }
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

  if (error || Object.keys(formData).length < 2) return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, padding: '36px 40px', maxWidth: 340, width: '100%', textAlign: 'center' }}>
        <UserX size={32} style={{ color: TXT_M, display: 'block', margin: '0 auto 12px' }} />
        <p style={{ fontFamily: F, color: TXT_M, fontSize: 14, fontWeight: 700, margin: 0 }}>No Profile Found</p>
      </div>
    </div>
  );

  // ── Derived ──────────────────────────────────────────────────────────────
  const skills = (formData.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const langs = Array.isArray(formData.languages) ? formData.languages : [];
  const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
  const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
  const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
  const fmts = (formData.mentorshipFormat || '').split(',').map(s => s.trim()).filter(Boolean);
  const bio = formData.whyMentor || '';
  const initials = formData.fullName?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
  const allFlat = (formData.availability || []).filter(s => s.date).map(s => ({ ...s, ds: new Date(s.date).toISOString().split('T')[0] }));

  const cFields = [formData.fullName, formData.profilePhoto, formData.currentRole, formData.location, formData.companyName, formData.yearsOfExperience, formData.highestDegree, formData.currentSkills, formData.guidanceAreas?.length, formData.mentorshipFormat, formData.languages?.length, formData.hourlyRate];
  const completionPct = Math.round(cFields.filter(Boolean).length / cFields.length * 100);

  const completionSteps = [
    { label: 'Full Name, Photo & Title', completed: !!(formData.fullName && formData.currentRole) },
    { label: 'Location & Contact', completed: !!(formData.location && formData.phone) },
    { label: 'Current Org & Experience', completed: !!(formData.companyName && formData.yearsOfExperience) },
    { label: 'Educational Background', completed: !!(formData.highestDegree) },
    { label: 'Specialisations & Domains', completed: !!(formData.currentSkills) },
    { label: 'Engagement & Availability', completed: !!(formData.mentorshipFormat && formData.languages?.length) },
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
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        html,body{font-family:${F};-webkit-font-smoothing:antialiased;}
        input:focus,textarea:focus,select:focus{border-color:${ACC}!important;outline:none;}
        textarea{resize:vertical;}
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:.4;cursor:pointer;filter:invert(1);}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${BOR_B};border-radius:4px;}
        ::placeholder{color:${TXT_S}!important;}
        .mp-main-grid{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start;}
        .mp-modal{border-radius:16px 16px 0 0;}
        @media(min-width:640px){
          .mp-modal{border-radius:16px;margin:auto;}
          .mp-modal-overlay{align-items:center;padding:20px;}
          .mp-modal-body{flex-direction:row!important;}
          .mp-nav{border-bottom:none!important;border-right:1px solid ${BOR};width:180px;flex-shrink:0;}
          .mp-nav nav{flex-direction:column!important;padding:12px;gap:4px;}
        }
        @media(max-width:900px){
          .mp-main-grid{grid-template-columns:1fr!important;}
          .mp-sidebar{order:-1;}
          .mp-sidebar-inner{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        }
        @media(max-width:560px){
          .mp-sidebar-inner{grid-template-columns:1fr!important;}
          .mp-hero-meta{flex-direction:column!important;gap:6px!important;}
        }
      `}</style>

      <div style={{ fontFamily: F, minHeight: '100vh', background: BG, color: TXT }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 16px 60px' }}>

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <div style={{ background: 'linear-gradient(135deg,#071e12 0%,#0a2a18 50%,#062117 100%)', border: `1px solid ${BOR}`, borderRadius: 16, padding: '28px 28px 24px', marginBottom: 20, animation: 'fadeUp .3s ease both' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {formData.profilePhoto
                    ? <img src={formData.profilePhoto} alt={formData.fullName} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', border: `2px solid ${BOR_B}`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
                    : <div style={{ width: 72, height: 72, borderRadius: 14, background: ACC_L, border: `2px solid ${BOR_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: ACC, fontFamily: F }}>{initials}</div>
                  }
                  {formData.status === 'approved' && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: GRN, border: `2px solid ${BG}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={10} color="#fff" />
                    </div>
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6, alignItems: 'center' }}>
                    {formData.mentorCategory && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '.5px', background: ACC_L, border: `1px solid ${BOR_B}`, padding: '2px 9px', borderRadius: 20 }}>{formData.mentorCategory}</span>}
                    <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: AMB, background: AMB_L, border: `1px solid rgba(232,160,32,0.25)`, padding: '2px 9px', borderRadius: 20 }}>★ {formData.rating || '5.0'}</span>
                    {formData.status === 'approved' && <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: GRN, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>✓ Verified</span>}
                  </div>
                  <h1 style={{ fontFamily: F, fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, color: TXT, margin: '0 0 3px', lineHeight: 1.2 }}>
                    {formData.fullName || <span style={{ color: TXT_S, fontStyle: 'italic', fontWeight: 500 }}>No name added</span>}
                  </h1>
                  <p style={{ fontFamily: F, fontSize: 13, color: TXT_M, margin: '0 0 8px', fontWeight: 500 }}>
                    {formData.currentRole || 'Mentor'}{formData.companyName && <span style={{ color: TXT_S }}> · {formData.companyName}</span>}
                  </p>
                  <div className="mp-hero-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    {formData.location && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{formData.location}</span>}
                    {formData.email && <span style={{ fontFamily: F, fontSize: 11.5, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{formData.email}</span>}
                    {formData.createdAt && <span style={{ fontFamily: F, fontSize: 11, color: TXT_S, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '10px 14px', textAlign: 'center', minWidth: 70 }}>
                  <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: TXT, lineHeight: 1 }}>{formData.yearsOfExperience || 0}yr</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: TXT_S, marginTop: 3, fontWeight: 600 }}>Exp.</div>
                </div>
                <div style={{ background: ACC_L, border: `1px solid ${BOR_B}`, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: ACC }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
                  <span style={{ fontFamily: F, fontSize: 11, color: TXT_S }}>{formData.sessionDuration || '/hr'}</span>
                </div>
                <button onClick={() => handleEdit('overview')} style={{ background: ACC, border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Edit size={13} />Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* ── Grid ──────────────────────────────────────────────────────── */}
          <div className="mp-main-grid" style={{ animation: 'fadeUp .4s ease .08s both' }}>

            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Profile Overview */}
              <SectionCard title="Profile Overview" subtitle="Visible to potential mentees." icon={Award} onEdit={() => handleEdit('overview')} editLabel="Edit" isSaving={isSaving}>
                {bio && <div style={{ marginBottom: 18 }}><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>About</p><p style={{ fontFamily: F, fontSize: 13, color: TXT_M, lineHeight: 1.8, margin: 0 }}>{bio}</p></div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: skills.length ? 18 : 0 }}>
                  {formData.email && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
                  {formData.phone && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
                  {formData.location && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
                  {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
                </div>
                {skills.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Specialisations & Domains</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skills.map((s, i) => <TagPill key={i} label={s} />)}</div></div>}
                {!bio && !skills.length && !formData.email && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: TXT_S, margin: '0 0 10px' }}>No profile info added yet.</p>
                    <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: ACC, background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
                  </div>
                )}
              </SectionCard>

              {/* Professional Background */}
              <SectionCard title="Professional Background" icon={Briefcase} onEdit={() => handleEdit('experience')} editLabel="Edit" isSaving={isSaving} emptyState={detailItems.length === 0 ? { message: 'No professional background added.', cta: 'Add Details →' } : null}>
                {detailItems.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
                    {detailItems.map((item, i) => (
                      <div key={i}><p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 4px' }}>{item.label}</p><p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: TXT, margin: 0 }}>{item.value}</p></div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Engagement */}
              <SectionCard title="Engagement Information" icon={MessageCircle} onEdit={() => handleEdit('engagement')} editLabel="Edit" isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {fmts.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Mentorship Format</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{fmts.map((f, i) => <TagPill key={i} label={f} />)}</div></div>}
                  {langs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Languages Spoken</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{langs.map((l, i) => <TagPill key={i} label={l} col="amber" />)}</div></div>}
                  {guidAreas.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Areas of Guidance</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{guidAreas.map((g, i) => <TagPill key={i} label={g} col="teal" />)}</div></div>}
                  {(formData.calendarLink || formData.platformMessaging) && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Booking</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {formData.calendarLink && <InfoRow icon={Calendar} href={formData.calendarLink}>Book a Session</InfoRow>}
                        {formData.platformMessaging && <InfoRow icon={MessageCircle}>{formData.platformMessaging}</InfoRow>}
                      </div>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Availability</p>
                    <AvailPanel availability={formData.availability} isEditing={false} setFormData={setFormData} />
                  </div>
                  {!fmts.length && !langs.length && !guidAreas.length && !formData.calendarLink && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: TXT_S, margin: '0 0 10px' }}>No engagement details added.</p>
                      <button onClick={() => handleEdit('engagement')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: ACC, background: 'none', border: 'none', cursor: 'pointer' }}>Add Engagement Info →</button>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Achievements */}
              <SectionCard title="Achievements & Credentials" icon={Trophy} onEdit={() => handleEdit('achievements')} editLabel="Edit" isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {accomps.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Key Accomplishments</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {accomps.map((a, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: AMB_L, border: `1px solid rgba(232,160,32,0.18)`, borderRadius: 9 }}>
                            <Trophy size={13} color={AMB} style={{ flexShrink: 0, marginTop: 1 }} />
                            <span style={{ fontFamily: F, fontSize: 12.5, color: TXT_M }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {certs.length > 0 && <div><p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Certifications / Licenses</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{certs.map((c, i) => <TagPill key={i} label={c} col="purple" />)}</div></div>}
                  {(formData.resumeLink || formData.portfolioLink || formData.videoLink) && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: TXT_S, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Documents & Media</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 8 }}>
                        {[{ label: 'Resume / CV', field: 'resumeLink', icon: FileText }, { label: 'Portfolio', field: 'portfolioLink', icon: BookOpen }, { label: 'Intro Video', field: 'videoLink', icon: Eye }]
                          .filter(d => formData[d.field]).map(({ label, field, icon: Icon }) => (
                            <a key={field} href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(0,0,0,0.15)', border: `1px solid ${BOR}`, borderRadius: 9, textDecoration: 'none' }}>
                              <div style={{ width: 24, height: 24, borderRadius: 6, background: ACC_L, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={12} color={ACC} /></div>
                              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: TXT_M }}>{label}</span>
                              <ExternalLink size={10} color={TXT_S} style={{ marginLeft: 'auto' }} />
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                  {!accomps.length && !certs.length && !formData.resumeLink && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: TXT_S, margin: '0 0 10px' }}>No achievements added yet.</p>
                      <button onClick={() => handleEdit('achievements')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: ACC, background: 'none', border: 'none', cursor: 'pointer' }}>Add Achievements →</button>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="mp-sidebar">
              <div className="mp-sidebar-inner" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Completion */}
                <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: TXT, margin: 0 }}>Profile Completion</h3>
                    <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: completionPct === 100 ? GRN : ACC }}>{completionPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
                    <div style={{ height: 6, borderRadius: 100, width: `${completionPct}%`, background: completionPct === 100 ? GRN : `linear-gradient(90deg,${ACC},#22d3ee)`, transition: 'width .7s ease' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {completionSteps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {step.completed ? <CheckCircle size={16} color={GRN} style={{ flexShrink: 0 }} /> : <Circle size={16} color={BOR_B} style={{ flexShrink: 0 }} />}
                        <span style={{ fontFamily: F, fontSize: 12.5, color: step.completed ? TXT_M : TXT_S, fontWeight: step.completed ? 600 : 500 }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                  {completionPct < 100
                    ? <button onClick={() => handleEdit('overview')} style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: ACC, border: 'none', borderRadius: 9, padding: '10px', cursor: 'pointer' }}>Complete Your Profile</button>
                    : <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CheckCircle size={16} color={GRN} /><span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: GRN }}>Profile Complete!</span></div>
                  }
                </div>

                {completionPct < 100 && <PendingDetailsCard mentorData={formData} onEdit={() => handleEdit('overview')} />}

                {/* Quick Stats */}
                <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BOR}`, padding: 20 }}>
                  <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: TXT, margin: '0 0 14px' }}>Quick Stats</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { label: 'Completed Sessions', value: formData.completedBookings || 0, icon: TrendingUp, col: ACC },
                      { label: 'Total Mentees', value: formData.totalMentees || 0, icon: Users, col: GRN },
                      { label: 'Rating', value: `${formData.rating || '5.0'} ★`, icon: Star, col: AMB },
                      { label: 'Upcoming Sessions', value: allFlat.filter(s => !s.isBooked).length, icon: Calendar, col: ACC },
                    ].map(({ label, value, icon: Icon, col }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 9, border: `1px solid ${BOR}` }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}14`, border: `1px solid ${col}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={14} color={col} /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: F, fontSize: 10, color: TXT_S, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
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
        userId={email}
      />
    </>
  );
};

export default MentorProfile;


















