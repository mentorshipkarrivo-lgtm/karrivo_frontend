import React from 'react';
import { useGetMyMentorQuery } from './mymentorapislice';
import { Star, MapPin, Phone, Mail, Linkedin, ExternalLink, User, BadgeCheck } from 'lucide-react';

const PRIMARY = '#212c3d';
const MUTED = '#5a6a82';
const BORDER = '#e4e8ee';
const ACCENT = '#3b6be0';

const iconBox = {
    width: 26, height: 26, borderRadius: 6,
    background: '#f4f7ff', border: '1px solid #e4e8ee',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
};

const ContactRow = ({ icon, label, isLink, href }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={iconBox}>{icon}</div>
        {isLink ? (
            <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: ACCENT, textDecoration: 'none' }}>
                {label} <ExternalLink size={10} />
            </a>
        ) : (
            <span style={{ fontSize: 12, fontWeight: 500, color: PRIMARY, wordBreak: 'break-all' }}>{label}</span>
        )}
    </div>
);

const MentorCard = ({ mentor }) => {
    const initials = mentor.fullName
        ?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    return (
        <div style={{
            background: '#fff',
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Profile section */}
            <div style={{ padding: '16px 16px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>

                {/* Avatar */}
                <div style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: '#eef1f7', border: `1px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: PRIMARY,
                }}>
                    {initials || <User size={16} color={PRIMARY} />}
                </div>

                {/* Name + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {mentor.fullName}
                        </span>
                        <BadgeCheck size={13} color={ACCENT} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                        {mentor.mentorCategory && (
                            <span style={{
                                fontSize: 10, fontWeight: 600, color: ACCENT,
                                background: '#eef2fd', border: '1px solid #d0dbf8',
                                borderRadius: 5, padding: '2px 7px',
                            }}>
                                {mentor.mentorCategory}
                            </span>
                        )}
                        {mentor.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MapPin size={10} color={MUTED} />
                                <span style={{ fontSize: 11, color: MUTED }}>{mentor.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Rating */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0,
                    background: '#fefce8', border: '1px solid #fde68a',
                    borderRadius: 7, padding: '4px 8px',
                }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={9}
                            color={s <= Math.round(mentor.rating) ? '#f59e0b' : BORDER}
                            fill={s <= Math.round(mentor.rating) ? '#f59e0b' : 'none'}
                        />
                    ))}
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#92400e', marginLeft: 3 }}>
                        {mentor.rating?.toFixed(1)}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: BORDER, margin: '0 16px' }} />

            {/* Contact section */}
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mentor.email && (
                    <ContactRow icon={<Mail size={12} color={ACCENT} />} label={mentor.email} />
                )}
                {mentor.phone && (
                    <ContactRow icon={<Phone size={12} color={ACCENT} />} label={mentor.phone} />
                )}
                {mentor.linkedinUrl && (
                    <ContactRow icon={<Linkedin size={12} color={ACCENT} />} label="LinkedIn" isLink href={mentor.linkedinUrl} />
                )}
            </div>
        </div>
    );
};

const MyMentor = () => {
    const menteeId = JSON.parse(localStorage.getItem('userData') || '{}')?._id;
    const { data, isLoading, isError } = useGetMyMentorQuery(menteeId, { skip: !menteeId });
    const mentor = data?.resData;

    if (isLoading) return <div style={{ padding: 32, color: MUTED, fontSize: 14 }}>Loading...</div>;
    if (isError || !mentor) return <div style={{ padding: 32, color: '#dc2626', fontSize: 14 }}>Failed to load mentor.</div>;

    return (
        <div style={{ padding: '24px 16px', boxSizing: 'border-box' }}>

            <p style={{ fontSize: 13, fontWeight: 600, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                My Mentor
            </p>

            {/* ✅ 2-column grid — cards sit side by side, stack on mobile */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 16,
            }}>
                <MentorCard mentor={mentor} />
                {/* If you ever have a second mentor, just add another <MentorCard mentor={mentor2} /> here */}
            </div>

        </div>
    );
};

export default MyMentor;