


import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    useGetMenteeProfileQuery,
    useSaveMenteeProfileMutation,
} from './mentedashboardapislice';
import { useGetSubscriptionsByMenteeIdQuery } from '../LongTermMentorship/subscriptionplan/subcriptionsplanapislice';
import {
    Home, Menu, X, Calendar, Clock, MessageCircle,
    LogOut, User, MessageSquare, Users, HelpCircle,
    BookOpen, CreditCard, Loader2, Lock, Bell, Mail,
    Star, Zap, ChevronRight, Phone, Megaphone, Wrench, Bug
} from 'lucide-react';
import Loader from '../../global/Loader';

/* ── Global Styles for Cambria Font ──────────────────────────────────────── */
const globalStyles = `
    * {
        font-family: Cambria, Georgia, serif !important;
    }
    body, html {
        font-family: Cambria, Georgia, serif !important;
    }
    button, input, select, textarea {
        font-family: Cambria, Georgia, serif !important;
    }
`;

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const clearAllData = () => {
    localStorage.clear();
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; path=/; max-age=0`;
    });
    sessionStorage.clear();
};

/* ── Nav config ───────────────────────────────────────────────────────────── */
const topNavigationItems = [
    { id: 'bookings', label: 'Trial Bookings', icon: Users, path: '/mentee/bookings' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/mentee/profile' },
    { id: 'support', label: 'Help Support', icon: HelpCircle, path: '/mentee/support' },
];

const ltmNavigationItems = [
    { id: 'upcoming-sessions', label: 'Upcoming Sessions', icon: Clock, path: '/mentee/upcoming' },
    { id: 'completed', label: 'Session History', icon: BookOpen, path: '/mentee/completed_sessions' },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard, path: '/mentee/subscription' },
    { id: 'mentor', label: 'My Mentor', icon: User, path: '/mentee/mentor' },
    { id: 'menteePayments', label: 'Mentee Payments', icon: MessageCircle, path: '/mentee/mentee-payments' },
];

const menteeTypes = [
    'All Mentors', 'Engineering Mentors', 'Top Mentors', 'Startup Mentors',
    'Product Mentors', 'Marketing Mentors', 'Leadership Mentors', 'AI Mentors',
];

const getPageLabel = (pathname) => {
    const all = [...topNavigationItems, ...ltmNavigationItems];
    const match = all.find(item => item.path === pathname);
    return match ? match.label : 'Dashboard';
};

/* ── NoSubscriptionPopup ─────────────────────────────────────────────────── */
const NoSubscriptionPopup = ({ isOpen, onClose, onSubscribe }) => {
    if (!isOpen) return null;
    return (
        <>
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.18)', fontFamily: 'Cambria, Georgia, serif' }} />
            <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', zIndex: 301,
                width: '90%', maxWidth: 340, background: '#fff',
                border: '1px solid #e4e8ee', borderRadius: 14,
                padding: '18px 20px', boxSizing: 'border-box',
                fontFamily: 'Cambria, Georgia, serif',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                        background: '#f0f4ff', border: '1px solid #dbe4ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Lock size={16} color="#3b6be0" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#212c3d', marginBottom: 3, fontFamily: 'Cambria, Georgia, serif' }}>No active subscription</p>
                        <p style={{ fontSize: 12, color: '#5a6a82', lineHeight: 1.5, fontFamily: 'Cambria, Georgia, serif' }}>
                            Subscribe to a mentorship plan to unlock long-term mentorship features.
                        </p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
                        <X size={15} color="#94a3b8" />
                    </button>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={onClose} style={{
                        flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 600,
                        background: '#f8fafc', border: '1px solid #e4e8ee', borderRadius: 8, cursor: 'pointer', color: '#5a6a82',
                        fontFamily: 'Cambria, Georgia, serif',
                    }}>Cancel</button>
                    <button onClick={onSubscribe} style={{
                        flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 700,
                        background: '#212c3d', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#fff',
                        fontFamily: 'Cambria, Georgia, serif',
                    }}>View Plans →</button>
                </div>
            </div>
        </>
    );
};

/* ── LogoutModal ──────────────────────────────────────────────────────────── */
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-lg p-6 w-80 shadow-xl mx-4" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <h2 className="text-lg font-bold mb-2">Confirm Logout</h2>
                <p className="text-gray-600 mb-6 text-sm">Are you sure you want to logout?</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm" style={{ fontFamily: 'Cambria, Georgia, serif' }}>Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm" style={{ fontFamily: 'Cambria, Georgia, serif' }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

/* ── ProfileDropdown ──────────────────────────────────────────────────────── */
const ProfileDropdown = ({ userData, onProfileClick, onLogoutClick, isOpen, profilePhotoUrl }) => {
    if (!isOpen) return null;
    const initials = userData?.name?.split(' ').slice(0, 2).map(n => n?.[0]?.toUpperCase()).join('') || 'U';
    return (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border py-2 z-50" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
            <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                    {profilePhotoUrl ? (
                        <img src={profilePhotoUrl} alt={userData?.name}
                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover bg-gray-100"
                            onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                        />
                    ) : null}
                    <div className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white flex-shrink-0 font-semibold text-sm"
                        style={{ display: profilePhotoUrl ? 'none' : 'flex', fontFamily: 'Cambria, Georgia, serif' }}>{initials}</div>
                    <div className="min-w-0">
                        <div className="font-medium text-sm truncate" style={{ fontFamily: 'Cambria, Georgia, serif' }}>{userData?.name}</div>
                        <div className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Cambria, Georgia, serif' }}>{userData?.email}</div>
                    </div>
                </div>
            </div>
            <button onClick={onProfileClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <User size={16} /> View Profile
            </button>
            <button onClick={onLogoutClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <LogOut size={16} /> Logout
            </button>
        </div>
    );
};

/* ── ProfileCompletionForm ────────────────────────────────────────────────── */
// const ProfileCompletionForm = ({ onComplete, saving, serverErrors }) => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         fullName: '', dateOfBirth: '', address: '',
//         currentStatus: '', highestEducation: '', menteeType: '',
//     });
//     const [clientErrors, setClientErrors] = useState({});

//     const set = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//         setClientErrors(prev => ({ ...prev, [field]: '' }));
//     };

//     const validateStep = (step) => {
//         const errs = {};
//         if (step === 1) {
//             if (!formData.fullName || formData.fullName.trim().length < 2) errs.fullName = 'Full name required (min 2 chars)';
//             if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
//             if (!formData.address || formData.address.trim().length < 5) errs.address = 'Address required (min 5 chars)';
//         }
//         if (step === 2) {
//             if (!formData.currentStatus) errs.currentStatus = 'Please select your status';
//             if (!formData.highestEducation) errs.highestEducation = 'Please select education';
//         }
//         if (step === 3) {
//             if (!formData.menteeType) errs.menteeType = 'Please select a mentor type';
//         }
//         setClientErrors(errs);
//         return Object.keys(errs).length === 0;
//     };

//     const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(s => s + 1); };
//     const handleSubmit = () => { if (validateStep(3)) onComplete(formData); };
//     const errors = { ...serverErrors, ...clientErrors };

//     const FieldError = ({ field }) => errors[field]
//         ? <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4, fontFamily: 'Cambria, Georgia, serif' }}>{errors[field]}</p> : null;

//     const inputStyle = (field) => ({
//         width: '100%', padding: '8px 11px',
//         border: `1.5px solid ${errors[field] ? '#f87171' : '#e2e8f0'}`,
//         borderRadius: 8, fontSize: 13, color: '#0f172a',
//         outline: 'none', boxSizing: 'border-box',
//         background: errors[field] ? '#fff8f8' : '#fff',
//         fontFamily: 'Cambria, Georgia, serif', transition: 'border-color 0.15s',
//     });

//     const toggleStyle = (active) => ({
//         padding: '9px', border: `1.5px solid ${active ? '#0098cc' : '#e2e8f0'}`,
//         borderRadius: 8, fontSize: 12, fontWeight: 500,
//         background: active ? '#f0f9ff' : '#fff',
//         color: active ? '#0098cc' : '#64748b',
//         cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
//         fontFamily: 'Cambria, Georgia, serif',
//     });

//     const labelStyle = {
//         display: 'block', fontSize: 11, fontWeight: 500,
//         color: '#64748b', letterSpacing: '0.04em',
//         textTransform: 'uppercase', marginBottom: 5,
//         fontFamily: 'Cambria, Georgia, serif',
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', fontFamily: 'Cambria, Georgia, serif' }}>
//             <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0', width: '100%', maxWidth: 440, overflow: 'hidden', fontFamily: 'Cambria, Georgia, serif' }}>
//                 <div style={{ padding: '20px 24px 16px', borderBottom: '0.5px solid #f0f4f8', textAlign: 'center' }}>
//                     <p style={{ fontSize: 15, fontWeight: 500, color: '#0098cc', margin: '0 0 3px', fontFamily: 'Cambria, Georgia, serif' }}>Complete your profile</p>
//                     <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 14px', fontFamily: 'Cambria, Georgia, serif' }}>3 quick steps to get matched with the right mentor</p>
//                     <div style={{ display: 'flex', gap: 5 }}>
//                         {[1, 2, 3].map(i => (
//                             <div key={i} style={{
//                                 flex: 1, height: 3, borderRadius: 99,
//                                 background: i <= currentStep ? '#0098cc' : '#e2e8f0',
//                                 transition: 'background 0.35s',
//                             }} />
//                         ))}
//                     </div>
//                 </div>
//                 <div style={{ padding: '18px 24px', fontFamily: 'Cambria, Georgia, serif' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
//                         <span style={{
//                             width: 20, height: 20, borderRadius: '50%', background: '#0098cc', color: '#fff',
//                             fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//                             fontFamily: 'Cambria, Georgia, serif',
//                         }}>{currentStep}</span>
//                         <span style={{ fontSize: 13, fontWeight: 500, color: '#0098cc', fontFamily: 'Cambria, Georgia, serif' }}>
//                             {currentStep === 1 ? 'Personal information' : currentStep === 2 ? 'Experience & education' : 'Mentor preference'}
//                         </span>
//                     </div>
//                     {currentStep === 1 && (
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                             <div>
//                                 <label style={labelStyle}>Full name *</label>
//                                 <input type="text" value={formData.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Enter your full name" style={inputStyle('fullName')} />
//                                 <FieldError field="fullName" />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Date of birth *</label>
//                                 <input type="date" value={formData.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} style={inputStyle('dateOfBirth')} />
//                                 <FieldError field="dateOfBirth" />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Address *</label>
//                                 <textarea value={formData.address} onChange={e => set('address', e.target.value)} rows={2} placeholder="City, State, Country" style={{ ...inputStyle('address'), resize: 'none' }} />
//                                 <FieldError field="address" />
//                             </div>
//                         </div>
//                     )}
//                     {currentStep === 2 && (
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                             <div>
//                                 <label style={labelStyle}>Current status *</label>
//                                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//                                     {['Fresher', 'Experienced'].map(v => (
//                                         <button key={v} onClick={() => set('currentStatus', v.toLowerCase())} style={toggleStyle(formData.currentStatus === v.toLowerCase())}>{v}</button>
//                                     ))}
//                                 </div>
//                                 <FieldError field="currentStatus" />
//                             </div>
//                             <div>
//                                 <label style={labelStyle}>Highest education *</label>
//                                 <select value={formData.highestEducation} onChange={e => set('highestEducation', e.target.value)} style={{ ...inputStyle('highestEducation'), cursor: 'pointer' }}>
//                                     <option value="">Select education level</option>
//                                     {['High School', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Others'].map(o => (
//                                         <option key={o} value={o}>{o}</option>
//                                     ))}
//                                 </select>
//                                 <FieldError field="highestEducation" />
//                             </div>
//                         </div>
//                     )}
//                     {currentStep === 3 && (
//                         <div>
//                             <label style={labelStyle}>What type of mentor do you want? *</label>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
//                                 {menteeTypes.map(type => (
//                                     <button key={type} onClick={() => set('menteeType', type)} style={{ ...toggleStyle(formData.menteeType === type), textAlign: 'left', padding: '8px 10px', lineHeight: 1.3 }}>
//                                         {type}
//                                     </button>
//                                 ))}
//                             </div>
//                             <FieldError field="menteeType" />
//                         </div>
//                     )}
//                 </div>
//                 <div style={{ padding: '12px 24px', background: '#fafbfc', borderTop: '0.5px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Cambria, Georgia, serif' }}>
//                     <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Cambria, Georgia, serif' }}>Step {currentStep} of 3</span>
//                     <div style={{ display: 'flex', gap: 8 }}>
//                         <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1} style={{
//                             padding: '7px 16px', border: '1.5px solid #e2e8f0', borderRadius: 8,
//                             background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 500,
//                             cursor: currentStep === 1 ? 'default' : 'pointer', opacity: currentStep === 1 ? 0.35 : 1, fontFamily: 'Cambria, Georgia, serif',
//                         }}>Back</button>
//                         {currentStep < 3 ? (
//                             <button onClick={handleNext} style={{ padding: '7px 18px', border: 'none', borderRadius: 8, background: '#0098cc', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Cambria, Georgia, serif' }}>Continue →</button>
//                         ) : (
//                             <button onClick={handleSubmit} disabled={saving} style={{
//                                 padding: '7px 18px', border: 'none', borderRadius: 8, background: '#0098cc', color: '#fff', fontSize: 13, fontWeight: 500,
//                                 cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.5 : 1,
//                                 display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Cambria, Georgia, serif',
//                             }}>
//                                 {saving && <Loader2 size={13} className="animate-spin" />}
//                                 {saving ? 'Saving...' : 'Complete profile'}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };




const BUTTON_COLOR = '#1a1a2e';

const ProfileCompletionForm = ({ onComplete = () => { }, saving = false, serverErrors = {} }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', dateOfBirth: '', address: '',
        currentStatus: '', highestEducation: '', menteeType: '',
    });
    const [clientErrors, setClientErrors] = useState({});

    const set = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setClientErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateStep = (step) => {
        const errs = {};
        if (step === 1) {
            if (!formData.fullName || formData.fullName.trim().length < 2) errs.fullName = 'Full name required (min 2 chars)';
            if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
            if (!formData.address || formData.address.trim().length < 5) errs.address = 'Address required (min 5 chars)';
        }
        if (step === 2) {
            if (!formData.currentStatus) errs.currentStatus = 'Please select your status';
            if (!formData.highestEducation) errs.highestEducation = 'Please select education';
        }
        if (step === 3) {
            if (!formData.menteeType) errs.menteeType = 'Please select a mentor type';
        }
        setClientErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(s => s + 1); };
    const handleSubmit = () => { if (validateStep(3)) onComplete(formData); };
    const errors = { ...serverErrors, ...clientErrors };

    const FieldError = ({ field }) => errors[field]
        ? <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4, fontFamily: 'Cambria, Georgia, serif' }}>{errors[field]}</p> : null;

    const inputStyle = (field) => ({
        width: '100%', padding: '8px 11px',
        border: `1.5px solid ${errors[field] ? '#f87171' : '#e2e8f0'}`,
        borderRadius: 8, fontSize: 13, color: '#0f172a',
        outline: 'none', boxSizing: 'border-box',
        background: errors[field] ? '#fff8f8' : '#fff',
        fontFamily: 'Cambria, Georgia, serif', transition: 'border-color 0.15s',
    });

    const toggleStyle = (active) => ({
        padding: '9px', border: `1.5px solid ${active ? BUTTON_COLOR : '#e2e8f0'}`,
        borderRadius: 8, fontSize: 12, fontWeight: 500,
        background: active ? BUTTON_COLOR : '#fff',
        color: active ? '#fff' : '#64748b',
        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
        fontFamily: 'Cambria, Georgia, serif',
    });

    const labelStyle = {
        display: 'block', fontSize: 11, fontWeight: 500,
        color: '#64748b', letterSpacing: '0.04em',
        textTransform: 'uppercase', marginBottom: 5,
        fontFamily: 'Cambria, Georgia, serif',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', fontFamily: 'Cambria, Georgia, serif' }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0', width: '100%', maxWidth: 440, overflow: 'hidden', fontFamily: 'Cambria, Georgia, serif' }}>
                <div style={{ padding: '20px 24px 16px', borderBottom: '0.5px solid #f0f4f8', textAlign: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: '#0098cc', margin: '0 0 3px', fontFamily: 'Cambria, Georgia, serif' }}>Complete your profile</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 14px', fontFamily: 'Cambria, Georgia, serif' }}>3 quick steps to get matched with the right mentor</p>
                    <div style={{ display: 'flex', gap: 5 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                flex: 1, height: 3, borderRadius: 99,
                                background: i <= currentStep ? '#0098cc' : '#e2e8f0',
                                transition: 'background 0.35s',
                            }} />
                        ))}
                    </div>
                </div>
                <div style={{ padding: '18px 24px', fontFamily: 'Cambria, Georgia, serif' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                        <span style={{
                            width: 20, height: 20, borderRadius: '50%', background: '#0098cc', color: '#fff',
                            fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            fontFamily: 'Cambria, Georgia, serif',
                        }}>{currentStep}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#0098cc', fontFamily: 'Cambria, Georgia, serif' }}>
                            {currentStep === 1 ? 'Personal information' : currentStep === 2 ? 'Experience & education' : 'Mentor preference'}
                        </span>
                    </div>
                    {currentStep === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Full name *</label>
                                <input type="text" value={formData.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Enter your full name" style={inputStyle('fullName')} />
                                <FieldError field="fullName" />
                            </div>
                            <div>
                                <label style={labelStyle}>Date of birth *</label>
                                <input type="date" value={formData.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} style={inputStyle('dateOfBirth')} />
                                <FieldError field="dateOfBirth" />
                            </div>
                            <div>
                                <label style={labelStyle}>Address *</label>
                                <textarea value={formData.address} onChange={e => set('address', e.target.value)} rows={2} placeholder="City, State, Country" style={{ ...inputStyle('address'), resize: 'none' }} />
                                <FieldError field="address" />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Current status *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    {['Fresher', 'Experienced'].map(v => (
                                        <button key={v} onClick={() => set('currentStatus', v.toLowerCase())} style={toggleStyle(formData.currentStatus === v.toLowerCase())}>{v}</button>
                                    ))}
                                </div>
                                <FieldError field="currentStatus" />
                            </div>
                            <div>
                                <label style={labelStyle}>Highest education *</label>
                                <select value={formData.highestEducation} onChange={e => set('highestEducation', e.target.value)} style={{ ...inputStyle('highestEducation'), cursor: 'pointer' }}>
                                    <option value="">Select education level</option>
                                    {['High School', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Others'].map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                                <FieldError field="highestEducation" />
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <label style={labelStyle}>What type of mentor do you want? *</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                                {menteeTypes.map(type => (
                                    <button key={type} onClick={() => set('menteeType', type)} style={{ ...toggleStyle(formData.menteeType === type), textAlign: 'left', padding: '8px 10px', lineHeight: 1.3 }}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <FieldError field="menteeType" />
                        </div>
                    )}
                </div>
                <div style={{ padding: '12px 24px', background: '#fafbfc', borderTop: '0.5px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Cambria, Georgia, serif' }}>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Cambria, Georgia, serif' }}>Step {currentStep} of 3</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1} style={{
                            padding: '7px 16px', border: '1.5px solid #e2e8f0', borderRadius: 8,
                            background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 500,
                            cursor: currentStep === 1 ? 'default' : 'pointer', opacity: currentStep === 1 ? 0.35 : 1, fontFamily: 'Cambria, Georgia, serif',
                        }}>Back</button>
                        {currentStep < 3 ? (
                            <button onClick={handleNext} style={{ padding: '7px 18px', border: 'none', borderRadius: 8, background: BUTTON_COLOR, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Cambria, Georgia, serif' }}>Continue →</button>
                        ) : (
                            <button onClick={handleSubmit} disabled={saving} style={{
                                padding: '7px 18px', border: 'none', borderRadius: 8, background: BUTTON_COLOR, color: '#fff', fontSize: 13, fontWeight: 500,
                                cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.5 : 1,
                                display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Cambria, Georgia, serif',
                            }}>
                                {saving && <Loader2 size={13} className="animate-spin" />}
                                {saving ? 'Saving...' : 'Complete profile'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



/* ── Header ───────────────────────────────────────────────────────────────── */
const Header = ({
    userData, isProfileDropdownOpen, setIsProfileDropdownOpen,
    onProfileClick, onLogoutClick, profilePhotoUrl,
    isSidebarOpen, setIsSidebarOpen,
}) => {
    const initials = userData?.name?.split(' ').slice(0, 2).map(n => n?.[0]?.toUpperCase()).join('') || 'U';

    return (
        <>
            {/* Announcement bar */}
            {/* <div style={{
                background: "#1a1a2e", color: "#e5e7eb", fontSize: 12,
                textAlign: "center", padding: "7px 12px", flexShrink: 0,
                whiteSpace: 'nowrap', overflowX: 'auto', fontFamily: 'Cambria, Georgia, serif',
            }}>
                Your Trials are switched off&nbsp;
                <button
                    onClick={() => { }}
                    style={{ color: "#ffffff", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 12, padding: 0, fontFamily: 'Cambria, Georgia, serif' }}
                >Go to Trial Settings</button>
            </div> */}

            <header className="bg-white border-b px-3 sm:px-4 flex items-center justify-between sticky top-0 z-40 h-[52px] sm:h-[56px] flex-shrink-0" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                {/* Left: hamburger + logo */}
                <div className="flex items-center gap-2">
                    {/* Hamburger — visible on ALL screen sizes */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 flex-shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="text-[14px] sm:text-[15px] font-bold text-gray-900 tracking-tight whitespace-nowrap" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                        Mentee hub
                    </span>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-1.5 sm:gap-3 relative">
                    {/* Hide utility icons on very small screens to avoid overflow */}
                    {/* <button className="hidden sm:flex p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                        <HelpCircle size={18} />
                    </button>
                    <button className="hidden sm:flex p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                        <Mail size={18} />
                    </button> */}
                    <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="flex items-center gap-1 rounded-full focus:outline-none"
                    >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden"
                            style={{ background: profilePhotoUrl ? 'transparent' : '#0098cc', fontFamily: 'Cambria, Georgia, serif' }}>
                            {profilePhotoUrl ? (
                                <img src={profilePhotoUrl} alt={userData?.name} className="w-8 h-8 rounded-full object-cover"
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            ) : initials}
                        </div>
                        <ChevronRight size={14} className="text-gray-500 rotate-90" />
                    </button>
                    <ProfileDropdown
                        userData={userData}
                        isOpen={isProfileDropdownOpen}
                        onProfileClick={onProfileClick}
                        onLogoutClick={onLogoutClick}
                        profilePhotoUrl={profilePhotoUrl}
                    />
                </div>
            </header>
        </>
    );
};



const BottomBar = () => {
    const navigate = useNavigate()
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#2e2e2e] h-[44px] sm:h-[42px]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
            <div className="h-full flex items-center justify-between px-2 sm:px-4 overflow-hidden">

                {/* Left Section */}
                <div className="flex items-center gap-2 min-w-0 overflow-hidden">

                    {/* Support */}
                    <button
                        onClick={() => navigate("/mentee/support")}
                        className="flex items-center gap-1 h-[28px] px-2 sm:px-3 rounded-md border border-gray-600 text-[10px] sm:text-[11px] text-gray-200 hover:bg-gray-700 transition whitespace-nowrap flex-shrink-0"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                    >
                        <BookOpen size={12} />
                        <span>Support</span>
                        <span className="hidden sm:inline">Centre</span>
                    </button>

                    {/* Feature Request */}
                    <button
                        onClick={() => navigate("/feature-request")}
                        className="hidden sm:flex items-center gap-1 text-[11px] text-gray-300 hover:text-white transition whitespace-nowrap"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                    >
                        <Star
                            size={11}
                            className="text-yellow-400 fill-yellow-400 flex-shrink-0"
                        />
                        <span className="hidden md:inline">
                            Feature Request
                        </span>
                        <span className="md:hidden">Feature</span>
                    </button>

                    {/* Changelog */}
                    <button
                        onClick={() => navigate("/changelog")}
                        className="hidden lg:flex items-center gap-1 text-[11px] text-gray-300 hover:text-white transition whitespace-nowrap"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                    >
                        <Megaphone size={11} className="flex-shrink-0" />
                        Changelog
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 min-w-0 overflow-hidden">



                    {/* Report Bug */}
                    <button
                        onClick={() => navigate("/report-bug")}
                        className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-300 hover:text-white transition whitespace-nowrap flex-shrink-0"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                    >
                        <Bug size={11} className="flex-shrink-0" />
                        <span className="hidden xs:inline">Report</span>
                        <span>Bug</span>
                    </button>

                    {/* Email */}
                    <a
                        href="mailto:mentee-support@preplaced.in"
                        className="hidden xl:flex items-center gap-1 text-[11px] text-gray-300 hover:text-white transition whitespace-nowrap truncate max-w-[220px]"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                    >
                        <Mail size={11} className="flex-shrink-0" />
                        wecare.karrivo@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

/* ── Right Panel ──────────────────────────────────────────────────────────── */
const RightPanel = ({ navigate }) => (
    <aside
        className="hidden xl:flex flex-col flex-shrink-0 bg-white border-l overflow-y-auto"
        style={{ width: "280px", fontFamily: "Cambria, Georgia, serif" }}
    >

        {/* Explore Mentors Card */}
        <div
            className="m-4 p-4 rounded-xl border border-green-200 bg-green-50"
            style={{ fontFamily: "Cambria, Georgia, serif" }}
        >
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Explore from a list of 600+ mentors, book trials and try to find the perfect mentor for you.
            </p>

            <button
                onClick={() => navigate("/explore-mentors")}
                className="w-full py-2 text-xs font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
                Explore All Mentors
            </button>
        </div>

        {/* Relationship Manager Card */}
        <div
            className="mx-4 mb-4 p-4 rounded-xl border border-gray-200 bg-gray-50"
            style={{ fontFamily: "Cambria, Georgia, serif" }}
        >
            <p className="text-sm font-bold text-gray-800 mb-1 leading-snug">
                Planning to purchase and confused about which plan is right for you?
            </p>


            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <User size={16} color="#666" />
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-800">
                            Karrivo
                        </p>
                        <p className="text-[10px] text-gray-500">
                            +91 7702 193 487
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <a
                        href="https://wa.me/917702193487"
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                    >
                        <MessageCircle size={13} color="white" />
                    </a>

                    <a
                        href="tel:+919311484346"
                        className="w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                    >
                        <Phone size={13} color="white" />
                    </a>
                </div>
            </div>
        </div>

        {/* Pro Tip Card */}
        {/* <div
            className="mx-4 mb-4 rounded-xl overflow-hidden border border-[#0098cc]/20 bg-gradient-to-br from-[#e8f7fc] via-[#f0fbff] to-[#ddf4fc]"
            style={{ fontFamily: "Cambria, Georgia, serif" }}
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0098cc]/10 flex items-center justify-center">
                        <Zap size={14} color="#0098cc" />
                    </div>

                    <span className="text-xs font-bold text-[#0098cc] uppercase tracking-wide">
                        Pro Tip
                    </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    Personal Guidance
                </p>

                <button
                    onClick={() => navigate("/explore-mentors")}
                    className="w-full py-2 text-xs font-bold text-white rounded-lg transition-colors"
                    style={{
                        background: "#0098cc",
                        fontFamily: "Cambria, Georgia, serif",
                    }}
                >
                    Explore Plans →
                </button>
            </div>
        </div> */}
    </aside>
);

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, currentPath, onLogout, hasSubscription, onLtmLocked }) => {
    const navigate = useNavigate();

    const go = (path) => {
        navigate(path);
        // Close sidebar on mobile (< 640px)
        if (window.innerWidth < 640) setIsSidebarOpen(false);
    };

    const NavItem = ({ item, locked }) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        const handleClick = () => {
            if (locked) { onLtmLocked(); return; }
            go(item.path);
        };

        return (
            <button
                onClick={handleClick}
                className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-sm w-full
                    ${locked
                        ? 'text-gray-400 cursor-pointer hover:bg-gray-50'
                        : isActive
                            ? 'bg-blue-50 text-[#0098cc] font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                    }
                `}
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
            >
                <Icon size={17} className="flex-shrink-0" />
                <span className="whitespace-nowrap flex-1 text-left text-[13px] leading-snug">{item.label}</span>
                {item.badge ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                        {item.badge}
                    </span>
                ) : null}
                {locked && <Lock size={11} color="#cbd5e1" className="flex-shrink-0" />}
            </button>
        );
    };

    const NavContent = () => (
        <div className="space-y-0.5">
            {topNavigationItems.map(item => (
                <NavItem key={item.id} item={item} locked={false} />
            ))}

            <p className="text-[10px] font-semibold text-gray-400 uppercase px-3 pt-4 pb-1.5 tracking-widest" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                Long Term Mentorship
            </p>

            {ltmNavigationItems.map(item => (
                <NavItem key={item.id} item={item} locked={!hasSubscription} />
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop sidebar — slides in/out via width */}
            <aside
                className={`hidden sm:flex flex-col flex-shrink-0 bg-white border-r z-50 overflow-hidden transition-[width] duration-300 ease-in-out`}
                style={{ width: isSidebarOpen ? '220px' : '0px', fontFamily: 'Cambria, Georgia, serif' }}
            >
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 min-h-0">
                    <NavContent />
                </nav>
                <div className="px-2 py-3 border-t flex-shrink-0">
                    <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-all" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                        <LogOut size={17} />
                        <span className="whitespace-nowrap">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile drawer — slides in from left, overlays content */}
            <aside className={`fixed top-0 left-0 h-screen bg-white border-r z-50 w-56 transition-transform duration-300 ease-in-out flex flex-col sm:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <div className="flex items-center justify-between px-4 border-b h-[52px] flex-shrink-0">
                    <span className="text-base font-bold text-gray-900" style={{ fontFamily: 'Cambria, Georgia, serif' }}>preplaced</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded hover:bg-gray-100">
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>
                <nav className="overflow-y-auto py-3 px-2 flex-1">
                    <NavContent />
                </nav>
                <div className="px-2 py-3 border-t flex-shrink-0">
                    <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-all" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                        <LogOut size={17} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay backdrop */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 sm:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}
        </>
    );
};

/* ── MenteeDashboard ──────────────────────────────────────────────────────── */
const MenteeDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

    // Inject global Cambria font styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = globalStyles;
        document.head.appendChild(style);
        return () => {
            if (style.parentNode) document.head.removeChild(style);
        };
    }, []);

    const getUserId = () => {
        try {
            const localUser = localStorage.getItem('userData');
            if (localUser) return JSON.parse(localUser).username;
            const cookieUser = getCookie('userData');
            if (cookieUser) return JSON.parse(decodeURIComponent(cookieUser))._id;
        } catch { }
        return null;
    };

    const getMenteeId = () => {
        try {
            const localUser = localStorage.getItem('userData');
            if (localUser) return JSON.parse(localUser)._id;
        } catch { }
        return null;
    };

    const getUserEmail = () => {
        try {
            const localUser = localStorage.getItem('userData');
            if (!localUser) return null;
            const parsed = JSON.parse(localUser);
            return parsed.email || parsed.username || null;
        } catch { return null; }
    };

    const userId = getUserId();
    const menteeId = getMenteeId();
    const email = getUserEmail();

    const { data: profileData, isLoading, isSuccess, isError } =
        useGetMenteeProfileQuery(userId, { skip: !userId });

    const { data: subscriptions = [] } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const hasSubscription = subscriptions.length > 0;

    const [saveMenteeProfile, { isLoading: saving }] = useSaveMenteeProfileMutation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [serverErrors, setServerErrors] = useState({});
    const [showLtmPopup, setShowLtmPopup] = useState(false);

    useEffect(() => {
        // Default sidebar closed on mobile
        if (window.innerWidth < 640) setIsSidebarOpen(false);
    }, []);

    useEffect(() => {
        const localUser = localStorage.getItem('userData');
        const cookieUser = getCookie('userData');
        if (localUser) {
            try { setUserData(JSON.parse(localUser)); } catch { }
        } else if (cookieUser) {
            try { setUserData(JSON.parse(decodeURIComponent(cookieUser))); } catch { }
        }
    }, []);

    useEffect(() => {
        if (isSuccess && profileData) {
            const encoded = encodeURIComponent(JSON.stringify(profileData));
            document.cookie = `profileData=${encoded}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
    }, [isSuccess, profileData]);

    useEffect(() => {
        try {
            const storedProfileData = JSON.parse(localStorage.getItem('profileData') || '{}');
            if (storedProfileData.profilePhotoUrl) setProfilePhotoUrl(storedProfileData.profilePhotoUrl);
        } catch (e) { console.error('Failed to load profile photo:', e); }
    }, []);

    useEffect(() => {
        if (profileData?.profilePhotoUrl) {
            setProfilePhotoUrl(profileData.profilePhotoUrl);
            try {
                const storedData = JSON.parse(localStorage.getItem('profileData') || '{}');
                storedData.profilePhotoUrl = profileData.profilePhotoUrl;
                localStorage.setItem('profileData', JSON.stringify(storedData));
            } catch (e) { console.error('Failed to store profile photo:', e); }
        }
    }, [profileData?.profilePhotoUrl]);

    const handleProfileComplete = async (formData) => {
        try {
            setServerErrors({});
            await saveMenteeProfile({ userId, email, ...formData }).unwrap();
        } catch (err) {
            if (err?.data?.errors) setServerErrors(err.data.errors);
        }
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        clearAllData();
        setTimeout(() => (window.location.href = '/'), 100);
    };

    const profileCompleted = profileData?.profileCompleted ?? false;
    const profile = profileData?.profile ?? null;
    const showOnboarding = (isSuccess && !profileCompleted) || isError;

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <Loader />
            </div>
        );
    }

    return (
        <>
            {/* Full-page wrapper — leave 34px at bottom for the fixed bar */}
            <div className="flex flex-col overflow-hidden bg-white" style={{ height: 'calc(100vh - 34px)', fontFamily: 'Cambria, Georgia, serif' }}>

                {/* ── Top header (full width) ── */}
                <Header
                    userData={userData}
                    isProfileDropdownOpen={isProfileDropdownOpen}
                    setIsProfileDropdownOpen={setIsProfileDropdownOpen}
                    currentPath={location.pathname}
                    profilePhotoUrl={profilePhotoUrl}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    onProfileClick={() => { navigate('/mentee/profile'); setIsProfileDropdownOpen(false); }}
                    onLogoutClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }}
                />

                {/* ── Body row ── */}
                <div className="flex flex-1 overflow-hidden" style={{ background: '#f0f2f5', fontFamily: 'Cambria, Georgia, serif' }}>

                    {/* Left sidebar */}
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        currentPath={location.pathname}
                        onLogout={() => setIsLogoutModalOpen(true)}
                        hasSubscription={hasSubscription}
                        onLtmLocked={() => setShowLtmPopup(true)}
                    />

                    {/* Center white content column */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white"
                        style={{ borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', fontFamily: 'Cambria, Georgia, serif' }}>

                        {/* Mini topbar: page title (desktop only — hamburger is in header for mobile) */}
                        {/* <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border-b flex-shrink-0" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                            <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                                {getPageLabel(location.pathname)}
                            </span>
                        </div> */}

                        <main className="flex-1 overflow-y-auto bg-white" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                            <Outlet context={{ userData, profile }} />
                        </main>
                    </div>

                    {/* Right panel — xl+ only */}
                    <RightPanel navigate={navigate} />

                </div>
            </div>

            {/* Fixed bottom bar */}
            {/* <BottomBar navigate={navigate} /> */}

            {/* Close dropdown on outside click */}
            {isProfileDropdownOpen && (
                <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />
            )}

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />

            <NoSubscriptionPopup
                isOpen={showLtmPopup}
                onClose={() => setShowLtmPopup(false)}
                onSubscribe={() => { setShowLtmPopup(false); navigate('/explore-mentors'); }}
            />

            {showOnboarding && (
                <div className="fixed inset-0 z-[100]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                    <div className="absolute inset-0 backdrop-blur-md bg-black/50" />
                    <div className="relative z-10">
                        <ProfileCompletionForm
                            onComplete={handleProfileComplete}
                            saving={saving}
                            serverErrors={serverErrors}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MenteeDashboard;