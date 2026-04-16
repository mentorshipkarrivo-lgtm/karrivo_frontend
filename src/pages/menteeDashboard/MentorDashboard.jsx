



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
    BookOpen, CreditCard, Loader2, Lock,
} from 'lucide-react';
import Loader from '../../global/Loader';

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
    { id: 'bookings', label: 'Trial Sessions', icon: Users, path: '/mentee/bookings' },
    { id: 'profile', label: 'Profile Settings', icon: User, path: '/mentee/profile' },
    { id: 'support', label: 'Help & Support', icon: HelpCircle, path: '/mentee/support' },
];

const ltmNavigationItems = [
    // { id: 'ltm-home', label: 'Mentorship Home', icon: Home, path: '/mentee/ltm-home' },
    { id: 'upcoming-sessions', label: 'Upcoming Sessions', icon: Clock, path: '/mentee/upcoming' },
    { id: 'completed', label: 'Session History', icon: BookOpen, path: '/mentee/completed_sessions' },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard, path: '/mentee/subscription' },
    { id: 'mentor', label: 'My Mentor', icon: User, path: '/mentee/mentor' },
    { id: 'menteePayments', label: 'Mentee Payments', icon: MessageCircle, path: '/mentee/mentee-payments' },
    // { id: 'performance', label: 'Performance Overview', icon: MessageCircle, path: '/mentee/performance-tracking' },
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
            <div
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.18)' }}
            />
            <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', zIndex: 301,
                width: '90%', maxWidth: 340, background: '#fff',
                border: '1px solid #e4e8ee', borderRadius: 14,
                padding: '18px 20px', boxSizing: 'border-box',
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
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#212c3d', marginBottom: 3 }}>
                            No active subscription
                        </p>
                        <p style={{ fontSize: 12, color: '#5a6a82', lineHeight: 1.5 }}>
                            Subscribe to a mentorship plan to unlock long-term mentorship features.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                    >
                        <X size={15} color="#94a3b8" />
                    </button>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={onClose} style={{
                        flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 600,
                        background: '#f8fafc', border: '1px solid #e4e8ee',
                        borderRadius: 8, cursor: 'pointer', color: '#5a6a82',
                    }}>Cancel</button>
                    <button onClick={onSubscribe} style={{
                        flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 700,
                        background: '#212c3d', border: 'none',
                        borderRadius: 8, cursor: 'pointer', color: '#fff',
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-lg p-6 w-80 shadow-xl mx-4">
                <h2 className="text-lg font-bold mb-2">Confirm Logout</h2>
                <p className="text-gray-600 mb-6 text-sm">Are you sure you want to logout?</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Logout</button>
                </div>
            </div>
        </div>
    );
};

/* ── ProfileDropdown ──────────────────────────────────────────────────────── */
const ProfileDropdown = ({ userData, onProfileClick, onLogoutClick, isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
            <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#062117] rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {userData?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{userData?.name}</div>
                        <div className="text-xs text-gray-500 truncate">{userData?.email}</div>
                    </div>
                </div>
            </div>
            <button onClick={onProfileClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                <User size={16} /> View Profile
            </button>
            <button onClick={onLogoutClick} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                <LogOut size={16} /> Logout
            </button>
        </div>
    );
};

/* ── ProfileCompletionForm ────────────────────────────────────────────────── */
const ProfileCompletionForm = ({ onComplete, saving, serverErrors }) => {
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
            if (!formData.fullName || formData.fullName.trim().length < 2) errs.fullName = 'Full name is required (min 2 chars)';
            if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
            if (!formData.address || formData.address.trim().length < 5) errs.address = 'Address is required (min 5 chars)';
        }
        if (step === 2) {
            if (!formData.currentStatus) errs.currentStatus = 'Select your status';
            if (!formData.highestEducation) errs.highestEducation = 'Select education level';
        }
        if (step === 3) {
            if (!formData.menteeType) errs.menteeType = 'Select a mentor type';
        }
        setClientErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(s => s + 1); };
    const handleSubmit = () => { if (validateStep(3)) onComplete(formData); };
    const errors = { ...serverErrors, ...clientErrors };
    const FieldError = ({ field }) => errors[field]
        ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        : null;

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
                <div className="px-6 py-5 border-b">
                    <h1 className="text-xl sm:text-2xl font-bold">Complete Your Profile</h1>
                    <p className="text-sm text-gray-600 mt-1">Just 3 simple steps</p>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-2 flex-1 rounded ${s <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                </div>
                <div className="px-6 py-5">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Personal Information</h2>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Full Name *</label>
                                <input type="text" value={formData.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Enter your full name"
                                    className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.fullName ? 'border-red-400' : ''}`} />
                                <FieldError field="fullName" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Date of Birth *</label>
                                <input type="date" value={formData.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.dateOfBirth ? 'border-red-400' : ''}`} />
                                <FieldError field="dateOfBirth" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Address *</label>
                                <textarea value={formData.address} onChange={e => set('address', e.target.value)} rows="2"
                                    className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.address ? 'border-red-400' : ''}`} />
                                <FieldError field="address" />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Experience & Education</h2>
                            <div>
                                <label className="block text-xs font-medium mb-2">Current Status *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['fresher', 'experienced'].map(s => (
                                        <button key={s} onClick={() => set('currentStatus', s)}
                                            className={`p-3 border-2 rounded-lg text-sm ${formData.currentStatus === s ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <FieldError field="currentStatus" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Highest Education *</label>
                                <select value={formData.highestEducation} onChange={e => set('highestEducation', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.highestEducation ? 'border-red-400' : ''}`}>
                                    <option value="">Select education</option>
                                    <option value="High School">High School</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelors Degree">Bachelors Degree</option>
                                    <option value="Masters Degree">Masters Degree</option>
                                    <option value="phd">PhD</option>
                                    <option value="Others">Others</option>
                                </select>
                                <FieldError field="highestEducation" />
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">What Type of Mentor You Want?</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {menteeTypes.map(type => (
                                    <button key={type} onClick={() => set('menteeType', type)}
                                        className={`p-2.5 border-2 rounded-lg text-left ${formData.menteeType === type ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                        <span className="text-xs font-medium">{type}</span>
                                    </button>
                                ))}
                            </div>
                            <FieldError field="menteeType" />
                        </div>
                    )}
                </div>
                <div className="px-5 py-4 bg-gray-50 flex justify-between border-t">
                    <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1}
                        className="px-4 py-2 rounded-lg disabled:opacity-50 text-sm border hover:bg-gray-100">
                        Previous
                    </button>
                    {currentStep < 3 ? (
                        <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                            Next
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={saving}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 text-sm">
                            {saving && <Loader2 size={16} className="animate-spin" />}
                            {saving ? 'Saving...' : 'Complete'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Header ───────────────────────────────────────────────────────────────── */
const Header = ({
    isSidebarOpen, setIsSidebarOpen,
    userData, isProfileDropdownOpen, setIsProfileDropdownOpen,
    onProfileClick, onLogoutClick, currentPath,
}) => (
    <header className="bg-white border-b px-3 sm:px-6 py-0 flex items-center justify-between sticky top-0 z-40 h-[65px] flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Toggle sidebar"
            >
                <Menu size={22} className="text-gray-600" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                {getPageLabel(currentPath)}
            </h1>
        </div>
        <div className="relative flex-shrink-0">
            <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-9 h-9 bg-[#062117] rounded-full flex items-center justify-center text-white text-sm font-medium"
            >
                {userData?.name?.charAt(0) || 'U'}
            </button>
            <ProfileDropdown
                userData={userData}
                isOpen={isProfileDropdownOpen}
                onProfileClick={onProfileClick}
                onLogoutClick={onLogoutClick}
            />
        </div>
    </header>
);

/* ── Tooltip ──────────────────────────────────────────────────────────────── */
const Tooltip = ({ label, children }) => (
    <div className="relative group/tip w-full flex justify-center">
        {children}
        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-[60]">
            {label}
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
        </div>
    </div>
);

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, currentPath, onLogout, hasSubscription, onLtmLocked }) => {
    const navigate = useNavigate();
    const collapsed = !isSidebarOpen;

    const go = (path) => {
        navigate(path);
        if (window.innerWidth < 640) setIsSidebarOpen(false);
    };

    const NavItem = ({ item, locked }) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        const handleClick = () => {
            if (locked) { onLtmLocked(); return; }
            go(item.path);
        };

        const btn = (
            <button
                onClick={handleClick}
                className={`
                    flex items-center gap-3 rounded-lg transition-all duration-150 text-sm w-full
                    ${collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'}
                    ${locked
                        ? 'text-gray-400 cursor-pointer hover:bg-gray-50'
                        : isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                    }
                `}
            >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                    <span className="whitespace-nowrap flex-1 text-left text-sm leading-snug">{item.label}</span>
                )}
                {locked && !collapsed && (
                    <Lock size={11} color="#cbd5e1" className="flex-shrink-0" />
                )}
            </button>
        );

        return collapsed
            ? <Tooltip label={locked ? `${item.label} — Subscribe to unlock` : item.label}>{btn}</Tooltip>
            : btn;
    };

    /* Shared nav content for both desktop and mobile */
    const NavContent = ({ mobile = false }) => (
        <div className="space-y-0.5">
            {topNavigationItems.map(item => (
                <NavItem key={item.id} item={item} locked={false} />
            ))}

            {/* Section divider */}
            {!collapsed || mobile ? (
                <p className="text-[10px] font-semibold text-gray-400 uppercase px-3 pt-4 pb-1.5 tracking-widest">
                    Long-Term Mentorship
                </p>
            ) : (
                <div className="flex justify-center my-2">
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5 leading-none">
                        LTM
                    </span>
                </div>
            )}

            {ltmNavigationItems.map(item => (
                <NavItem key={item.id} item={item} locked={!hasSubscription} />
            ))}
        </div>
    );

    const LogoutButton = ({ mobile = false }) => (
        collapsed && !mobile ? (
            <Tooltip label="Logout">
                <button
                    onClick={onLogout}
                    className="flex items-center justify-center w-full py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                >
                    <LogOut size={18} />
                </button>
            </Tooltip>
        ) : (
            <button
                onClick={onLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-all"
            >
                <LogOut size={18} />
                <span className="whitespace-nowrap">Logout</span>
            </button>
        )
    );

    return (
        <>
            {/* ── Desktop sidebar ── */}
            <aside
                className="hidden sm:flex flex-col flex-shrink-0 bg-white border-r z-50 h-screen sticky top-0 transition-[width] duration-300 ease-in-out overflow-hidden"
                style={{ width: collapsed ? '64px' : '240px' }}
            >
                {/* Logo */}
                <div className={`flex items-center border-b flex-shrink-0 h-[65px] transition-all duration-300 ${collapsed ? 'justify-center' : 'px-5'}`}>
                    {collapsed
                        ? <span className="text-[#062117] font-black text-xl select-none">M</span>
                        : <span className="text-xl font-bold text-[#062117] tracking-tight whitespace-nowrap">MenteeHub</span>
                    }
                </div>

                {/* Nav — scrollable, takes remaining space */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 min-h-0">
                    <NavContent />
                </nav>

                {/* Logout — always pinned at bottom */}
                <div className="px-2 py-3 border-t flex-shrink-0">
                    <LogoutButton />
                </div>
            </aside>

            {/* ── Mobile drawer ── */}
            <aside className={`
                fixed top-0 left-0 h-screen bg-white border-r z-50 w-64
                transition-transform duration-300 ease-in-out flex flex-col sm:hidden
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 border-b h-[65px] flex-shrink-0">
                    <span className="text-xl font-bold text-[#062117]">MenteeHub</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded hover:bg-gray-100">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/*
                  ✅ FIX: Nav takes only the space its content needs (no flex-1),
                  capped with max-height + overflow-y-auto so it scrolls if needed.
                  Logout sits naturally right below it with no massive gap.
                */}
                <nav className="overflow-y-auto py-3 px-3" style={{ maxHeight: 'calc(100vh - 65px - 56px)' }}>
                    <NavContent mobile />
                </nav>

                {/* Logout — directly below nav, no gap */}
                <div className="px-3 py-3 border-t mt-auto flex-shrink-0">
                    <LogoutButton mobile />
                </div>
            </aside>

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
};

/* ── MenteeDashboard ──────────────────────────────────────────────────────── */
const MenteeDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

    /* Close sidebar by default on mobile */
    useEffect(() => {
        if (window.innerWidth < 640) setIsSidebarOpen(false);
    }, []);

    /* Load user data */
    useEffect(() => {
        const localUser = localStorage.getItem('userData');
        const cookieUser = getCookie('userData');
        if (localUser) {
            try { setUserData(JSON.parse(localUser)); } catch { }
        } else if (cookieUser) {
            try { setUserData(JSON.parse(decodeURIComponent(cookieUser))); } catch { }
        }
    }, []);

    /* Cache profile in cookie */
    useEffect(() => {
        if (isSuccess && profileData) {
            const encoded = encodeURIComponent(JSON.stringify(profileData));
            document.cookie = `profileData=${encoded}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
    }, [isSuccess, profileData]);

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
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="h-screen bg-white flex overflow-hidden">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    currentPath={location.pathname}
                    onLogout={() => setIsLogoutModalOpen(true)}
                    hasSubscription={hasSubscription}
                    onLtmLocked={() => setShowLtmPopup(true)}
                />

                {/* Main area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        userData={userData}
                        isProfileDropdownOpen={isProfileDropdownOpen}
                        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
                        currentPath={location.pathname}
                        onProfileClick={() => {
                            navigate('/mentee/profile');
                            setIsProfileDropdownOpen(false);
                        }}
                        onLogoutClick={() => {
                            setIsProfileDropdownOpen(false);
                            setIsLogoutModalOpen(true);
                        }}
                    />
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <Outlet context={{ userData, profile }} />
                    </main>
                </div>

                {/* Close dropdown on outside click */}
                {isProfileDropdownOpen && (
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsProfileDropdownOpen(false)}
                    />
                )}

                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                />
            </div>

            {/* No-subscription popup */}
            <NoSubscriptionPopup
                isOpen={showLtmPopup}
                onClose={() => setShowLtmPopup(false)}
                onSubscribe={() => {
                    setShowLtmPopup(false);
                    navigate('/explore-mentors');
                }}
            />

            {/* Profile completion overlay */}
            {showOnboarding && (
                <div className="fixed inset-0 z-[100]">
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

