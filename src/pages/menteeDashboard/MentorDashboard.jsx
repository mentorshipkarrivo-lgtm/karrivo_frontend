

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
    Star, Zap, ChevronRight, Phone, Megaphone, Wrench, Bug, ChevronDown, ArrowRight, Map
} from 'lucide-react';
import Loader from '../../global/Loader';
import Karrivo from "../../assets/karrivoSymbol.png";

/* ── Font & Global Styles ─────────────────────────────────────────────────── */
const F = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

const globalStyles = `
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: ${F}; }
    button { font-family: ${F}; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
`;

/* ── Color tokens ─────────────────────────────────────────────────────────── */
const T = {
    primary: "#0098cc",
    btn: "#1a1a2e",
    bg: "#ffffff",
    surface: "#f8f9fb",
    border: "#e8eaed",
    textDark: "rgb(81, 87, 98)",
    textMid: "rgb(81, 87, 98)",
    textLight: "#9ca3af",
    error: "#dc2626",
    navActive: "#2563eb",
    navActiveBg: "#eff6ff",
};

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

/* ── NoSubscriptionPopup ─────────────────────────────────────────────────── */
const NoSubscriptionPopup = ({ isOpen, onClose, onSubscribe }) => {
    if (!isOpen) return null;
    return (
        <>
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.18)' }} />
            <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', zIndex: 301,
                width: '90%', maxWidth: 340, background: '#fff',
                border: `1px solid ${T.border}`, borderRadius: 14,
                padding: '18px 20px', fontFamily: F,
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
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#212c3d', marginBottom: 3 }}>No active subscription</p>
                        <p style={{ fontSize: 12, color: '#5a6a82', lineHeight: 1.5 }}>
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
                        background: '#f8fafc', border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer', color: '#5a6a82', fontFamily: F,
                    }}>Cancel</button>
                    <button onClick={onSubscribe} style={{
                        flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 700,
                        background: T.btn, border: 'none', borderRadius: 8, cursor: 'pointer', color: '#fff', fontFamily: F,
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
            <div style={{ position: 'relative', background: '#fff', border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, width: '100%', maxWidth: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', fontFamily: F }}>
                <h2 style={{ color: T.primary, fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Confirm Logout</h2>
                <p style={{ color: T.textMid, fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
                    Are you sure you want to log out? You'll need to sign in again to access your account.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: `1px solid ${T.btn}`, color: T.btn, background: '#fff', fontFamily: F, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                    <button onClick={onConfirm} style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none', background: T.btn, color: '#fff', fontFamily: F, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Log out</button>
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
        <div style={{
            position: 'absolute', right: 0, top: 52, width: 240,
            background: '#fff', border: `1px solid ${T.border}`,
            borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            zIndex: 50, overflow: 'hidden', fontFamily: F,
        }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    width: 36, height: 36, background: T.btn, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 600, fontSize: 13, flexShrink: 0, overflow: 'hidden',
                }}>
                    {profilePhotoUrl
                        ? <img src={profilePhotoUrl} alt={userData?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                        : initials}
                </div>
                <div style={{ minWidth: 0 }}>
                    <p style={{ color: T.primary, fontSize: 13, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userData?.name || 'User'}</p>
                    <p style={{ color: T.textLight, fontSize: 11, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userData?.email || ''}</p>
                </div>
            </div>
            <div style={{ padding: 6 }}>
                <button onClick={onProfileClick} style={{ width: '100%', textAlign: 'left', padding: '9px 12px', borderRadius: 7, fontFamily: F, fontSize: 13, color: T.textDark, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <User size={13} color={T.primary} /> View Profile
                </button>
                <button onClick={onLogoutClick} style={{ width: '100%', textAlign: 'left', padding: '9px 12px', borderRadius: 7, fontFamily: F, fontSize: 13, color: T.error, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LogOut size={13} color={T.error} /> Log out
                </button>
            </div>
        </div>
    );
};

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, currentPath, onLogout, hasSubscription, onLtmLocked, isMobile }) => {
    const navigate = useNavigate();
    const collapsed = !isMobile && !isSidebarOpen;

    const go = (path) => {
        navigate(path);
        if (isMobile) setIsSidebarOpen(false);
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
                style={{
                    display: 'flex', alignItems: 'center',
                    gap: collapsed ? 0 : 10,
                    padding: '9px 12px', borderRadius: 8, border: 'none',
                    background: isActive ? T.navActiveBg : 'transparent',
                    color: locked ? T.textLight : isActive ? T.navActive : T.textMid,
                    cursor: 'pointer', fontFamily: F, fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%', transition: 'all .12s ease',
                }}
            >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                {!collapsed && locked && <Lock size={11} color="#cbd5e1" style={{ flexShrink: 0 }} />}
            </button>
        );
    };

    const SidebarContent = () => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
            {/* Logo */}
            <div style={{
                height: 56, display: 'flex', alignItems: 'center',
                borderBottom: `1px solid ${T.border}`,
                padding: collapsed ? '0 12px' : '0 16px',
                flexShrink: 0,
            }}>
                {collapsed ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={Karrivo} alt="Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8 }} />
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={Karrivo} alt="Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8 }} />
                        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark }}>
                            Mentee Hub
                        </span>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {topNavigationItems.map(item => (
                    <NavItem key={item.id} item={item} locked={false} />
                ))}

                {!collapsed && (
                    <p style={{
                        fontSize: 10, fontWeight: 600, color: T.textLight,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        padding: '12px 12px 4px', fontFamily: F, margin: 0,
                    }}>
                        Long Term Mentorship
                    </p>
                )}

                {ltmNavigationItems.map(item => (
                    <NavItem key={item.id} item={item} locked={!hasSubscription} />
                ))}
            </nav>

            {/* Logout */}
            <div style={{ borderTop: `1px solid ${T.border}`, padding: '10px 8px', flexShrink: 0 }}>
                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex', alignItems: 'center',
                        gap: collapsed ? 0 : 10,
                        padding: '9px 12px', borderRadius: 8, border: 'none',
                        background: 'transparent', color: T.error,
                        cursor: 'pointer', fontFamily: F, fontSize: 14,
                        width: '100%',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                    }}
                >
                    <LogOut size={16} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside style={{
                width: collapsed ? 56 : 220,
                flexShrink: 0,
                borderRight: `1px solid ${T.border}`,
                background: '#fff',
                height: '100vh',
                position: 'sticky',
                top: 0,
                display: isMobile ? 'none' : 'flex',
                flexDirection: 'column',
                transition: 'width .2s ease',
                overflow: 'hidden',
            }}>
                <SidebarContent />
            </aside>

            {/* Mobile drawer */}
            {isMobile && (
                <>
                    <aside style={{
                        position: 'fixed', top: 0, left: 0, height: '100vh',
                        background: '#fff', borderRight: `1px solid ${T.border}`,
                        zIndex: 100, width: 220,
                        display: 'flex', flexDirection: 'column',
                        transition: 'transform .25s ease',
                        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    }}>
                        <SidebarContent />
                    </aside>
                    {isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 99 }}
                        />
                    )}
                </>
            )}
        </>
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
        <header style={{
            height: 56, borderBottom: `1px solid ${T.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 20px', background: '#fff', flexShrink: 0,
            position: 'sticky', top: 0, zIndex: 40, fontFamily: F,
        }}>
            <button
                onClick={() => setIsSidebarOpen(v => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textDark, display: 'flex', alignItems: 'center' }}
                aria-label="Toggle sidebar"
            >
                <Menu size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textLight, display: 'flex' }} aria-label="Help">
                    <HelpCircle size={20} />
                </button>
                <button
                    onClick={() => setIsProfileDropdownOpen(v => !v)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: T.btn, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#fff', fontSize: 12,
                        fontWeight: 600, overflow: 'hidden',
                    }}>
                        {profilePhotoUrl
                            ? <img src={profilePhotoUrl} alt={userData?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} onError={e => e.target.style.display = 'none'} />
                            : initials}
                    </div>
                    <ChevronDown size={14} color={T.textLight} />
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
    );
};



const RightPanel = ({ navigate }) => (
    <aside style={{
        width: 280, flexShrink: 0, borderLeft: `1px solid ${T.border}`,
        background: '#fff', display: 'flex', flexDirection: 'column',
        overflowY: 'auto', scrollbarWidth: 'none',
    }} className="right-panel">

        {/* Hero — book a trial */}
        <div style={{ margin: 14, borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a4a' }}>
            <div style={{ background: '#0a1a22', padding: '14px 16px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 500, color: '#ffffff', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: F }}>
                        Find your mentor
                    </span>
                    <span style={{ fontSize: 10, color: '#ffffff', background: '#0098cc18', border: '0.5px solid #0098cc44', borderRadius: 20, padding: '2px 8px', fontWeight: 500, fontFamily: F }}>
                        100+ mentors
                    </span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 500, color: '#f1f5f9', margin: '0 0 5px', lineHeight: 1.3, fontFamily: F }}>
                    Book a free trial session
                </p>
                <p style={{ fontSize: 11.5, color: '#ffffff', margin: 0, lineHeight: 1.6, fontFamily: F }}>
                    Browse by domain, skills, and availability.
                </p>
            </div>
            <div style={{ background: '#0a1a22', borderTop: '0.5px solid #ffffff10', padding: '10px 16px 14px' }}>
                <p style={{ fontSize: 10, color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: F }}>
                    Popular domains
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {['Product', 'Engineering', 'Startup', 'LeaderShip', 'Ai Mentors'].map(tag => (
                        <span key={tag} style={{
                            fontSize: 11, color: '#ffffff', background: '#ffffff0d',
                            border: '0.5px solid #ffffff14', borderRadius: 5,
                            padding: '3px 10px', fontFamily: F
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/explore-mentors')}
                    style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: '#0098cc', color: '#fff', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: F }}
                >
                    Explore all mentors <ArrowRight size={13} />
                </button>
            </div>
        </div>

        {/* Plan finder nudge */}
        {/* <div style={{ margin: '0 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, padding: '13px 14px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: '#0a1a2214', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Map size={15} color="#0a1a22" />
                </div>
                <div>
                    <p style={{ fontSize: 12.5, fontWeight: 500, color: T.textDark, margin: 0, fontFamily: F }}>Not sure which plan fits?</p>
                    <p style={{ fontSize: 11, color: T.textLight, margin: 0, fontFamily: F }}>Take a quick quiz to find out.</p>
                </div>
            </div>
            <button
                onClick={() => navigate('/plan-quiz')}
                style={{ width: '100%', padding: '7px 0', borderRadius: 8, background: '#fff', color: T.textDark, fontSize: 12, fontWeight: 500, border: `1px solid ${T.border}`, cursor: 'pointer', fontFamily: F }}
            >
                Find my plan →
            </button>
        </div> */}

        {/* RM card */}
        <div style={{ margin: '10px 14px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: '#fff', padding: '13px 14px' }}>
            <p style={{ fontSize: 10, fontWeight: 500, color: T.textLight, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 11px', fontFamily: F }}>
                Relationship manager
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#0a1a22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#0098cc', fontFamily: F }}>KR</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: T.textDark, margin: 0, fontFamily: F }}>Karrivo Team</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                        <p style={{ fontSize: 11, color: T.textLight, margin: 0, fontFamily: F }}>Available now</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                <a href="https://wa.me/917702193487" target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 0', borderRadius: 8, background: '#f0fdf4', border: '0.5px solid #bbf7d0', textDecoration: 'none' }}>
                    <MessageCircle size={14} color="#16a34a" />
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: '#16a34a', fontFamily: F }}>WhatsApp</span>
                </a>
                <a href="tel:+917702193487"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 0', borderRadius: 8, background: '#eff6ff', border: '0.5px solid #bfdbfe', textDecoration: 'none' }}>
                    <Phone size={14} color="#0098cc" />
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: '#0098cc', fontFamily: F }}>Call us</span>
                </a>
            </div>
        </div>

    </aside>
);

/* ── ProfileCompletionForm ────────────────────────────────────────────────── */
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
        ? <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4, fontFamily: F }}>{errors[field]}</p> : null;

    const inputStyle = (field) => ({
        width: '100%', padding: '8px 11px',
        border: `1.5px solid ${errors[field] ? '#f87171' : '#e2e8f0'}`,
        borderRadius: 8, fontSize: 13, color: '#0f172a',
        outline: 'none', boxSizing: 'border-box',
        background: errors[field] ? '#fff8f8' : '#fff',
        fontFamily: F, transition: 'border-color 0.15s',
    });

    const toggleStyle = (active) => ({
        padding: '9px', border: `1.5px solid ${active ? T.btn : '#e2e8f0'}`,
        borderRadius: 8, fontSize: 12, fontWeight: 500,
        background: active ? T.btn : '#fff',
        color: active ? '#fff' : '#64748b',
        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', fontFamily: F,
    });

    const labelStyle = {
        display: 'block', fontSize: 11, fontWeight: 500,
        color: '#64748b', letterSpacing: '0.04em',
        textTransform: 'uppercase', marginBottom: 5, fontFamily: F,
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', fontFamily: F }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0', width: '100%', maxWidth: 440, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px 16px', borderBottom: '0.5px solid #f0f4f8', textAlign: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: T.primary, margin: '0 0 3px', fontFamily: F }}>Complete your profile</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 14px', fontFamily: F }}>3 quick steps to get matched with the right mentor</p>
                    <div style={{ display: 'flex', gap: 5 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= currentStep ? T.primary : '#e2e8f0', transition: 'background 0.35s' }} />
                        ))}
                    </div>
                </div>
                <div style={{ padding: '18px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: T.primary, color: '#fff', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: F }}>{currentStep}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: T.primary, fontFamily: F }}>
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
                <div style={{ padding: '12px 24px', background: '#fafbfc', borderTop: '0.5px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: F }}>Step {currentStep} of 3</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1} style={{ padding: '7px 16px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 500, cursor: currentStep === 1 ? 'default' : 'pointer', opacity: currentStep === 1 ? 0.35 : 1, fontFamily: F }}>Back</button>
                        {currentStep < 3 ? (
                            <button onClick={handleNext} style={{ padding: '7px 18px', border: 'none', borderRadius: 8, background: T.btn, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: F }}>Continue →</button>
                        ) : (
                            <button onClick={handleSubmit} disabled={saving} style={{ padding: '7px 18px', border: 'none', borderRadius: 8, background: T.btn, color: '#fff', fontSize: 13, fontWeight: 500, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 6, fontFamily: F }}>
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

/* ── MenteeDashboard ──────────────────────────────────────────────────────── */
const MenteeDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = globalStyles + `
            @media (max-width: 1024px) { .right-panel { display: none !important; } }
        `;
        document.head.appendChild(style);
        return () => { if (style.parentNode) document.head.removeChild(style); };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    const { data: profileData, isLoading, isSuccess, isError } =
        useGetMenteeProfileQuery(userId, { skip: !userId });

    const { data: subscriptions = [] } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const hasSubscription = subscriptions.length > 0;

    const [saveMenteeProfile, { isLoading: saving }] = useSaveMenteeProfileMutation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [serverErrors, setServerErrors] = useState({});
    const [showLtmPopup, setShowLtmPopup] = useState(false);

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
            const email = getUserEmail();
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
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb' }}>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

                {/* Left Sidebar — full height, outside the column */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    currentPath={location.pathname}
                    onLogout={() => setIsLogoutModalOpen(true)}
                    hasSubscription={hasSubscription}
                    onLtmLocked={() => setShowLtmPopup(true)}
                    isMobile={isMobile}
                />

                {/* Right column — header + content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

                    {/* Header */}
                    <Header
                        userData={userData}
                        isProfileDropdownOpen={isProfileDropdownOpen}
                        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
                        profilePhotoUrl={profilePhotoUrl}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        onProfileClick={() => { navigate('/mentee/profile'); setIsProfileDropdownOpen(false); }}
                        onLogoutClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }}
                    />

                    {/* Body — content + right panel */}
                    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

                        {/* Center scrollable content */}
                        <main style={{ flex: 1, overflowY: 'auto', background: '#fff', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <Outlet context={{ userData, profile }} />
                        </main>

                        {/* Right panel */}
                        <RightPanel navigate={navigate} />

                    </div>
                </div>
            </div>

            {isProfileDropdownOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setIsProfileDropdownOpen(false)} />
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
                <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
                    <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.5)' }} />
                    <div style={{ position: 'relative', zIndex: 10 }}>
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


