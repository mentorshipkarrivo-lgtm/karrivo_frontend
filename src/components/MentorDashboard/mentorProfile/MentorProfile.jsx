



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
import Loader from '../../../global/Loader';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const F = `"Plus Jakarta Sans", "DM Sans", -apple-system, sans-serif`;
const MAX_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const NAV_ORDER = ['overview', 'experience', 'engagement', 'achievements'];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const fmtDate = s =>
  s ? new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

const calcEnd = t => {
  const [h, m] = t.split(':').map(Number);
  const tot = h * 60 + m + 30;
  return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`;
};

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const splitCSV = str => (str || '').split(',').map(s => s.trim()).filter(Boolean);
const joinCSV = arr => arr.join(', ');

// ─────────────────────────────────────────────────────────────────────────────
// ProfilePhotoUpload
// ─────────────────────────────────────────────────────────────────────────────
const ProfilePhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
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
    setStatus('uploading');
    setProgress(0);
    setErrMsg('');

    const ext = file.name.split('.').pop();
    const task = uploadBytesResumable(
      ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`), file
    );

    task.on(
      'state_changed',
      snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      () => { setErrMsg('Upload failed. Try again.'); setStatus('error'); setPreview(currentUrl); },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          setPreview(url);
          setStatus('done');
          onUpload?.(url);
        } catch {
          setErrMsg('Could not get download URL.');
          setStatus('error');
        }
      }
    );
  }, [userId, currentUrl, onUpload]);

  const onDrop = useCallback(e => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, [handleFile]);

  const clear = e => {
    e?.stopPropagation();
    setPreview('');
    setStatus('idle');
    setProgress(0);
    setErrMsg('');
    onUpload?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const isUploading = status === 'uploading';
  const isDone = status === 'done';
  const isError = status === 'error';
  const hasPhoto = !!preview;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{
        fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070',
        textTransform: 'uppercase', letterSpacing: '.7px', margin: 0
      }}>Profile Photo</p>

      <div
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => !isUploading && inputRef.current?.click()}
        style={{
          width: '100%',
          minHeight: hasPhoto ? 'auto' : 110,
          borderRadius: 12,
          border: `2px dashed ${dragging ? '#0098cc' : isError ? '#e05050' : 'rgba(0,152,204,0.26)'}`,
          background: dragging ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'border-color .2s, background .2s',
          overflow: 'hidden',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files?.[0])}
        />

        {hasPhoto ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', width: '100%' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={preview} alt="preview"
                style={{
                  width: 60, height: 60, borderRadius: 12, objectFit: 'cover',
                  border: `2px solid ${isDone ? '#22c55e' : 'rgba(0,152,204,0.26)'}`, display: 'block'
                }}
                onError={e => e.target.style.display = 'none'}
              />
              {isDone && (
                <div style={{
                  position: 'absolute', bottom: -4, right: -4, width: 18, height: 18,
                  borderRadius: '50%', background: '#22c55e', border: '2px solid #0a2d1e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <CheckCircle size={10} color="#fff" />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {isUploading ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <Loader2 size={12} color="#0098cc" style={{ animation: 'spin .9s linear infinite' }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: '#8fbfb0', fontWeight: 600 }}>Uploading… {progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{
                      height: 4, width: `${progress}%`,
                      background: 'linear-gradient(90deg,#0098cc,#22d3ee)',
                      borderRadius: 100, transition: 'width .2s'
                    }} />
                  </div>
                </>
              ) : isDone ? (
                <>
                  <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: '#22c55e' }}>Photo uploaded!</span>
                  <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '2px 0 0' }}>Click to replace</p>
                </>
              ) : (
                <>
                  <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: '#8fbfb0' }}>Photo ready</span>
                  <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '2px 0 0' }}>Click to replace</p>
                </>
              )}
            </div>
            {!isUploading && (
              <button
                type="button" onClick={clear}
                style={{
                  background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)',
                  color: '#e05050', borderRadius: 7, padding: 6, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', flexShrink: 0
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 20px' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(0,152,204,0.12)', border: '1px solid rgba(0,152,204,0.26)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              {dragging ? <Upload size={18} color="#0098cc" /> : <Camera size={18} color="#0098cc" />}
            </div>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#8fbfb0', margin: '0 0 3px' }}>
              {dragging ? 'Drop to upload' : 'Upload Profile Photo'}
            </p>
            <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: 0 }}>
              Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB
            </p>
          </div>
        )}
      </div>

      {isError && errMsg && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)',
          borderRadius: 8, padding: '8px 12px', fontFamily: F, fontSize: 11.5, color: '#e05050'
        }}>
          <AlertCircle size={13} style={{ flexShrink: 0 }} />{errMsg}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Reusable UI Atoms
// ─────────────────────────────────────────────────────────────────────────────
const TagPill = ({ label, onRemove, col = 'cyan' }) => {
  const styles = {
    cyan: { bg: 'rgba(0,152,204,0.12)', bd: 'rgba(0,152,204,0.22)', c: '#0098cc' },
    amber: { bg: 'rgba(232,160,32,0.12)', bd: 'rgba(232,160,32,0.25)', c: '#e8a020' },
    teal: { bg: 'rgba(34,197,94,0.08)', bd: 'rgba(34,197,94,0.2)', c: '#22c55e' },
    purple: { bg: 'rgba(167,139,250,0.1)', bd: 'rgba(167,139,250,0.25)', c: '#a78bfa' },
  };
  const s = styles[col] || styles.cyan;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px 3px 11px', borderRadius: 100, fontSize: 11.5, fontWeight: 600,
      background: s.bg, border: `1px solid ${s.bd}`, color: s.c, whiteSpace: 'nowrap'
    }}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: s.c, fontSize: 14, lineHeight: 1, padding: 0, opacity: .7, display: 'flex', alignItems: 'center' }}
        >×</button>
      )}
    </span>
  );
};

const Lbl = ({ children, required }) => (
  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 5px' }}>
    {children}{required && <span style={{ color: '#e05050', marginLeft: 2 }}>*</span>}
  </p>
);

const Inp = ({ value, onChange, placeholder, multiline, type = 'text', error }) => {
  const base = {
    fontFamily: F, width: '100%', padding: '9px 12px',
    border: `1.5px solid ${error ? '#e05050' : 'rgba(0,152,204,0.26)'}`,
    borderRadius: 8, fontSize: 13, color: '#e8f5f0',
    background: 'rgba(0,0,0,0.25)', outline: 'none',
    lineHeight: 1.6, transition: 'border-color .15s',
    boxSizing: 'border-box', colorScheme: 'dark',
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ ...base, resize: 'vertical' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Sel = ({ value, onChange, children }) => (
  <select
    value={value} onChange={onChange}
    style={{
      fontFamily: F, width: '100%', padding: '9px 12px',
      border: '1.5px solid rgba(0,152,204,0.26)',
      borderRadius: 8, fontSize: 13, color: value ? '#e8f5f0' : '#4a8070',
      background: '#0a2d1e', outline: 'none', lineHeight: 1.6,
      boxSizing: 'border-box', colorScheme: 'dark'
    }}
  >{children}</select>
);

const FieldErr = ({ msg }) => msg ? (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: '#e05050' }}>
    <AlertCircle size={10} />{msg}
  </div>
) : null;

const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
  <div className="mp-tag-input-row">
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
      placeholder={placeholder}
      style={{
        flex: 1, minWidth: 0, fontFamily: F, fontSize: 12, padding: '8px 11px',
        border: '1.5px solid rgba(0,152,204,0.26)', borderRadius: 7,
        color: '#e8f5f0', background: 'rgba(0,0,0,0.25)', outline: 'none', colorScheme: 'dark',
        boxSizing: 'border-box',
      }}
    />
    <button
      type="button" onClick={onAdd}
      style={{
        padding: '8px 14px', background: '#0098cc', color: '#fff',
        borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 700,
        cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
      }}
    >Add</button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// AvailPanel
// ─────────────────────────────────────────────────────────────────────────────
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
    const [sh, sm] = nt.split(':').map(Number);
    const ne = sh * 60 + sm + 30;
    for (const ex of flat.filter(s => s.ds === nd)) {
      const [xh, xm] = ex.startTime.split(':').map(Number);
      const [yh, ym] = ex.endTime.split(':').map(Number);
      if ((sh * 60 + sm) < (yh * 60 + ym) && ne > (xh * 60 + xm)) {
        setErr(`Conflicts with ${ex.startTime}–${ex.endTime}`);
        return;
      }
    }

    const _localDate = new Date(nd + 'T12:00:00'); // ← noon prevents UTC offset shifting the day
    const day = _localDate.toLocaleDateString('en-US', { weekday: 'long' });

    setFormData(p => ({
      ...p,
      availability: [
        ...(p.availability || []),
        {
          date: new Date(nd + 'T00:00:00'),
          startTime: nt,
          endTime: end,
          isBooked: false,
          day,                             // ← correctly computed day name
        }
      ]
    }));
    setNd('');
    setNt('09:00');
  };
  const remove = (ds, startTime) => setFormData(p => ({
    ...p,
    availability: (p.availability || []).filter(s => {
      const sds = new Date(s.date).toISOString().split('T')[0];
      return !(sds === ds && s.startTime === startTime);
    }),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {isEditing && (
        <div style={{
          background: 'rgba(0,0,0,0.2)', border: '1.5px dashed rgba(0,152,204,0.26)',
          borderRadius: 10, padding: '14px 16px'
        }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px' }}>
            Add New Session (30 min)
          </p>
          <div className="mp-avail-row">
            <div className="mp-avail-field">
              <Lbl>Date</Lbl>
              <input
                type="date" value={nd} min={tomorrow()}
                onChange={e => { setNd(e.target.value); setErr(''); }}
                style={{
                  fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box',
                  border: `1.5px solid ${err && !nd ? '#e05050' : 'rgba(0,152,204,0.26)'}`,
                  borderRadius: 7, padding: '8px 10px', color: '#e8f5f0',
                  background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark'
                }}
              />
            </div>
            <div className="mp-avail-field">
              <Lbl>Start Time</Lbl>
              <input
                type="time" value={nt} min="06:00" max="23:00"
                onChange={e => setNt(e.target.value)}
                style={{
                  fontFamily: F, fontSize: 12, width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid rgba(0,152,204,0.26)',
                  borderRadius: 7, padding: '8px 10px', color: '#e8f5f0',
                  background: 'rgba(0,0,0,0.3)', outline: 'none', colorScheme: 'dark'
                }}
              />
            </div>
            <div className="mp-avail-field">
              <Lbl>End Time</Lbl>
              <div style={{
                fontFamily: F, fontSize: 12, fontWeight: 600, padding: '8px 12px',
                borderRadius: 7, border: '1px solid rgba(0,152,204,0.14)',
                background: 'rgba(0,0,0,0.2)', color: '#8fbfb0', minWidth: 78,
                boxSizing: 'border-box',
              }}>{calcEnd(nt)}</div>
            </div>
            <button
              onClick={add}
              className="mp-avail-add-btn"
              style={{
                fontFamily: F, display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 7, border: 'none',
                background: '#0098cc', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                whiteSpace: 'nowrap', alignSelf: 'flex-end',
              }}
            >
              <Plus size={13} />Add
            </button>
          </div>
          {err && (
            <div style={{
              marginTop: 8, display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)',
              borderRadius: 6, padding: '6px 10px', fontFamily: F, fontSize: 11, color: '#e05050'
            }}>
              <AlertCircle size={11} />{err}
            </div>
          )}
        </div>
      )}

      {flat.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '28px 16px',
          background: 'rgba(0,0,0,0.15)', border: '1px dashed rgba(0,152,204,0.26)', borderRadius: 10
        }}>
          <Calendar size={22} color="#4a8070" style={{ margin: '0 auto 7px', display: 'block' }} />
          <p style={{ fontFamily: F, fontSize: 12, color: '#4a8070', margin: 0 }}>No sessions scheduled yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: F, fontSize: 11, color: '#0098cc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <CheckCircle size={11} />{flat.length} session{flat.length > 1 ? 's' : ''} scheduled
          </div>
          {flat.map(slot => {
            const d = new Date(slot.ds);
            const slotKey = `${slot.ds}_${slot.startTime}`;
            return (
              <div
                key={slotKey}
                className="mp-session-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                  background: slot.isBooked ? 'rgba(232,160,32,0.12)' : 'rgba(0,0,0,0.15)',
                  border: `1px solid ${slot.isBooked ? 'rgba(232,160,32,0.25)' : 'rgba(0,152,204,0.14)'}`,
                  borderRadius: 9
                }}
              >
                <div className="mp-session-date" style={{
                  flexShrink: 0, width: 42, textAlign: 'center', padding: 4,
                  borderRadius: 8, background: 'rgba(0,152,204,0.12)', border: '1px solid rgba(0,152,204,0.26)'
                }}>
                  <div style={{ fontFamily: F, fontSize: 8.5, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase' }}>
                    {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 19, fontWeight: 800, color: '#e8f5f0', lineHeight: 1.1 }}>{d.getDate()}</div>
                  <div style={{ fontFamily: F, fontSize: 8.5, color: '#4a8070' }}>
                    {d.toLocaleDateString('en-IN', { month: 'short' })}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#e8f5f0' }}>
                    {slot.startTime} — {slot.endTime}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 11, color: '#4a8070', marginTop: 1 }}>
                    {d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · 30 min
                  </div>
                </div>
                {slot.isBooked && <TagPill label="Booked" col="amber" />}
                {isEditing && !slot.isBooked && (
                  <button
                    onClick={() => remove(slot.ds, slot.startTime)}
                    style={{
                      background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.25)',
                      color: '#e05050', borderRadius: 6, padding: '5px 7px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0
                    }}
                  >
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

// ─────────────────────────────────────────────────────────────────────────────
// SectionCard
// ─────────────────────────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, icon: Icon, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
  <div style={{ background: '#0a2d1e', borderRadius: 16, border: '1px solid rgba(0,152,204,0.14)', overflow: 'hidden' }}>
    <div className="mp-card-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        {Icon && (
          <div className="mp-card-icon" style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(0,152,204,0.12)', border: '1px solid rgba(0,152,204,0.26)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Icon size={15} color="#0098cc" />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: '#e8f5f0', margin: 0 }}>{title}</h2>
          {subtitle && <p className="mp-card-subtitle" style={{ fontFamily: F, fontSize: 12, color: '#4a8070', margin: '2px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={onEdit} disabled={isSaving}
        className="mp-card-edit-btn"
        style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#8fbfb0', fontSize: 12, fontWeight: 700, padding: '7px 14px',
          borderRadius: 8, cursor: 'pointer', opacity: isSaving ? .5 : 1,
          fontFamily: F, whiteSpace: 'nowrap'
        }}
      >
        {isSaving ? <Loader2 size={13} style={{ animation: 'spin .9s linear infinite' }} /> : <Edit size={13} />}
        {isSaving ? 'Saving…' : editLabel}
      </button>
    </div>
    <div className="mp-card-body">
      {children || (emptyState && (
        <div style={{ textAlign: 'center', padding: '28px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 13, color: '#4a8070', margin: '0 0 10px' }}>{emptyState.message}</p>
          <button onClick={onEdit} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#0098cc', background: 'none', border: 'none', cursor: 'pointer' }}>{emptyState.cta}</button>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// InfoRow
// ─────────────────────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, children, href }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
    <div style={{
      width: 28, height: 28, borderRadius: 7,
      background: 'rgba(0,152,204,0.12)', border: '1px solid rgba(0,152,204,0.26)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <Icon size={12} color="#0098cc" />
    </div>
    {href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 12.5, color: '#0098cc', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {children}<ExternalLink size={10} />
      </a>
    ) : (
      <span style={{ fontFamily: F, fontSize: 12.5, color: '#8fbfb0', fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {children}
      </span>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// PendingDetailsCard
// ─────────────────────────────────────────────────────────────────────────────
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
    <div style={{ background: '#0a2d1e', borderRadius: 16, border: '1px solid rgba(232,160,32,0.22)', overflow: 'hidden' }}>
      <div style={{
        background: 'rgba(232,160,32,0.12)', padding: '14px 20px',
        borderBottom: '1px solid rgba(232,160,32,0.18)',
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <AlertTriangle size={15} color="#e8a020" />
        <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: '#e8f5f0', margin: 0, flex: 1 }}>Pending Details</h3>
        <span style={{ background: '#e8a020', color: '#fff', fontFamily: F, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>
          {pending.length}
        </span>
      </div>
      <div className="mp-pending-body">
        <p style={{ fontFamily: F, fontSize: 11.5, color: '#4a8070', margin: '0 0 10px' }}>
          Complete these to improve your visibility.
        </p>
        {pending.map((item, i) => (
          <button
            key={i} onClick={onEdit}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: i < pending.length - 1 ? '1px solid rgba(0,152,204,0.14)' : 'none'
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e8a020', flexShrink: 0 }} />
            <span style={{ fontFamily: F, fontSize: 12.5, color: '#8fbfb0', flex: 1, textAlign: 'left' }}>{item}</span>
            <ChevronRight size={13} color="#4a8070" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EditModal
// ─────────────────────────────────────────────────────────────────────────────
const EditModal = ({ isOpen, onClose, section, formData, setFormData, onSave, isSaving, userId }) => {
  const [cur, setCur] = useState(section);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [guidInput, setGuidInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [accompInput, setAccomp] = useState('');
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setCur(section);
      setErrors({});
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const set = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const addCSV = (field, input, setInput) => {
    const v = input.trim();
    if (!v) return;
    const arr = splitCSV(formData[field]);
    if (!arr.includes(v)) set(field, joinCSV([...arr, v]));
    setInput('');
  };
  const rmCSV = (field, val) =>
    set(field, joinCSV(splitCSV(formData[field]).filter(s => s !== val)));

  const addArr = (field, input, setInput) => {
    const v = input.trim();
    if (!v) return;
    const arr = Array.isArray(formData[field]) ? formData[field] : [];
    if (!arr.includes(v)) set(field, [...arr, v]);
    setInput('');
  };
  const rmArr = (field, val) =>
    set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter(x => x !== val));

  const validate = () => {
    const e = {};
    if (cur === 'overview') {
      if (!formData.fullName?.trim()) e.fullName = 'Required.';
      if (!formData.currentRole?.trim()) e.role = 'Required.';
    }
    if (cur === 'experience') {
      if (formData.yearsOfExperience == null && formData.yearsOfExperience !== 0) e.yoe = 'Required.';
      if (!formData.hourlyRate) e.rate = 'Required.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSaveAndClose = async () => {
    if (!validate()) return;
    await onSave(true);
  };

  const handleSaveAndContinue = async () => {
    if (!validate()) return;
    const idx = NAV_ORDER.indexOf(cur);
    if (idx < NAV_ORDER.length - 1) {
      setCur(NAV_ORDER[idx + 1]);
      setErrors({});
    }
    await onSave(false);
  };

  const isLastTab = cur === NAV_ORDER[NAV_ORDER.length - 1];

  const skills = splitCSV(formData.currentSkills);
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

  const tabOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#e8f5f0', margin: 0, paddingBottom: 12, borderBottom: '1px solid rgba(0,152,204,0.14)' }}>
        Basic Information
      </h3>
      <ProfilePhotoUpload
        currentUrl={formData.profilePhoto || ''}
        onUpload={url => set('profilePhoto', url)}
        userId={userId}
      />
      <div className="mp-form-grid">
        <div>
          <Lbl required>Full Name</Lbl>
          <Inp
            value={formData.fullName || ''}
            onChange={e => { set('fullName', e.target.value); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })); }}
            placeholder="Your full name" error={errors.fullName}
          />
          <FieldErr msg={errors.fullName} />
        </div>
        <div>
          <Lbl required>Professional Title / Role</Lbl>
          <Inp
            value={formData.currentRole || ''}
            onChange={e => { set('currentRole', e.target.value); if (errors.role) setErrors(p => ({ ...p, role: '' })); }}
            placeholder="e.g. Senior Engineer, Career Coach" error={errors.role}
          />
          <FieldErr msg={errors.role} />
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
        <Inp
          value={formData.whyMentor || ''}
          onChange={e => set('whyMentor', e.target.value)}
          placeholder="Share your professional journey and mentoring goals…" multiline
        />
      </div>
      <div>
        <Lbl>Mentoring Style</Lbl>
        <Inp value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g. Collaborative, Goal-oriented" />
      </div>
      <div>
        <Lbl>Specialisations / Domains of Expertise</Lbl>
        <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '0 0 2px' }}>e.g. Data Science, Cloud Computing, HR Policy</p>
        <TagInputRow
          placeholder="Add a specialisation…" value={skillInput} onChange={setSkillInput}
          onAdd={() => addCSV('currentSkills', skillInput, setSkillInput)}
        />
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => rmCSV('currentSkills', s)} />)}
          </div>
        )}
      </div>
    </div>
  );

  const tabExperience = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#e8f5f0', margin: 0, paddingBottom: 12, borderBottom: '1px solid rgba(0,152,204,0.14)' }}>
        Professional Background
      </h3>
      <div className="mp-form-grid">
        <div>
          <Lbl>Current Organisation</Lbl>
          <Inp value={formData.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Google, Self-employed" />
        </div>
        <div>
          <Lbl>Current Position</Lbl>
          <Inp value={formData.currentPosition || ''} onChange={e => set('currentPosition', e.target.value)} placeholder="e.g. Principal Engineer" />
        </div>
        <div>
          <Lbl required>Years of Experience</Lbl>
          <Inp
            type="number" value={formData.yearsOfExperience || ''}
            onChange={e => { set('yearsOfExperience', e.target.value); if (errors.yoe) setErrors(p => ({ ...p, yoe: '' })); }}
            placeholder="e.g. 8" error={errors.yoe}
          />
          <FieldErr msg={errors.yoe} />
        </div>
        <div>
          <Lbl required>Hourly Rate (₹)</Lbl>
          <Inp
            type="number" value={formData.hourlyRate || ''}
            onChange={e => { set('hourlyRate', e.target.value); if (errors.rate) setErrors(p => ({ ...p, rate: '' })); }}
            placeholder="e.g. 1500" error={errors.rate}
          />
          <FieldErr msg={errors.rate} />
        </div>
        <div>
          <Lbl>Session Duration</Lbl>
          <Inp value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)} placeholder="e.g. 45 min" />
        </div>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(0,152,204,0.14)', borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>
          Educational Background
        </p>
        <div className="mp-form-grid">
          <div>
            <Lbl>Highest Degree</Lbl>
            <Sel value={formData.highestDegree || ''} onChange={e => set('highestDegree', e.target.value)}>
              <option value="">Select degree</option>
              {["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
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
      </div>
    </div>
  );

  const tabEngagement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#e8f5f0', margin: 0, paddingBottom: 12, borderBottom: '1px solid rgba(0,152,204,0.14)' }}>
        Engagement Information
      </h3>

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={12} />Availability
        </p>
        <AvailPanel availability={formData.availability} isEditing setFormData={setFormData} />
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={12} />Languages Spoken
        </p>
        <TagInputRow
          placeholder="e.g. English, Hindi, Telugu" value={langInput} onChange={setLangInput}
          onAdd={() => addArr('languages', langInput, setLangInput)}
        />
        {langs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {langs.map((l, i) => <TagPill key={i} label={l} col="amber" onRemove={() => rmArr('languages', l)} />)}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Video size={12} />Mentorship Format
        </p>
        <div className="mp-format-grid">
          {['Online', 'Group Sessions', 'One-on-One'].map(fmt => {
            const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
            return (
              <button
                key={fmt} type="button"
                onClick={() => {
                  const c = splitCSV(formData.mentorshipFormat);
                  set('mentorshipFormat', joinCSV(sel ? c.filter(s => s !== fmt) : [...c, fmt]));
                }}
                style={{
                  fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 14px',
                  borderRadius: 8, border: `1.5px solid ${sel ? '#0098cc' : 'rgba(0,152,204,0.26)'}`,
                  background: sel ? 'rgba(0,152,204,0.12)' : 'rgba(0,0,0,0.15)',
                  color: sel ? '#0098cc' : '#8fbfb0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 7
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? '#0098cc' : 'rgba(0,152,204,0.26)', flexShrink: 0 }} />
                {fmt}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <MessageCircle size={12} />Contact / Booking Method
        </p>
        <div className="mp-contact-grid">
          <div>
            <Lbl>Platform Messaging</Lbl>
            <Inp value={formData.platformMessaging || ''} onChange={e => set('platformMessaging', e.target.value)} placeholder="@username or handle" />
          </div>
          <div>
            <Lbl>Calendar / Booking Link</Lbl>
            <Inp value={formData.calendarLink || ''} onChange={e => set('calendarLink', e.target.value)} placeholder="https://calendly.com/…" />
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Target size={12} />Areas of Guidance
        </p>
        <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '0 0 8px' }}>
          e.g. Career prep, Interview coaching, Technical skills, Soft skills
        </p>
        <div className="mp-guidance-grid">
          {['Career Prep', 'Interview Coaching', 'Technical Skills', 'Soft Skills', 'Leadership', 'Resume Review', 'Startup Guidance'].map(g => {
            const sel = guids.includes(g);
            return (
              <button
                key={g} type="button"
                onClick={() => set('guidanceAreas', sel ? guids.filter(x => x !== g) : [...guids, g])}
                style={{
                  fontFamily: F, fontSize: 12, fontWeight: 600, padding: '9px 12px',
                  borderRadius: 8, border: `1.5px solid ${sel ? '#22c55e' : 'rgba(0,152,204,0.26)'}`,
                  background: sel ? 'rgba(34,197,94,0.08)' : 'rgba(0,0,0,0.15)',
                  color: sel ? '#22c55e' : '#8fbfb0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 7
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sel ? '#22c55e' : 'rgba(0,152,204,0.26)', flexShrink: 0 }} />
                {g}
              </button>
            );
          })}
        </div>
        <TagInputRow
          placeholder="Add custom guidance area…" value={guidInput} onChange={setGuidInput}
          onAdd={() => addArr('guidanceAreas', guidInput, setGuidInput)}
        />
        {guids.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {guids.map((g, i) => <TagPill key={i} label={g} col="teal" onRemove={() => rmArr('guidanceAreas', g)} />)}
          </div>
        )}
      </div>
    </div>
  );

  const tabAchievements = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: '#e8f5f0', margin: 0, paddingBottom: 12, borderBottom: '1px solid rgba(0,152,204,0.14)' }}>
        Achievements & Credentials
      </h3>

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Trophy size={12} />Key Accomplishments
        </p>
        <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '0 0 4px' }}>
          Notable projects, awards, publications, open-source contributions…
        </p>
        <TagInputRow
          placeholder="e.g. Led team that scaled product to 1M users"
          value={accompInput} onChange={setAccomp}
          onAdd={() => addArr('accomplishments', accompInput, setAccomp)}
        />
        {accomps.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {accomps.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px',
                background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(0,152,204,0.14)', borderRadius: 9
              }}>
                <Trophy size={13} color="#e8a020" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: F, fontSize: 12.5, color: '#8fbfb0', flex: 1, wordBreak: 'break-word' }}>{a}</span>
                <button
                  onClick={() => rmArr('accomplishments', a)}
                  style={{
                    background: 'rgba(224,80,80,0.1)', border: '1px solid rgba(224,80,80,0.2)',
                    color: '#e05050', borderRadius: 5, padding: '4px 6px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0
                  }}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <BadgeCheck size={12} />Certifications / Licenses
        </p>
        <p style={{ fontFamily: F, fontSize: 11, color: '#4a8070', margin: '0 0 4px' }}>
          e.g. AWS Solutions Architect, PMP, CFA, Google Cloud Professional
        </p>
        <TagInputRow
          placeholder="e.g. AWS Certified Solutions Architect"
          value={certInput} onChange={setCertInput}
          onAdd={() => addArr('certifications', certInput, setCertInput)}
        />
        {certs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {certs.map((c, i) => <TagPill key={i} label={c} col="purple" onRemove={() => rmArr('certifications', c)} />)}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(0,152,204,0.14)' }} />

      <div>
        <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FileText size={12} />Resume / Portfolio Links
        </p>
        <div style={{
          background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.22)',
          borderRadius: 10, padding: '12px 14px', fontFamily: F, fontSize: 12, color: '#8fbfb0',
          marginBottom: 14, lineHeight: 1.7
        }}>
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
            {formData[field] && (
              <a
                href={formData[field]} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: F, fontSize: 11.5, color: '#0098cc', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, textDecoration: 'none' }}
              >
                <Eye size={12} />Preview →
              </a>
            )}
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
    <div className="mp-modal-overlay">
      <div className="mp-modal">
        {/* Header */}
        <div className="mp-modal-header">
          <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: '#e8f5f0', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Pencil size={16} color="#0098cc" />Edit Profile
          </h2>
          <button
            onClick={onClose} disabled={isSaving}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,152,204,0.14)',
              color: '#8fbfb0', borderRadius: 7, padding: 6, cursor: 'pointer',
              display: 'flex', alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="mp-modal-body">
          {/* Nav */}
          <div className="mp-nav">
            <nav>
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id} type="button"
                  onClick={() => { setCur(id); setErrors({}); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                    padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    fontFamily: F, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s',
                    background: cur === id ? '#0098cc' : 'transparent',
                    color: cur === id ? '#fff' : '#4a8070',
                    border: `1px solid ${cur === id ? '#0098cc' : 'rgba(0,152,204,0.14)'}`
                  }}
                >
                  <Icon size={13} />
                  <span className="mp-nav-label">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="mp-modal-content">{tabContent()}</div>
        </div>

        {/* Footer */}
        <div className="mp-modal-footer">
          <button
            type="button" onClick={onClose} disabled={isSaving}
            className="mp-cancel-btn"
            style={{
              fontFamily: F, padding: '9px 18px', fontSize: 12, fontWeight: 700,
              border: '1px solid rgba(0,152,204,0.26)', borderRadius: 8,
              color: '#8fbfb0', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap'
            }}
          >Cancel</button>

          <div className="mp-footer-actions">
            <button
              type="button" onClick={handleSaveAndClose} disabled={isSaving}
              style={{
                fontFamily: F, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '9px 18px', fontSize: 12, fontWeight: 700,
                border: '1px solid rgba(0,152,204,0.26)', borderRadius: 8,
                color: '#8fbfb0', background: 'transparent', cursor: 'pointer',
                opacity: isSaving ? .6 : 1, whiteSpace: 'nowrap'
              }}
            >
              {isSaving ? <><Loader2 size={12} style={{ animation: 'spin .9s linear infinite' }} />Saving…</> : 'Save'}
            </button>

            {!isLastTab && (
              <button
                type="button" onClick={handleSaveAndContinue} disabled={isSaving}
                style={{
                  fontFamily: F, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '9px 18px', fontSize: 12, fontWeight: 700,
                  border: 'none', borderRadius: 8, color: '#fff', background: '#0098cc',
                  cursor: 'pointer', opacity: isSaving ? .6 : 1, whiteSpace: 'nowrap'
                }}
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

// ─────────────────────────────────────────────────────────────────────────────
// MentorProfile (main)
// ─────────────────────────────────────────────────────────────────────────────
const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState('overview');
  const [formData, setFormData] = useState({ availability: [] });
  const [email, setEmail] = useState('');
  const serverDataRef = useRef(null);

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isSaving }] = useUpdateMentorDetailsMutation();

  useEffect(() => {
    const ud = localStorage.getItem('userData');
    if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
  }, []);

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

  const notify = (msg, type) => {
    try {
      if (typeof showToast === 'function') showToast(msg, type);
      else console.log(`[${type || 'info'}]`, msg);
    } catch { console.log(msg); }
  };



  const handleSave = async (shouldClose = true) => {
    try {
      const enrichedFormData = {
        ...formData,
        availability: (formData.availability || []).map(slot => {
          if (slot.day) return slot;
          const ds = new Date(slot.date).toISOString().split('T')[0];
          const day = new Date(ds + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' });
          return { ...slot, day };
        }),
      };
      await updateMentorDetails({ email, ...enrichedFormData }).unwrap();
      notify('Profile updated!', 'success');
      if (shouldClose) {
        handleClose();
        getMentorDetails(email);
      }
    } catch {
      notify('Failed to update.', 'error');
    }
  };
  if (isLoading) return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: '#062117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </div>
  );

  if (error || Object.keys(formData).length < 2) return (
    <div style={{ fontFamily: F, minHeight: '100vh', background: '#062117', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Loader />
    </div>
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

  const cFields = [
    formData.fullName, formData.profilePhoto, formData.currentRole, formData.location,
    formData.companyName, formData.yearsOfExperience, formData.highestDegree,
    formData.currentSkills, formData.guidanceAreas?.length, formData.mentorshipFormat,
    formData.languages?.length, formData.hourlyRate,
  ];
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
        *,*::before,*::after { box-sizing:border-box; }
        @keyframes spin   { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        html,body { font-family:${F}; -webkit-font-smoothing:antialiased; }
        input:focus,textarea:focus,select:focus { border-color:#0098cc !important; outline:none; }
        textarea { resize:vertical; }
        input[type="time"]::-webkit-calendar-picker-indicator,
        input[type="date"]::-webkit-calendar-picker-indicator { opacity:.4; cursor:pointer; filter:invert(1); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(0,152,204,0.26); border-radius:4px; }
        ::placeholder { color:#4a8070 !important; }

        /* ══════════════════════════════════════════════════════════════
           BASE LAYOUT (desktop-first)
           ══════════════════════════════════════════════════════════════ */
        .mp-wrap          { max-width:1300px; margin:0 auto; padding:24px 20px 60px; }
        .mp-main-grid     { display:grid; grid-template-columns:1fr 320px; gap:20px; align-items:start; animation:fadeUp .4s ease .08s both; }
        .mp-left-col      { display:flex; flex-direction:column; gap:16px; min-width:0; }
        .mp-sidebar       { min-width:0; }
        .mp-sidebar-inner { display:flex; flex-direction:column; gap:16px; }

        /* ── Hero ── */
        .mp-hero          { background:linear-gradient(135deg,#071e12 0%,#0a2a18 50%,#062117 100%); border:1px solid rgba(0,152,204,0.14); border-radius:16px; padding:28px 28px 24px; margin-bottom:20px; animation:fadeUp .3s ease both; }
        .mp-hero-row      { display:flex; flex-wrap:wrap; align-items:center; gap:20px; justify-content:space-between; }
        .mp-hero-left     { display:flex; align-items:center; gap:18px; min-width:0; flex:1; }
        .mp-hero-info     { min-width:0; flex:1; }
        .mp-hero-badges   { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:6px; align-items:center; }
        .mp-hero-name     { font-size:clamp(16px,2.5vw,24px); font-weight:800; color:#e8f5f0; margin:0 0 3px; line-height:1.2; word-break:break-word; }
        .mp-hero-role     { font-size:13px; color:#8fbfb0; margin:0 0 8px; font-weight:500; word-break:break-word; }
        .mp-hero-meta     { display:flex; flex-wrap:wrap; gap:10px; }
        .mp-hero-meta-item{ font-size:11.5px; color:#4a8070; display:flex; align-items:center; gap:4px; min-width:0; }
        .mp-hero-photo    { width:72px; height:72px; border-radius:14px; object-fit:cover; border:2px solid rgba(0,152,204,0.26); display:block; flex-shrink:0; }
        .mp-hero-initials { width:72px; height:72px; border-radius:14px; background:rgba(0,152,204,0.12); border:2px solid rgba(0,152,204,0.26); display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:800; color:#0098cc; flex-shrink:0; }
        .mp-hero-stats    { display:flex; gap:8px; flex-wrap:wrap; align-items:center; flex-shrink:0; }
        .mp-stat-box      { background:rgba(0,152,204,0.12); border:1px solid rgba(0,152,204,0.26); border-radius:10px; padding:10px 14px; text-align:center; min-width:66px; }
        .mp-stat-rate     { background:rgba(0,152,204,0.12); border:1px solid rgba(0,152,204,0.26); border-radius:10px; padding:10px 16px; display:flex; align-items:baseline; gap:5px; }
        .mp-edit-btn      { background:#0098cc; border:none; border-radius:10px; padding:10px 16px; font-size:12px; font-weight:700; color:#fff; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; font-family:inherit; }

        /* ── Section cards ── */
        .mp-card-header   { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:18px 22px; border-bottom:1px solid rgba(0,152,204,0.14); }
        .mp-card-body     { padding:18px 22px; }
        .mp-card-subtitle { display:block; }
        .mp-card-edit-btn { }
        .mp-pending-body  { padding:12px 20px; }

        /* ── Detail items grid ── */
        .mp-detail-grid   { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:14px; }

        /* ── Documents grid ── */
        .mp-docs-grid     { display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:8px; }

        /* ── Tag input row ── */
        .mp-tag-input-row { display:flex; gap:8px; margin-top:8px; }

        /* ── Modal ── */
        .mp-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.75); z-index:50; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px; }
        .mp-modal         { background:#0a2d1e; width:100%; max-width:760px; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 24px 80px rgba(0,0,0,0.6); border:1px solid rgba(0,152,204,0.26); border-radius:16px; }
        .mp-modal-header  { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid rgba(0,152,204,0.14); flex-shrink:0; }
        .mp-modal-body    { display:flex; flex-direction:row; flex:1; min-height:0; }
        .mp-modal-content { flex:1; overflow-y:auto; padding:20px; }
        .mp-modal-footer  { display:flex; gap:8px; padding:14px 20px; border-top:1px solid rgba(0,152,204,0.14); background:rgba(0,0,0,0.2); flex-shrink:0; justify-content:space-between; align-items:center; flex-wrap:wrap; }
        .mp-footer-actions{ display:flex; gap:8px; flex-wrap:wrap; }
        .mp-nav           { background:rgba(0,0,0,0.2); border-right:1px solid rgba(0,152,204,0.14); width:176px; flex-shrink:0; overflow-y:auto; }
        .mp-nav nav       { display:flex; flex-direction:column; gap:4px; padding:12px; overflow-x:visible; }
        .mp-nav nav::-webkit-scrollbar { display:none; }
        .mp-nav-label     { display:inline; }
        .mp-cancel-btn    { }

        /* ── Form grids inside modal ── */
        .mp-form-grid     { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px; }
        .mp-contact-grid  { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .mp-format-grid   { display:grid; grid-template-columns:repeat(auto-fill,minmax(155px,1fr)); gap:8px; }
        .mp-guidance-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(155px,1fr)); gap:8px; margin-bottom:8px; }

        /* ── Avail row ── */
        .mp-avail-row     { display:flex; flex-wrap:wrap; gap:10px; align-items:flex-end; }
        .mp-avail-field   { min-width:0; }
        .mp-avail-add-btn { }

        /* ── Quick stats grid ── */
        .mp-quick-stats   { display:flex; flex-direction:column; gap:10px; }


        /* ══════════════════════════════════════════════════════════════
           ≤ 1199px — small laptop
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:1199px) {
          .mp-main-grid   { grid-template-columns:1fr 290px; gap:16px; }
          .mp-wrap         { padding:22px 18px 56px; }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 1024px — tablet landscape / small laptop
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:1024px) {
          .mp-main-grid   { grid-template-columns:1fr 260px; gap:14px; }
          .mp-wrap         { padding:18px 16px 50px; }
          .mp-card-header  { padding:16px 18px; }
          .mp-card-body    { padding:16px 18px; }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 900px — tablet portrait → single column
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:900px) {
          .mp-wrap           { padding:16px 16px 48px; }
          .mp-main-grid      { grid-template-columns:1fr; gap:14px; }
          .mp-sidebar        { order:-1; }
          .mp-sidebar-inner  { display:grid !important; grid-template-columns:repeat(2,1fr); gap:14px; }
          .mp-hero           { padding:22px 20px 18px; border-radius:14px; margin-bottom:16px; }
          .mp-card-header    { padding:16px 18px; }
          .mp-card-body      { padding:16px 18px; }
          .mp-detail-grid    { grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); }
          .mp-docs-grid      { grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 768px — tablet portrait narrow
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:768px) {
          .mp-wrap           { padding:14px 14px 44px; }
          .mp-hero           { padding:18px 16px 16px; border-radius:13px; margin-bottom:14px; }
          .mp-hero-stats     { width:100%; justify-content:flex-start; }
          .mp-modal          { max-height:95vh; border-radius:16px 16px 0 0; }
          .mp-modal-overlay  { align-items:flex-end; padding:0; }
          .mp-modal-body     { flex-direction:column !important; }
          .mp-nav            { border-right:none !important; border-bottom:1px solid rgba(0,152,204,0.14); width:100% !important; flex-shrink:0; }
          .mp-nav nav        { flex-direction:row !important; padding:10px 14px; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .mp-avail-row      { flex-direction:column; align-items:stretch; }
          .mp-avail-field    { width:100%; }
          .mp-avail-field input { width:100% !important; box-sizing:border-box; }
          .mp-avail-add-btn  { width:auto !important; align-self:flex-start; }
          .mp-contact-grid   { grid-template-columns:1fr; }
          .mp-form-grid      { grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 600px — large phone
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:600px) {
          .mp-wrap           { padding:12px 12px 40px; }
          .mp-hero           { padding:16px 14px 14px; border-radius:12px; margin-bottom:12px; }
          .mp-hero-row       { gap:14px; }
          .mp-hero-left      { gap:11px; }
          .mp-hero-meta      { gap:8px; }
          .mp-hero-meta-item { font-size:11px; }
          .mp-hero-stats     { gap:6px; width:100%; }
          .mp-stat-box       { min-width:0; padding:8px 10px; flex:1; }
          .mp-stat-rate      { padding:8px 12px; flex:1; }
          .mp-edit-btn       { padding:9px 14px; font-size:11px; width:100%; justify-content:center; }
          .mp-sidebar-inner  { grid-template-columns:1fr !important; }
          .mp-card-header    { padding:14px 16px; flex-wrap:wrap; gap:10px; }
          .mp-card-body      { padding:14px 16px; }
          .mp-card-subtitle  { display:none; }
          .mp-card-edit-btn  { padding:6px 10px !important; font-size:11px !important; }
          .mp-modal          { max-height:96vh; }
          .mp-modal-header   { padding:14px 16px; }
          .mp-modal-footer   { padding:12px 14px; }
          .mp-modal-content  { padding:16px 14px; }
          .mp-nav-label      { display:none; }
          .mp-nav nav        { gap:4px; padding:8px 10px; justify-content:space-around; }
          .mp-footer-actions button { flex:1; justify-content:center; }
          .mp-pending-body   { padding:12px 14px; }
          .mp-detail-grid    { grid-template-columns:repeat(2,1fr); gap:10px; }
          .mp-docs-grid      { grid-template-columns:1fr; }
          .mp-form-grid      { grid-template-columns:1fr; }
          .mp-format-grid    { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }
          .mp-guidance-grid  { grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); }
          .mp-tag-input-row  { flex-direction:column; gap:6px; }
          .mp-tag-input-row button { width:100%; text-align:center; justify-content:center; display:flex; }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 480px — small phone
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:480px) {
          .mp-wrap           { padding:10px 10px 36px; }
          .mp-hero           { padding:14px 12px 12px; border-radius:11px; margin-bottom:10px; }
          .mp-hero-row       { flex-direction:column; align-items:stretch; gap:12px; }
          .mp-hero-left      { gap:10px; }
          .mp-hero-photo     { width:56px !important; height:56px !important; border-radius:10px !important; }
          .mp-hero-initials  { width:56px !important; height:56px !important; border-radius:10px !important; font-size:18px !important; }
          .mp-hero-name      { font-size:16px !important; }
          .mp-hero-stats     { flex-direction:row; justify-content:space-between; }
          .mp-card-header    { padding:12px 14px; gap:8px; }
          .mp-card-body      { padding:12px 14px; }
          .mp-card-icon      { width:28px !important; height:28px !important; }
          .mp-card-icon svg  { width:13px !important; height:13px !important; }
          .mp-modal-footer   { flex-direction:column; align-items:stretch; gap:6px; padding:10px 12px; }
          .mp-cancel-btn     { order:3 !important; }
          .mp-footer-actions { order:1; flex-direction:column; width:100%; }
          .mp-footer-actions button { width:100% !important; justify-content:center; }
          .mp-modal-content  { padding:14px 12px; }
          .mp-modal-header   { padding:12px 14px; }
          .mp-nav nav        { padding:6px 8px; gap:2px; }
          .mp-pending-body   { padding:10px 12px; }
          .mp-detail-grid    { grid-template-columns:1fr 1fr; gap:8px; }
          .mp-session-card   { padding:8px 10px !important; gap:8px !important; }
          .mp-session-date   { width:36px !important; padding:3px !important; }
          .mp-quick-stats    { gap:8px; }
        }

        /* ══════════════════════════════════════════════════════════════
           ≤ 360px — tiny phone
           ══════════════════════════════════════════════════════════════ */
        @media (max-width:360px) {
          .mp-wrap           { padding:8px 8px 32px; }
          .mp-hero           { padding:12px 10px 10px; }
          .mp-hero-name      { font-size:15px !important; }
          .mp-hero-role      { font-size:12px !important; }
          .mp-hero-badges    { gap:3px; }
          .mp-hero-badges span { font-size:8px !important; padding:1px 6px !important; }
          .mp-card-header    { padding:10px 12px; }
          .mp-card-body      { padding:10px 12px; }
          .mp-card-header h2 { font-size:13px !important; }
          .mp-modal-content  { padding:12px 10px; }
          .mp-stat-box       { padding:6px 8px; }
          .mp-stat-box div:first-child { font-size:14px !important; }
          .mp-stat-rate      { padding:6px 8px; }
          .mp-stat-rate span:first-child { font-size:16px !important; }
          .mp-detail-grid    { grid-template-columns:1fr; gap:10px; }
          .mp-pending-body   { padding:8px 10px; }
          .mp-hero-photo     { width:48px !important; height:48px !important; }
          .mp-hero-initials  { width:48px !important; height:48px !important; font-size:16px !important; }
        }
      `}</style>

      <div style={{ fontFamily: F, minHeight: '100vh', background: '#062117', color: '#e8f5f0' }}>
        <div className="mp-wrap">

          {/* Hero */}
          <div className="mp-hero">
            <div className="mp-hero-row">
              <div className="mp-hero-left">
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto} alt={formData.fullName}
                      className="mp-hero-photo"
                      onError={e => e.target.style.display = 'none'}
                    />
                  ) : (
                    <div className="mp-hero-initials" style={{ fontFamily: F }}>{initials}</div>
                  )}
                  {formData.status === 'approved' && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#22c55e', border: '2px solid #062117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={10} color="#fff" />
                    </div>
                  )}
                </div>
                <div className="mp-hero-info">
                  <div className="mp-hero-badges">
                    {formData.mentorCategory && (
                      <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: '#0098cc', textTransform: 'uppercase', letterSpacing: '.5px', background: 'rgba(0,152,204,0.12)', border: '1px solid rgba(0,152,204,0.26)', padding: '2px 9px', borderRadius: 20 }}>
                        {formData.mentorCategory}
                      </span>
                    )}
                    <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: '#e8a020', background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)', padding: '2px 9px', borderRadius: 20 }}>
                      ★ {formData.rating || '5.0'}
                    </span>
                    {formData.status === 'approved' && (
                      <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 9px', borderRadius: 20 }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <h1 className="mp-hero-name" style={{ fontFamily: F }}>
                    {formData.fullName || <span style={{ color: '#4a8070', fontStyle: 'italic', fontWeight: 500 }}>No name added</span>}
                  </h1>
                  <p className="mp-hero-role" style={{ fontFamily: F }}>
                    {formData.currentRole || 'Mentor'}
                    {formData.companyName && <span style={{ color: '#4a8070' }}> · {formData.companyName}</span>}
                  </p>
                  <div className="mp-hero-meta">
                    {formData.location && <span className="mp-hero-meta-item" style={{ fontFamily: F }}><MapPin size={11} />{formData.location}</span>}
                    {formData.email && <span className="mp-hero-meta-item" style={{ fontFamily: F }}><Mail size={11} />{formData.email}</span>}
                    {formData.createdAt && <span className="mp-hero-meta-item" style={{ fontFamily: F, fontSize: 11 }}><Clock size={10} />Since {fmtDate(formData.createdAt)}</span>}
                  </div>
                </div>
              </div>
              <div className="mp-hero-stats">
                <div className="mp-stat-box">
                  <div style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: '#e8f5f0', lineHeight: 1 }}>{formData.yearsOfExperience || 0}yr</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: '#4a8070', marginTop: 3, fontWeight: 600 }}>Exp.</div>
                </div>
                <div className="mp-stat-rate">
                  <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#0098cc' }}>₹{(formData.hourlyRate || 0).toLocaleString()}</span>
                  <span style={{ fontFamily: F, fontSize: 11, color: '#4a8070' }}>{formData.sessionDuration || '/hr'}</span>
                </div>
                <button className="mp-edit-btn" style={{ fontFamily: F }} onClick={() => handleEdit('overview')}>
                  <Edit size={13} />Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="mp-main-grid">

            {/* LEFT */}
            <div className="mp-left-col">

              {/* Profile Overview */}
              <SectionCard
                title="Profile Overview" subtitle="Visible to potential mentees."
                icon={Award} onEdit={() => handleEdit('overview')} isSaving={isSaving}
              >
                {bio && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>About</p>
                    <p style={{ fontFamily: F, fontSize: 13, color: '#8fbfb0', lineHeight: 1.8, margin: 0, wordBreak: 'break-word' }}>{bio}</p>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: skills.length ? 18 : 0 }}>
                  {formData.email && <InfoRow icon={Mail}>{formData.email}</InfoRow>}
                  {formData.phone && <InfoRow icon={Phone}>{formData.phone}</InfoRow>}
                  {formData.location && <InfoRow icon={MapPin}>{formData.location}</InfoRow>}
                  {formData.linkedinUrl && <InfoRow icon={Globe} href={formData.linkedinUrl}>LinkedIn Profile</InfoRow>}
                </div>
                {skills.length > 0 && (
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Specialisations & Domains</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {skills.map((s, i) => <TagPill key={i} label={s} />)}
                    </div>
                  </div>
                )}
                {!bio && !skills.length && !formData.email && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <p style={{ fontFamily: F, fontSize: 13, color: '#4a8070', margin: '0 0 10px' }}>No profile info added yet.</p>
                    <button onClick={() => handleEdit('overview')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#0098cc', background: 'none', border: 'none', cursor: 'pointer' }}>Complete Your Profile →</button>
                  </div>
                )}
              </SectionCard>

              {/* Professional Background */}
              <SectionCard
                title="Professional Background" icon={Briefcase}
                onEdit={() => handleEdit('experience')} isSaving={isSaving}
                emptyState={detailItems.length === 0 ? { message: 'No professional background added.', cta: 'Add Details →' } : null}
              >
                {detailItems.length > 0 && (
                  <div className="mp-detail-grid">
                    {detailItems.map((item, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 4px' }}>{item.label}</p>
                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: '#e8f5f0', margin: 0, wordBreak: 'break-word' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Engagement */}
              <SectionCard title="Engagement Information" icon={MessageCircle} onEdit={() => handleEdit('engagement')} isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {fmts.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Mentorship Format</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{fmts.map((f, i) => <TagPill key={i} label={f} />)}</div>
                    </div>
                  )}
                  {langs.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Languages Spoken</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{langs.map((l, i) => <TagPill key={i} label={l} col="amber" />)}</div>
                    </div>
                  )}
                  {guidAreas.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Areas of Guidance</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{guidAreas.map((g, i) => <TagPill key={i} label={g} col="teal" />)}</div>
                    </div>
                  )}
                  {(formData.calendarLink || formData.platformMessaging) && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Booking</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {formData.calendarLink && <InfoRow icon={Calendar} href={formData.calendarLink}>Book a Session</InfoRow>}
                        {formData.platformMessaging && <InfoRow icon={MessageCircle}>{formData.platformMessaging}</InfoRow>}
                      </div>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Availability</p>
                    <AvailPanel availability={formData.availability} isEditing={false} setFormData={setFormData} />
                  </div>
                  {!fmts.length && !langs.length && !guidAreas.length && !formData.calendarLink && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: '#4a8070', margin: '0 0 10px' }}>No engagement details added.</p>
                      <button onClick={() => handleEdit('engagement')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#0098cc', background: 'none', border: 'none', cursor: 'pointer' }}>Add Engagement Info →</button>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Achievements */}
              <SectionCard title="Achievements & Credentials" icon={Trophy} onEdit={() => handleEdit('achievements')} isSaving={isSaving}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {accomps.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>Key Accomplishments</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {accomps.map((a, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.18)', borderRadius: 9 }}>
                            <Trophy size={13} color="#e8a020" style={{ flexShrink: 0, marginTop: 1 }} />
                            <span style={{ fontFamily: F, fontSize: 12.5, color: '#8fbfb0', wordBreak: 'break-word' }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {certs.length > 0 && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Certifications / Licenses</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{certs.map((c, i) => <TagPill key={i} label={c} col="purple" />)}</div>
                    </div>
                  )}
                  {(formData.resumeLink || formData.portfolioLink || formData.videoLink) && (
                    <div>
                      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: '#4a8070', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 8px' }}>Documents & Media</p>
                      <div className="mp-docs-grid">
                        {[
                          { label: 'Resume / CV', field: 'resumeLink', icon: FileText },
                          { label: 'Portfolio', field: 'portfolioLink', icon: BookOpen },
                          { label: 'Intro Video', field: 'videoLink', icon: Eye },
                        ].filter(d => formData[d.field]).map(({ label, field, icon: Icon }) => (
                          <a
                            key={field} href={formData[field]} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(0,152,204,0.14)', borderRadius: 9, textDecoration: 'none', minWidth: 0 }}
                          >
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(0,152,204,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon size={12} color="#0098cc" />
                            </div>
                            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: '#8fbfb0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
                            <ExternalLink size={10} color="#4a8070" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {!accomps.length && !certs.length && !formData.resumeLink && (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <p style={{ fontFamily: F, fontSize: 13, color: '#4a8070', margin: '0 0 10px' }}>No achievements added yet.</p>
                      <button onClick={() => handleEdit('achievements')} style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#0098cc', background: 'none', border: 'none', cursor: 'pointer' }}>Add Achievements →</button>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="mp-sidebar">
              <div className="mp-sidebar-inner">

                {/* Completion */}
                <div style={{ background: '#0a2d1e', borderRadius: 16, border: '1px solid rgba(0,152,204,0.14)', padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: '#e8f5f0', margin: 0 }}>Profile Completion</h3>
                    <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: completionPct === 100 ? '#22c55e' : '#0098cc' }}>{completionPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
                    <div style={{
                      height: 6, borderRadius: 100, width: `${completionPct}%`,
                      background: completionPct === 100 ? '#22c55e' : 'linear-gradient(90deg,#0098cc,#22d3ee)',
                      transition: 'width .7s ease'
                    }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {completionSteps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {step.completed
                          ? <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                          : <Circle size={16} color="rgba(0,152,204,0.26)" style={{ flexShrink: 0 }} />
                        }
                        <span style={{ fontFamily: F, fontSize: 12.5, color: step.completed ? '#8fbfb0' : '#4a8070', fontWeight: step.completed ? 600 : 500 }}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {completionPct < 100 ? (
                    <button
                      onClick={() => handleEdit('overview')}
                      style={{ width: '100%', marginTop: 16, fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff', background: '#0098cc', border: 'none', borderRadius: 9, padding: 10, cursor: 'pointer' }}
                    >Complete Your Profile</button>
                  ) : (
                    <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckCircle size={16} color="#22c55e" />
                      <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: '#22c55e' }}>Profile Complete!</span>
                    </div>
                  )}
                </div>

                {completionPct < 100 && <PendingDetailsCard mentorData={formData} onEdit={() => handleEdit('overview')} />}

                {/* Quick Stats */}
                <div style={{ background: '#0a2d1e', borderRadius: 16, border: '1px solid rgba(0,152,204,0.14)', padding: 20 }}>
                  <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: '#e8f5f0', margin: '0 0 14px' }}>Quick Stats</h3>
                  <div className="mp-quick-stats">
                    {[
                      { label: 'Completed Sessions', value: formData.completedBookings || 0, icon: TrendingUp, col: '#0098cc' },
                      { label: 'Total Mentees', value: formData.totalMentees || 0, icon: Users, col: '#22c55e' },
                      { label: 'Rating', value: `${formData.rating || '5.0'} ★`, icon: Star, col: '#e8a020' },
                      { label: 'Upcoming Sessions', value: allFlat.filter(s => !s.isBooked).length, icon: Calendar, col: '#0098cc' },
                    ].map(({ label, value, icon: Icon, col }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 9, border: '1px solid rgba(0,152,204,0.14)' }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}22`, border: `1px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={14} color={col} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: F, fontSize: 10, color: '#4a8070', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px' }}>{label}</div>
                          <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: '#e8f5f0', lineHeight: 1.2 }}>{value}</div>
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





