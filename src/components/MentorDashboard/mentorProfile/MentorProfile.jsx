import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Star, Heart, Share2,
  ChevronDown, ChevronUp, Pencil, Save, X, Plus,
  Trash2, Loader2, Upload, Eye, CheckCircle,
  Clock, Calendar, Briefcase, BookOpen, Award, FileText,
  TrendingUp, Users, DollarSign, Zap, Globe, Phone, Mail,
} from 'lucide-react';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
import { showToast } from '../../../utils/Toastprovider';

const CYAN = '#0098cc';
const DARK = '#062117';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };
const TABS = ['Overview', 'Case Studies', 'Mentorship Topics', 'Experience'];
const FONT = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;

const formatDate = (ds) => {
  if (!ds) return 'N/A';
  return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Tick = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6.5L4.5 9.5L10 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckBox = ({ checked, indeterminate, size = 20, onClick }) => {
  const active = checked || indeterminate;
  return (
    <span onClick={e => { e.stopPropagation(); onClick?.(); }} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, cursor: 'pointer', width: size, height: size,
      borderRadius: Math.round(size * 0.25),
      border: `2px solid ${active ? CYAN : '#c5d5dd'}`,
      background: active ? CYAN : '#f8fafc',
      transition: 'all 0.15s',
    }}>
      {indeterminate && !checked
        ? <span style={{ width: size * 0.45, height: 2, background: '#fff', borderRadius: 2, display: 'block' }} />
        : checked ? <Tick size={size * 0.6} /> : null}
    </span>
  );
};

const EditField = ({ value, onChange, placeholder, multiline, type = 'text' }) => {
  const base = {
    fontFamily: FONT, width: '100%', padding: '10px 14px',
    border: '1.5px solid #d1dde3', borderRadius: 8,
    fontSize: 14, color: '#1a2e3b', background: '#fff',
    outline: 'none', boxSizing: 'border-box', lineHeight: 1.5,
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4} style={{ ...base, resize: 'none' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Pill = ({ label }) => (
  <span style={{
    fontFamily: FONT, display: 'inline-flex', alignItems: 'center',
    padding: '5px 14px', borderRadius: 20,
    fontSize: 13, fontWeight: 500,
    background: `${CYAN}12`, border: `1px solid ${CYAN}30`, color: '#006a8e',
  }}>{label}</span>
);

const StatCard = ({ icon, label, value, accent }) => (
  <div style={{
    background: '#f8fbfd', border: '1px solid #e2eef3',
    borderRadius: 10, padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    <div style={{
      width: 42, height: 42, borderRadius: 9, flexShrink: 0,
      background: accent ? `${accent}15` : `${CYAN}12`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {React.cloneElement(icon, { size: 19, color: accent || CYAN })}
    </div>
    <div>
      <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 3px' }}>{label}</p>
      <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: '#0f2030', margin: 0, lineHeight: 1 }}>{value}</p>
    </div>
  </div>
);

const SectionHead = ({ children }) => (
  <h2 style={{
    fontFamily: FONT, fontSize: 16, fontWeight: 700, color: '#0f2030',
    margin: '0 0 18px', paddingBottom: 12,
    borderBottom: '2px solid #f0f5f8',
    display: 'flex', alignItems: 'center', gap: 9,
  }}>{children}</h2>
);

const InfoCard = ({ label, value, isEditing, field, formData, set, type }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{label}</p>
    {isEditing
      ? <EditField type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} />
      : <p style={{
        fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#1e3a4a',
        padding: '10px 14px', background: '#f8fbfd',
        border: '1px solid #e8f0f4', borderRadius: 8,
        minHeight: 42, display: 'flex', alignItems: 'center', margin: 0,
      }}>
        {formData[field] || '—'}
      </p>
    }
  </div>
);

const ContactRow = ({ icon, value }) => (
  value ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 7, background: '#f0f5f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {React.cloneElement(icon, { size: 15, color: '#8aa0ad' })}
      </div>
      <span style={{ fontFamily: FONT, fontSize: 13, color: '#4a6b7a', fontWeight: 500 }}>{value}</span>
    </div>
  ) : null
);

// ─── Weekly Availability ──────────────────────────────────────
const WeeklyAvailability = ({ availability, isEditing, addSlot, removeSlot, updateSlot, setFormData }) => {
  const [enabled, setEnabled] = useState(() =>
    DAYS.reduce((acc, d) => {
      acc[d] = !!(availability?.find(a => a.day === d)?.slots?.length);
      return acc;
    }, {})
  );

  const enabledDays = DAYS.filter(d => enabled[d]);
  const allEnabled = enabledDays.length === DAYS.length;
  const someEnabled = enabledDays.length > 0 && !allEnabled;

  const toggleDay = (day) => {
    if (!isEditing) return;
    const di = DAYS.indexOf(day);
    const next = !enabled[day];
    setEnabled(p => ({ ...p, [day]: next }));
    if (!next) {
      setFormData(p => { const a = [...p.availability]; a[di] = { ...a[di], slots: [] }; return { ...p, availability: a }; });
    } else if (!availability?.[di]?.slots?.length) { addSlot(di); }
  };

  const toggleAll = () => {
    if (!isEditing) return;
    const next = !allEnabled;
    setEnabled(DAYS.reduce((acc, d) => { acc[d] = next; return acc; }, {}));
    if (!next) {
      setFormData(p => ({ ...p, availability: p.availability.map(d => ({ ...d, slots: [] })) }));
    } else {
      DAYS.forEach((day, di) => { if (!availability?.[di]?.slots?.length) addSlot(di); });
    }
  };

  return (
    <div>
      {isEditing && (
        <div onClick={toggleAll} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 18px', marginBottom: 14, cursor: 'pointer', userSelect: 'none',
          border: `1.5px solid ${allEnabled ? CYAN : someEnabled ? `${CYAN}55` : '#e2eef3'}`,
          borderRadius: 10, background: allEnabled ? `${CYAN}08` : '#f8fbfd',
          transition: 'all 0.15s',
        }}>
          <CheckBox checked={allEnabled} indeterminate={someEnabled} size={22} onClick={toggleAll} />
          <Calendar size={15} color={CYAN} />
          <span style={{ fontFamily: FONT, flex: 1, fontWeight: 700, fontSize: 14, color: '#0f2030' }}>
            Select All Days
            <span style={{ fontWeight: 400, fontSize: 12, color: '#8aa0ad', marginLeft: 8 }}>(Monday – Sunday)</span>
          </span>
          <span style={{
            fontFamily: FONT, padding: '4px 12px', borderRadius: 20,
            fontSize: 11, fontWeight: 700,
            border: `1px solid ${allEnabled || someEnabled ? CYAN : '#c5d5dd'}`,
            background: allEnabled ? CYAN : 'transparent',
            color: allEnabled ? '#fff' : CYAN,
          }}>
            {allEnabled ? '✓ All 7 days' : someEnabled ? `${enabledDays.length} / 7` : 'None'}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 10 }}>
        {availability?.map((day, di) => {
          const isEnabled = enabled[day.day];
          const hasSlots = day.slots?.length > 0;
          return (
            <div key={day.day} style={{
              border: `1px solid ${isEnabled || hasSlots ? `${CYAN}40` : '#e8f0f4'}`,
              borderRadius: 10, overflow: 'hidden',
              opacity: isEditing && !isEnabled ? 0.5 : 1,
              transition: 'all 0.15s',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: isEnabled || hasSlots ? `${CYAN}06` : '#fafcfd',
                borderBottom: hasSlots || (isEditing && isEnabled) ? `1px solid ${CYAN}18` : 'none',
              }}>
                {isEditing && <CheckBox checked={isEnabled} size={18} onClick={() => toggleDay(day.day)} />}
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: isEnabled || hasSlots ? CYAN : '#d1dde3' }} />
                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, flex: 1, color: isEnabled || hasSlots ? '#0f2030' : '#8aa0ad' }}>
                  {day.day}
                </span>
                {hasSlots && (
                  <span style={{ fontFamily: FONT, padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: CYAN, color: '#fff' }}>
                    {day.slots.length} slot{day.slots.length > 1 ? 's' : ''}
                  </span>
                )}
                {isEditing && isEnabled && (
                  <button onClick={() => addSlot(di)} style={{
                    fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 6,
                    border: `1px solid ${CYAN}`, background: 'transparent', color: CYAN, cursor: 'pointer',
                  }}>
                    <Plus size={11} /> Add
                  </button>
                )}
              </div>

              {(hasSlots || (isEditing && isEnabled)) && (
                <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: 7, background: '#fff' }}>
                  {!hasSlots && isEditing && isEnabled && (
                    <span style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', fontStyle: 'italic' }}>Click "Add" to add slots</span>
                  )}
                  {day.slots?.map((slot, si) => (
                    <div key={si} style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      background: isEditing ? '#f8fbfd' : `${CYAN}08`,
                      border: `1px solid ${isEditing ? '#e2eef3' : `${CYAN}25`}`,
                      borderRadius: 8, padding: '7px 11px',
                    }}>
                      <Clock size={12} color={CYAN} />
                      {isEditing ? (
                        <>
                          <input type="time" value={slot.startTime}
                            onChange={e => updateSlot(di, si, 'startTime', e.target.value)}
                            style={{ fontFamily: FONT, fontSize: 13, border: '1px solid #d1dde3', borderRadius: 6, padding: '4px 8px', outline: 'none', color: '#0f2030', background: '#fff' }} />
                          <span style={{ color: CYAN, fontWeight: 700 }}>→</span>
                          <input type="time" value={slot.endTime}
                            onChange={e => updateSlot(di, si, 'endTime', e.target.value)}
                            style={{ fontFamily: FONT, fontSize: 13, border: '1px solid #d1dde3', borderRadius: 6, padding: '4px 8px', outline: 'none', color: '#0f2030', background: '#fff' }} />
                          <button onClick={() => removeSlot(di, si)} style={{
                            background: '#fff0f0', border: '1px solid #fca5a5', color: '#ef4444',
                            borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                          }}><Trash2 size={11} /></button>
                        </>
                      ) : (
                        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#1e3a4a' }}>{slot.startTime} — {slot.endTime}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditing && enabledDays.length > 0 && (
        <div style={{
          marginTop: 12, padding: '10px 16px',
          background: `${CYAN}07`, border: `1px solid ${CYAN}25`,
          borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
          color: '#006a8e', fontFamily: FONT,
        }}>
          <CheckCircle size={14} color={CYAN} />
          <strong>{enabledDays.length}</strong>&nbsp;day{enabledDays.length > 1 ? 's' : ''} active ·&nbsp;
          <strong>{availability?.reduce((n, d) => n + (d.slots?.length || 0), 0)}</strong>&nbsp;total slots
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8aa0ad' }}>{enabledDays.map(d => DAY_SHORT[d]).join(', ')}</span>
        </div>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────
//  MentorProfile — Main Component
// ─────────────────────────────────────────────────────────────
const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);

  const [formData, setFormData] = useState({
    availability: DAYS.map(d => ({ day: d, slots: [] })),
  });
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

  const resumeRef = useRef(null);
  const portfolioRef = useRef(null);
  const videoRef = useRef(null);

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

  useEffect(() => {
    const ud = localStorage.getItem('userData');
    if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
  }, []);

  useEffect(() => { if (email) getMentorDetails(email); }, [email, getMentorDetails]);

  useEffect(() => {
    if (data?.data) {
      const merged = DAYS.map(d => {
        const ex = data.data.availability?.find(a => a.day === d);
        return { day: d, slots: ex?.slots || [] };
      });
      setFormData({ ...data.data, availability: merged });
    }
  }, [data]);

  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const handleSave = async () => {
    try {
      await updateMentorDetails({ email, ...formData }).unwrap();
      await getMentorDetails(email);
      setIsEditing(false);
      setFiles({ resume: null, portfolio: null, video: null });
      showToast('Profile updated successfully!', 'success');
    } catch {
      showToast('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    if (data?.data) {
      const merged = DAYS.map(d => {
        const ex = data.data.availability?.find(a => a.day === d);
        return { day: d, slots: ex?.slots || [] };
      });
      setFormData({ ...data.data, availability: merged });
    }
    setFiles({ resume: null, portfolio: null, video: null });
    setIsEditing(false);
  };

  const addSlot = (di) => setFormData(p => {
    const a = [...p.availability];
    a[di] = {
      ...a[di],
      slots: [...(a[di].slots || []), { startTime: '09:00', endTime: '09:30', isBooked: false }]
    };
    return { ...p, availability: a };
  }); const removeSlot = (di, si) => setFormData(p => { const a = [...p.availability]; a[di].slots = a[di].slots.filter((_, i) => i !== si); return { ...p, availability: a }; });
  const updateSlot = (di, si, f, v) => setFormData(p => { const a = [...p.availability]; a[di].slots[si][f] = v; return { ...p, availability: a }; });

  const skills = formData.currentSkills ? formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const areas = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean) : [];
  const bio = formData.whyMentor || '';
  const bioShort = bio.length > 180 ? bio.slice(0, 180) + '…' : bio;

  if (isLoading) return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '56px 64px', textAlign: 'center', border: '1px solid #e2eef3' }}>
        <Loader2 size={36} style={{ color: CYAN, animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: '#8aa0ad', fontSize: 15, margin: 0 }}>Loading profile…</p>
      </div>
    </div>
  );

  if (error || !formData || Object.keys(formData).length < 2) return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '56px 64px', textAlign: 'center', border: '1px solid #e2eef3' }}>
        <X size={36} style={{ color: '#f87171', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: '#8aa0ad', fontSize: 15, margin: 0 }}>Failed to load profile. Please refresh.</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { font-family:${FONT}; -webkit-font-smoothing:antialiased; box-sizing:border-box; }
        input[type="time"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#f3f7fa; }
        ::-webkit-scrollbar-thumb { background:#c5d5dd; border-radius:4px; }
        .tab-btn:hover { color:#0f2030 !important; }
        .edit-btn:hover { opacity:0.85; }
        textarea::placeholder, input::placeholder { color:#a0b4bd; }
      `}</style>

      <div style={{ fontFamily: FONT, minHeight: '100vh', background: '#f3f7fa', display: 'flex', flexDirection: 'column' }}>

        {/* ══ BANNER ══════════════════════════════════════════════ */}
        <div style={{
          height: 140, position: 'relative', overflow: 'hidden', flexShrink: 0,
          background: `linear-gradient(135deg, ${DARK} 0%, #0d3a52 55%, #063550 100%)`,
        }}>
          {/* {[['-8%','62%',210],['18%','82%',115],['58%','-4%',155],['72%','42%',88]].map(([t,l,s],i) => (
            <div key={i} style={{
              position:'absolute', top:t, left:l, width:s, height:s,
              borderRadius:'50%', border:'1.5px solid rgba(0,152,204,0.14)', pointerEvents:'none',
            }} />
          ))} */}
          <div style={{ position: 'absolute', top: 20, right: 22, display: 'flex', gap: 10, zIndex: 10 }}>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn" style={{
                fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                padding: '10px 22px', borderRadius: 8,
                border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                <Pencil size={15} /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleSave} disabled={isUpdating} className="edit-btn" style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 22px', borderRadius: 8, border: 'none', background: CYAN,
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: isUpdating ? 0.6 : 1,
                }}>
                  {isUpdating ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
                  {isUpdating ? 'Saving…' : 'Save Changes'}
                </button>
                <button onClick={handleCancel} disabled={isUpdating} style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', borderRadius: 8,
                  border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>
                  <X size={15} /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* ══ AVATAR ══════════════════════════════════════════════ */}
        <div style={{ padding: '0 28px', marginTop: -56, position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{
            width: 108, height: 108, borderRadius: '50%',
            border: '4px solid #f3f7fa', background: `linear-gradient(135deg,${CYAN}25,${DARK}25)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 38, fontWeight: 700, color: CYAN,
          }}>
            {formData.fullName?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>

        {/* ══ BODY ════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <aside style={{
            width: 308, flexShrink: 0, background: '#fff',
            borderRight: '1px solid #e8f0f4',
            padding: '18px 22px 40px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>

            {/* Name / Role */}
            <div style={{ marginTop: 8 }}>
              {isEditing
                ? <div style={{ marginBottom: 8 }}><EditField value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} placeholder="Current Role" /></div>
                : <p style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad', fontWeight: 500, margin: '0 0 4px' }}>{formData.currentRole || 'Mentor'}</p>
              }
              {isEditing
                ? <EditField value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" />
                : <h1 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: '#0f2030', lineHeight: 1.2, margin: 0 }}>{formData.fullName || 'Your Name'}</h1>
              }
              {formData.companyName && !isEditing && (
                <p style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad', margin: '4px 0 0' }}>{formData.companyName}</p>
              )}
              <p style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', margin: '5px 0 0' }}>Member since {formatDate(formData.createdAt)}</p>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} fill={CYAN} style={{ color: CYAN }} />
              <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: '#0f2030' }}>{formData.rating || '0.0'}</span>
              <span style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad' }}>({formData.reviewCount || 0} reviews)</span>
            </div>

            {/* Contact info */}
            {!isEditing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ContactRow icon={<MapPin />} value={formData.location} />
                <ContactRow icon={<Mail />} value={formData.email} />
                <ContactRow icon={<Phone />} value={formData.phone} />
              </div>
            )}
            {isEditing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <EditField value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="Location" />
                <EditField value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="Phone number" />
              </div>
            )}

            <div style={{ height: 1, background: '#e8f0f4' }} />

            {/* Stats 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <StatCard icon={<TrendingUp />} label="Sessions" value={formData.completedBookings || 0} />
              <StatCard icon={<Users />} label="Mentees" value={formData.totalMentees || 0} />
              {/* <StatCard icon={} label="Earned" value={`${formData.totalEarnings || '0'}`} accent="#16a34a" /> */}
              <StatCard icon={<Clock />} label="Exp. Yrs" value={formData.yearsOfExperience || '—'} accent="#7c3aed" />
            </div>

            {/* Bio snippet */}
            <div>
              <p style={{ fontFamily: FONT, fontSize: 13, color: '#4a6b7a', lineHeight: 1.75, margin: 0 }}>
                {showMore ? bio : bioShort}
              </p>
              {bio.length > 180 && (
                <button onClick={() => setShowMore(!showMore)} style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4,
                  marginTop: 6, fontSize: 12, fontWeight: 600,
                  color: CYAN, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                  {showMore ? <><ChevronUp size={12} />Show less</> : <><ChevronDown size={12} />Show more</>}
                </button>
              )}
            </div>

            <div style={{ height: 1, background: '#e8f0f4' }} />

            {/* Rate card */}
            <div style={{ borderRadius: 12, padding: '18px 20px', background: DARK, color: '#fff' }}>
              <p style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px' }}>Hourly Rate</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700 }}>₹{formData.hourlyRate || '0'}</span>
                {isEditing
                  ? <input value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)} placeholder="e.g. 45-min" style={{ fontFamily: FONT, fontSize: 13, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '5px 10px', color: '#fff', outline: 'none', width: 100 }} />
                  : <span style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{formData.sessionDuration || 'per session'}</span>
                }
              </div>
              {/* <button style={{ fontFamily: FONT, width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: CYAN, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Contact Me
              </button> */}
            </div>

            {/* Actions */}
            {/* <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setLiked(!liked)} style={{ fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: liked ? '#f87171' : '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Heart size={14} fill={liked ? '#f87171' : 'none'} />{liked ? 'Saved' : 'Save'}
              </button>
              <button style={{ fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Share2 size={14} />Share
              </button>
            </div> */}

            {/* LinkedIn */}
            <div style={{ borderTop: '1px solid #e8f0f4', paddingTop: 14 }}>
              {isEditing ? (
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 6px' }}>LinkedIn URL</p>
                  <EditField value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" />
                </div>
              ) : formData.linkedinUrl ? (
                <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: CYAN, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                  <Globe size={14} /> View LinkedIn Profile
                </a>
              ) : null}
            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────────── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: 0 }}>

            {/* Tab strip */}
            <div style={{
              borderBottom: '1px solid #e8f0f4', background: '#fff',
              padding: '0 28px', position: 'sticky', top: 0, zIndex: 10,
              display: 'flex', overflowX: 'auto',
            }}>
              {TABS.map(tab => (
                <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)} style={{
                  fontFamily: FONT, padding: '15px 22px',
                  fontSize: 14, fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? '#0f2030' : '#8aa0ad',
                  borderBottomWidth: 2.5, borderBottomStyle: 'solid',
                  borderBottomColor: activeTab === tab ? CYAN : 'transparent',
                  background: 'none', border: 'none',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', marginBottom: -1,
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: '30px 32px 60px', animation: 'fadeUp 0.25s ease both' }}>

              {/* ── OVERVIEW ──────────────────────────────────────── */}
              {activeTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 820 }}>
                  <section>
                    <SectionHead><Award size={17} color={CYAN} />About <span style={{ color: CYAN }}>{formData.fullName || 'Mentor'}</span></SectionHead>
                    {isEditing
                      ? <EditField value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey and mentoring goals…" multiline />
                      : <p style={{ fontFamily: FONT, fontSize: 14, color: '#4a6b7a', lineHeight: 1.85, margin: 0 }}>
                        {formData.whyMentor || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>No bio provided.</span>}
                      </p>
                    }
                  </section>

                  <section>
                    <SectionHead><BookOpen size={17} color={CYAN} />Mentorship Expertise</SectionHead>
                    {isEditing
                      ? <EditField value={formData.currentSkills || ''} onChange={e => set('currentSkills', e.target.value)} placeholder="React, Node.js, Python… (comma-separated)" multiline />
                      : skills.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} />)}</div>
                        : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No skills listed.</p>
                    }
                  </section>

                  <section>
                    <SectionHead><CheckCircle size={17} color={CYAN} />Work History &amp; Feedback</SectionHead>
                    <div style={{
                      fontFamily: FONT, background: `${CYAN}07`, border: `1px solid ${CYAN}20`,
                      borderRadius: 10, padding: '18px 22px', fontSize: 14, color: '#4a6b7a',
                    }}>
                      {formData.completedBookings > 0
                        ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}.`
                        : 'Be the first to book a session with this mentor.'}
                    </div>
                  </section>
                </div>
              )}

              {/* ── MENTORSHIP TOPICS ─────────────────────────────── */}
              {activeTab === 'Mentorship Topics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 820 }}>
                  <section>
                    <SectionHead><Zap size={17} color={CYAN} />Areas of Interest</SectionHead>
                    {isEditing
                      ? <EditField value={formData.areasOfInterest || ''} onChange={e => set('areasOfInterest', e.target.value)} placeholder="Web Development, Cloud, DevOps… (comma-separated)" multiline />
                      : areas.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{areas.map((a, i) => <Pill key={i} label={a} />)}</div>
                        : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No topics listed.</p>
                    }
                  </section>

                  <section>
                    <SectionHead><BookOpen size={17} color={CYAN} />Mentoring Style</SectionHead>
                    {isEditing
                      ? <EditField value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
                      : <p style={{ fontFamily: FONT, fontSize: 14, color: '#1e3a4a', padding: '12px 16px', background: '#f8fbfd', border: '1px solid #e8f0f4', borderRadius: 8, margin: 0 }}>
                        {formData.mentoringStyle || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>Not set</span>}
                      </p>
                    }
                  </section>

                  <section>
                    <SectionHead><Globe size={17} color={CYAN} />Languages</SectionHead>
                    {formData.languages?.length > 0
                      ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{formData.languages.map((l, i) => <Pill key={i} label={l} />)}</div>
                      : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No languages added.</p>
                    }
                  </section>
                </div>
              )}

              {/* ── EXPERIENCE ────────────────────────────────────── */}
              {activeTab === 'Experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                  <section>
                    <SectionHead><Briefcase size={17} color={CYAN} />Professional Details</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
                      {[
                        { label: 'Company', field: 'companyName' },
                        { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
                        { label: 'Mentoring Style', field: 'mentoringStyle' },
                        { label: 'Hourly Rate (₹)', field: 'hourlyRate', type: 'number' },
                      ].map(({ label, field, type }) => (
                        <InfoCard key={field} label={label} field={field} type={type} formData={formData} set={set} isEditing={isEditing} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionHead><Award size={17} color={CYAN} />Education</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
                      {[
                        { label: 'Highest Degree', field: 'highestDegree' },
                        { label: 'Field of Study', field: 'fieldOfStudy' },
                        { label: 'Institution', field: 'schoolName' },
                      ].map(({ label, field }) => (
                        <InfoCard key={field} label={label} field={field} formData={formData} set={set} isEditing={isEditing} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionHead><Calendar size={17} color={CYAN} />Weekly Availability</SectionHead>
                    {isEditing && (
                      <div style={{
                        fontFamily: FONT, display: 'flex', alignItems: 'flex-start', gap: 9,
                        background: `${CYAN}07`, border: `1px solid ${CYAN}22`,
                        borderRadius: 8, padding: '11px 15px', marginBottom: 16,
                        fontSize: 13, color: '#006a8e', lineHeight: 1.55,
                      }}>
                        <CheckCircle size={14} color={CYAN} style={{ marginTop: 1, flexShrink: 0 }} />
                        <span>Use <strong>Select All Days</strong> or tick individual days, then add time slots per day.</span>
                      </div>
                    )}
                    <WeeklyAvailability
                      availability={formData.availability}
                      isEditing={isEditing}
                      addSlot={addSlot}
                      removeSlot={removeSlot}
                      updateSlot={updateSlot}
                      setFormData={setFormData}
                    />
                  </section>
                </div>
              )}

              {/* ── CASE STUDIES ──────────────────────────────────── */}
              {activeTab === 'Case Studies' && (
                <div style={{ maxWidth: 820 }}>
                  <SectionHead><FileText size={17} color={CYAN} />Documents &amp; Media</SectionHead>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                    {[
                      { label: 'Resume / CV', field: 'resumeLink', accept: '.pdf,.doc,.docx', ref: resumeRef },
                      { label: 'Portfolio', field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
                      { label: 'Video Intro', field: 'videoLink', accept: 'video/*', ref: videoRef },
                    ].map(({ label, field, accept, ref }) => (
                      <div key={field} style={{
                        border: '1px solid #e8f0f4', borderRadius: 12,
                        padding: '20px 20px', background: '#fff',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: isEditing ? 14 : 0, gap: 8 }}>
                          <div>
                            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#0f2030', margin: 0 }}>{label}</p>
                            {!isEditing && !formData[field] && (
                              <p style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', fontStyle: 'italic', margin: '4px 0 0' }}>Not uploaded</p>
                            )}
                          </div>
                          {!isEditing && formData[field] && (
                            <a href={formData[field]} target="_blank" rel="noopener noreferrer"
                              style={{
                                fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20,
                                border: `1px solid ${CYAN}`, color: CYAN, textDecoration: 'none', flexShrink: 0,
                              }}>
                              <Eye size={13} /> View
                            </a>
                          )}
                        </div>
                        {isEditing && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                            <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} id={`f-${field}`}
                              onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link', '')]: f })); }} />
                            <label htmlFor={`f-${field}`} style={{
                              fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 8,
                              padding: '12px 14px', border: `1.5px dashed ${CYAN}40`,
                              borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#8aa0ad',
                            }}>
                              <Upload size={14} color={CYAN} /> Upload file
                            </label>
                            <EditField value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfile;