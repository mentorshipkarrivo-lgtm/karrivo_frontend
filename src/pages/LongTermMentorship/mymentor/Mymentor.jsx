// import React from 'react';
// import { useGetMyMentorQuery } from './mymentorapislice';
// import { Star, MapPin, Phone, Mail, Linkedin, ExternalLink, User, BadgeCheck } from 'lucide-react';

// const PRIMARY = '#212c3d';
// const MUTED = '#5a6a82';
// const BORDER = '#e4e8ee';
// const ACCENT = '#3b6be0';

// const iconBox = {
//     width: 26, height: 26, borderRadius: 6,
//     background: '#f4f7ff', border: '1px solid #e4e8ee',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     flexShrink: 0,
// };

// const ContactRow = ({ icon, label, isLink, href }) => (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//         <div style={iconBox}>{icon}</div>
//         {isLink ? (
//             <a href={href} target="_blank" rel="noopener noreferrer"
//                 style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: ACCENT, textDecoration: 'none' }}>
//                 {label} <ExternalLink size={10} />
//             </a>
//         ) : (
//             <span style={{ fontSize: 12, fontWeight: 500, color: PRIMARY, wordBreak: 'break-all' }}>{label}</span>
//         )}
//     </div>
// );

// const MentorCard = ({ mentor }) => {
//     const initials = mentor.fullName
//         ?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

//     return (
//         <div style={{
//             background: '#fff',
//             border: `1px solid ${BORDER}`,
//             borderRadius: 12,
//             overflow: 'hidden',
//             display: 'flex',
//             flexDirection: 'column',
//         }}>
//             {/* Profile section */}
//             <div style={{ padding: '16px 16px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>

//                 {/* Avatar */}
//                 <div style={{
//                     width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
//                     background: '#eef1f7', border: `1px solid ${BORDER}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     fontSize: 14, fontWeight: 700, color: PRIMARY,
//                 }}>
//                     {initials || <User size={16} color={PRIMARY} />}
//                 </div>

//                 {/* Name + meta */}
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
//                         <span style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                             {mentor.fullName}
//                         </span>
//                         <BadgeCheck size={13} color={ACCENT} />
//                     </div>

//                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
//                         {mentor.mentorCategory && (
//                             <span style={{
//                                 fontSize: 10, fontWeight: 600, color: ACCENT,
//                                 background: '#eef2fd', border: '1px solid #d0dbf8',
//                                 borderRadius: 5, padding: '2px 7px',
//                             }}>
//                                 {mentor.mentorCategory}
//                             </span>
//                         )}
//                         {mentor.location && (
//                             <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                                 <MapPin size={10} color={MUTED} />
//                                 <span style={{ fontSize: 11, color: MUTED }}>{mentor.location}</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Rating */}
//                 <div style={{
//                     display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0,
//                     background: '#fefce8', border: '1px solid #fde68a',
//                     borderRadius: 7, padding: '4px 8px',
//                 }}>
//                     {[1, 2, 3, 4, 5].map(s => (
//                         <Star key={s} size={9}
//                             color={s <= Math.round(mentor.rating) ? '#f59e0b' : BORDER}
//                             fill={s <= Math.round(mentor.rating) ? '#f59e0b' : 'none'}
//                         />
//                     ))}
//                     <span style={{ fontSize: 11, fontWeight: 700, color: '#92400e', marginLeft: 3 }}>
//                         {mentor.rating?.toFixed(1)}
//                     </span>
//                 </div>
//             </div>

//             {/* Divider */}
//             <div style={{ height: 1, background: BORDER, margin: '0 16px' }} />

//             {/* Contact section */}
//             <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//                 {mentor.email && (
//                     <ContactRow icon={<Mail size={12} color={ACCENT} />} label={mentor.email} />
//                 )}
//                 {mentor.phone && (
//                     <ContactRow icon={<Phone size={12} color={ACCENT} />} label={mentor.phone} />
//                 )}
//                 {mentor.linkedinUrl && (
//                     <ContactRow icon={<Linkedin size={12} color={ACCENT} />} label="LinkedIn" isLink href={mentor.linkedinUrl} />
//                 )}
//             </div>
//         </div>
//     );
// };

// const MyMentor = () => {
//     const menteeId = JSON.parse(localStorage.getItem('userData') || '{}')?._id;
//     const { data, isLoading, isError } = useGetMyMentorQuery(menteeId, { skip: !menteeId });
//     const mentor = data?.resData;

//     if (isLoading) return <div style={{ padding: 32, color: MUTED, fontSize: 14 }}>Loading...</div>;
//     if (isError || !mentor) return <div style={{ padding: 32, color: '#dc2626', fontSize: 14 }}>Failed to load mentor.</div>;

//     return (
//         <div style={{ padding: '24px 16px', boxSizing: 'border-box' }}>

//             <p style={{ fontSize: 13, fontWeight: 600, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
//                 My Mentor
//             </p>

//             {/* ✅ 2-column grid — cards sit side by side, stack on mobile */}
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
//                 gap: 16,
//             }}>
//                 <MentorCard mentor={mentor} />
//                 {/* If you ever have a second mentor, just add another <MentorCard mentor={mentor2} /> here */}
//             </div>

//         </div>
//     );
// };

// export default MyMentor;




import React, { useState } from 'react';
import { useGetMyMentorQuery } from './mymentorapislice';
import {
    Star, MapPin, Phone, Mail, Linkedin, ExternalLink, User,
    BadgeCheck, X, Briefcase, Clock, Globe, GraduationCap,
    Target, BookOpen, Award, Calendar, ChevronRight, Building2,
    Languages, Layers
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────
const PRIMARY = '#212c3d';
const MUTED = '#5a6a82';
const BORDER = '#e4e8ee';
const ACCENT = '#0098cc';
const BLUE_LIGHT = '#f0faff';
const BLUE_BORDER = '#cce9f5';
const FONT = "'Inter', sans-serif";

// inject Inter font once
if (typeof document !== 'undefined' && !document.getElementById('inter-font-mymentor')) {
    const l = document.createElement('link');
    l.id = 'inter-font-mymentor';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(l);
}

const fmtINR = (n) => `₹${Number(n ?? 0).toLocaleString('en-IN')}`;
const toTC = (s) => s ? s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1)) : '';

// ── Small helpers ──────────────────────────────────────────────────────────
const Chip = ({ label, color = ACCENT, bg = BLUE_LIGHT, border = BLUE_BORDER }) => (
    <span style={{
        fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
        background: bg, color, border: `1px solid ${border}`, fontFamily: FONT,
    }}>{label}</span>
);

const InfoRow = ({ icon: Icon, label, value, isLink, href }) => {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid #f3f4f6` }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={12} color={ACCENT} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, color: MUTED, margin: '0 0 1px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</p>
                {isLink ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, fontWeight: 600, color: ACCENT, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        {value} <ExternalLink size={9} />
                    </a>
                ) : (
                    <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, margin: 0, wordBreak: 'break-word' }}>{value}</p>
                )}
            </div>
        </div>
    );
};

// ── Profile Modal ──────────────────────────────────────────────────────────
function MentorProfileModal({ mentor, onClose }) {
    if (!mentor) return null;

    const initials = mentor.fullName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const hasPhoto = !!mentor.profilePhoto;
    const skills = (mentor.areasOfInterest || mentor.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
    const languages = Array.isArray(mentor.languages) ? mentor.languages : (mentor.languages ? [mentor.languages] : []);
    const guidance = Array.isArray(mentor.guidanceAreas) ? mentor.guidanceAreas : [];

    // Build availability summary: group slots by day
    const avail = Array.isArray(mentor.availability) ? mentor.availability : [];
    const byDay = {};
    avail.forEach(slot => {
        if (!byDay[slot.day]) byDay[slot.day] = [];
        byDay[slot.day].push(slot);
    });
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const availDays = dayOrder.filter(d => byDay[d]);

    return (
        <>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(3px)' }} />

            {/* Modal */}
            <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                zIndex: 301, width: '100%', maxWidth: 560, maxHeight: '90vh',
                background: 'white', borderRadius: 18, display: 'flex', flexDirection: 'column',
                fontFamily: FONT, boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
            }}>
                {/* Header banner */}
                <div style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #16213e 60%, #0098cc33 100%)`, padding: '20px 20px 16px', position: 'relative', flexShrink: 0 }}>
                    <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={15} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
                        {/* Avatar */}
                        <div style={{ width: 72, height: 72, borderRadius: 14, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0, background: '#0f172a' }}>
                            {hasPhoto ? (
                                <img src={mentor.profilePhoto} alt={mentor.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{initials}</span>
                                </div>
                            )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {toTC(mentor.fullName)}
                                </h2>
                                <BadgeCheck size={14} color={ACCENT} />
                            </div>
                            {(mentor.currentRole || mentor.companyName) && (
                                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: '3px 0 0' }}>
                                    {toTC(mentor.currentRole)}{mentor.currentRole && mentor.companyName ? ' · ' : ''}{toTC(mentor.companyName)}
                                </p>
                            )}
                            {/* Rating + Category */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '2px 8px' }}>
                                    <Star size={10} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{(mentor.rating ?? 5).toFixed(1)}</span>
                                </div>
                                {mentor.mentorCategory && <Chip label={toTC(mentor.mentorCategory)} color="#16a34a" bg="rgba(22,163,74,0.15)" border="rgba(22,163,74,0.3)" />}
                                {mentor.mentoringStyle && <Chip label={toTC(mentor.mentoringStyle)} color={ACCENT} bg="rgba(0,152,204,0.15)" border="rgba(0,152,204,0.3)" />}
                            </div>
                        </div>

                        {/* Hourly rate */}
                        {(mentor.hourlyRate || mentor.pricing?.hourlyRate) && (
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>
                                    {fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}
                                </p>
                                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', margin: 0 }}>/session</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scrollable body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>

                    {/* Bio */}
                    {mentor.motivationStatement && (
                        <div style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
                            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.7, margin: 0 }}>{mentor.motivationStatement}</p>
                        </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                            <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 7px' }}>Skills & Expertise</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {skills.map((s, i) => (
                                    <span key={i} style={{ fontSize: 10, fontWeight: 500, padding: '3px 9px', borderRadius: 6, background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>{toTC(s)}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Guidance areas */}
                    {guidance.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                            <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 7px' }}>Guidance Areas</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {guidance.map((g, i) => (
                                    <span key={i} style={{ fontSize: 10, fontWeight: 500, padding: '3px 9px', borderRadius: 6, background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>{g}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Info grid */}
                    <div style={{ marginBottom: 14 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Details</p>
                        <InfoRow icon={MapPin} label="Location" value={toTC(mentor.location)} />
                        <InfoRow icon={Building2} label="Experience" value={mentor.yearsOfExperience ? `${mentor.yearsOfExperience}+ Years` : null} />
                        <InfoRow icon={Languages} label="Languages" value={languages.join(', ')} />
                        <InfoRow icon={GraduationCap} label="Education" value={[toTC(mentor.fieldOfStudy), mentor.highestDegree, mentor.schoolName].filter(Boolean).join(' · ')} />
                        <InfoRow icon={Target} label="For" value={toTC(mentor.targetAudience || mentor.forAudience)} />
                        <InfoRow icon={Layers} label="Domain" value={toTC(mentor.targetingDomains)} />
                        <InfoRow icon={Mail} label="Email" value={mentor.email} />
                        <InfoRow icon={Phone} label="Phone" value={mentor.phone} />
                        {mentor.linkedinUrl && <InfoRow icon={Linkedin} label="LinkedIn" value="View Profile" isLink href={mentor.linkedinUrl} />}
                    </div>

                    {/* Availability summary */}
                    {/* {availDays.length > 0 && (
                        <div>
                            <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 7px' }}>
                                Availability ({availDays.length} day{availDays.length > 1 ? 's' : ''})
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                {availDays.map(day => {
                                    const slots = byDay[day];
                                    const first = slots[0];
                                    const last = slots[slots.length - 1];
                                    return (
                                        <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: PRIMARY }}>{day}</span>
                                            <span style={{ fontSize: 11, color: MUTED }}>
                                                {first.startTime} – {last.endTime}
                                                <span style={{ marginLeft: 6, fontSize: 10, color: ACCENT, fontWeight: 600 }}>({slots.length} slots)</span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )} */}
                </div>

                {/* Footer */}
                <div style={{ borderTop: '1px solid #f0f0f0', padding: '12px 20px', background: 'white', flexShrink: 0 }}>
                    <button onClick={onClose} style={{ width: '100%', padding: '10px', background: PRIMARY, color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FONT }}>
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}

// ── MentorCard ─────────────────────────────────────────────────────────────
// Matches the layout shown in the screenshot: photo left, details right
function MentorCard({ mentor, onViewProfile }) {
    const initials = mentor.fullName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const hasPhoto = !!mentor.profilePhoto;
    const skills = (mentor.areasOfInterest || mentor.currentSkills || '').split(',').map(s => s.trim()).filter(Boolean);
    const languages = Array.isArray(mentor.languages) ? mentor.languages.join(', ') : mentor.languages || '';
    const guidance = Array.isArray(mentor.guidanceAreas) ? mentor.guidanceAreas : [];
    const rating = mentor.rating ?? 5;

    const CARD_H = '200px';

    return (
        <div style={{
            background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14,
            overflow: 'hidden', display: 'flex', flexDirection: 'row',
            fontFamily: FONT, height: CARD_H,
            boxShadow: '0 1px 6px rgba(0,0,0,.06)',
            transition: 'box-shadow .2s, border-color .2s',
        }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,152,204,.13)'; e.currentTarget.style.borderColor = BLUE_BORDER; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,.06)'; e.currentTarget.style.borderColor = BORDER; }}
        >
            {/* ── LEFT: Photo panel ── */}
            <div style={{
                width: '42%', height: CARD_H, flexShrink: 0, position: 'relative', overflow: 'hidden',
                background: hasPhoto ? '#0f172a' : `linear-gradient(145deg, ${PRIMARY} 0%, #16213e 60%, #0098cc22 100%)`,
                borderRadius: '14px 0 0 14px',
            }}>
                {hasPhoto ? (
                    <img src={mentor.profilePhoto} alt={mentor.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.93 }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{initials}</span>
                    </div>
                )}

                {/* Gradient overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, transparent 100%)', pointerEvents: 'none' }} />

                {/* Rating pill — top left */}
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.93)', borderRadius: 20, padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={10} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#111827' }}>{rating.toFixed(1)}</span>
                </div>

                {/* Mentoring style pill — top right */}
                {mentor.mentoringStyle && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,152,204,0.88)', borderRadius: 20, padding: '2px 8px' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{toTC(mentor.mentoringStyle)}</span>
                    </div>
                )}

                {/* Name strip at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px' }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}>{toTC(mentor.fullName)}</p>
                    {(mentor.currentRole || mentor.companyName) && (
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.72)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {toTC(mentor.currentRole)}{mentor.currentRole && mentor.companyName ? ' · ' : ''}{toTC(mentor.companyName)}
                        </p>
                    )}
                </div>
            </div>

            {/* ── RIGHT: Info panel ── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: '12px 14px 12px' }}>

                {/* Top row: category badge + hourly rate */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {mentor.mentorCategory && (
                            <Chip label={toTC(mentor.mentorCategory)} color="#16a34a" bg="#f0fdf4" border="#bbf7d0" />
                        )}
                    </div>
                    {(mentor.hourlyRate || mentor.pricing?.hourlyRate) && (
                        <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 6 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: PRIMARY }}>{fmtINR(mentor.pricing?.hourlyRate ?? mentor.hourlyRate)}</span>
                            <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 2 }}>/session</span>
                        </div>
                    )}
                </div>

                {/* Meta: location, experience, languages */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginBottom: 6 }}>
                    {mentor.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: MUTED }}>
                            <MapPin size={9} color={ACCENT} strokeWidth={2} />{toTC(mentor.location)}
                        </span>
                    )}
                    {mentor.yearsOfExperience && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: MUTED }}>
                            <Building2 size={9} color={ACCENT} strokeWidth={2} />{mentor.yearsOfExperience}+ yrs
                        </span>
                    )}
                    {languages && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: MUTED }}>
                            <Globe size={9} color={ACCENT} strokeWidth={2} />{languages}
                        </span>
                    )}
                </div>

                {/* Guidance Areas (like in screenshot) */}
                {guidance.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                        {guidance.slice(0, 3).map((g, i) => (
                            <span key={i} style={{ fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 5, background: BLUE_LIGHT, color: ACCENT, border: `1px solid ${BLUE_BORDER}` }}>{g}</span>
                        ))}
                        {guidance.length > 3 && (
                            <span style={{ fontSize: 9, color: MUTED, padding: '2px 4px' }}>+{guidance.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && guidance.length === 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                        {skills.slice(0, 3).map((s, i) => (
                            <span key={i} style={{ fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 5, background: '#fafafa', color: '#374151', border: '1px solid #e5e7eb' }}>{toTC(s)}</span>
                        ))}
                        {skills.length > 3 && (
                            <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 5, background: BLUE_LIGHT, color: ACCENT, border: `1px solid ${BLUE_BORDER}` }}>+{skills.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* View Profile button — pinned to bottom */}
                <button
                    onClick={() => onViewProfile(mentor)}
                    style={{ width: '100%', padding: '9px', background: PRIMARY, color: 'white', border: 'none', borderRadius: 9, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: FONT, transition: 'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#2d2d4e'}
                    onMouseLeave={e => e.currentTarget.style.background = PRIMARY}
                >
                    View Profile
                </button>
            </div>
        </div>
    );
}

// ── MyMentor (root) ────────────────────────────────────────────────────────
const MyMentor = () => {
    // Try common localStorage keys to find mentee id
    const getMenteeId = () => {
        const keys = ['userData', 'user', 'authUser', 'menteeData', 'loginData'];
        for (const key of keys) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const parsed = JSON.parse(raw);
                const id = parsed?._id || parsed?.id || parsed?.userId
                    || parsed?.data?._id || parsed?.user?._id;
                if (id) return id;
            } catch { /* ignore */ }
        }
        return null;
    };
    const menteeId = getMenteeId();

    // transformResponse returns full response: { success, mentorData: {...} }
    const { data, isLoading, isError } = useGetMyMentorQuery(menteeId, { skip: !menteeId });
    const mentor = data?.mentorData;

    const [selectedMentor, setSelectedMentor] = useState(null);

    if (!menteeId) return (
        <div style={{ padding: 32, color: '#dc2626', fontSize: 14, fontFamily: FONT }}>
            User session not found. Please log in again.
        </div>
    );
    if (isLoading) return (
        <div style={{ padding: 32, color: MUTED, fontSize: 14, fontFamily: FONT }}>Loading...</div>
    );
    if (isError || !mentor) return (
        <div style={{ padding: 32, color: '#9ca3af', fontSize: 14, fontFamily: FONT }}>
            No mentor assigned yet. Book a session to get started!
        </div>
    );

    return (
        <div style={{ padding: '24px 16px', boxSizing: 'border-box', fontFamily: FONT }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                My Mentor
            </p>

            {/* Cards grid — 1 or 2 columns */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 14,
            }}>
                <MentorCard mentor={mentor} onViewProfile={setSelectedMentor} />
                {/* Add more MentorCard here if multiple mentors */}
            </div>

            {/* Profile modal */}
            {selectedMentor && (
                <MentorProfileModal
                    mentor={selectedMentor}
                    onClose={() => setSelectedMentor(null)}
                />
            )}
        </div>
    );
};

export default MyMentor;


