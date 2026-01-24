import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Bell, Menu, X, LogOut, User, Briefcase, Target, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Users, HelpCircle, BookOpen, CreditCard, Trophy, Linkedin, UserPlus, Gift } from 'lucide-react';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// 🔥 FIXED: Updated navigation items with correct paths matching App.jsx
const topNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/mentee/dashboard' },
    { id: 'bookings', label: 'Trial Sessions', icon: Users, path: '/mentee/bookings' },
    { id: 'yourmeetings', label: 'Your Meetings', icon: Users, path: '/mentee/yourmeetings' },
    { id: 'bookingsessions', label: 'Chat & Messages', icon: MessageSquare, path: '/mentee/bookingsessions' },
    { id: 'profile', label: 'Profile Settings', icon: User, path: '/mentee/profile' },
    { id: 'support', label: 'Help & Support', icon: HelpCircle, path: '/mentee/support' },
];

const ltmNavigationItems = [
    { id: 'ltm-home', label: 'Mentorship Home', icon: Home, path: '/mentee/ltm-home' },
    { id: 'sessions', label: 'Session History', icon: BookOpen, path: '/mentee/sessions' },
    { id: 'tasks', label: 'Tasks & Assignments', icon: Briefcase, path: '/mentee/tasks' },
    { id: 'goals', label: 'Goals & Milestones', icon: Target, path: '/mentee/goals' },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard, path: '/mentee/subscription' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, path: '/mentee/achievements' },
    { id: 'linkedin', label: 'Profile Builder', icon: Linkedin, path: '/mentee/linkedin' },
    { id: 'referrals', label: 'Refer & Earn', icon: UserPlus, path: '/mentee/referrals' },
    { id: 'gift', label: 'Gift a Session', icon: Gift, path: '/mentee/gift' },
];

const menteeTypes = ['All Mentors', 'Engineering Mentors', 'Top Mentors', 'Startup Mentors', 'Product Mentors', 'Marketing Mentors', 'Leadership Mentors', 'AI Mentors'];

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                    <LogOut className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Confirm Logout</h2>
                <p className="text-gray-600 text-center mb-6">Are you sure you want to logout?</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 bg-gray-100 py-3 rounded-lg hover:bg-gray-200">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">Logout</button>
                </div>
            </div>
        </div>
    );
};

const ProfileDropdown = ({ userData, onProfileClick, onLogoutClick, isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-lg z-50">
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#062117] rounded-full flex items-center justify-center text-white font-bold">
                        {userData?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="font-semibold">{userData?.name}</p>
                        <p className="text-sm text-gray-500">{userData?.email}</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <button onClick={onProfileClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                    <User size={18} />
                    <span>View Profile</span>
                </button>
                <button onClick={onLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const ProfileCompletionForm = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', dateOfBirth: '', address: '', status: '', education: '', menteeType: '' });

    const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const isStep1Valid = formData.name && formData.dateOfBirth && formData.address;
    const isStep2Valid = formData.status && formData.education;
    const isStep3Valid = formData.menteeType;

    const handleSubmit = () => {
        const profileData = { ...formData, profileCompleted: true };
        document.cookie = `profileData=${encodeURIComponent(JSON.stringify(profileData))}; path=/; max-age=31536000`;
        onComplete(profileData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
                    <h1 className="text-xl font-bold">Complete Your Profile</h1>
                    <p className="text-sm">Just 3 simple steps</p>
                </div>
                <div className="px-5 py-4 min-h-[320px]">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Personal Information</h2>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Full Name *</label>
                                <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter your full name" className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Date of Birth *</label>
                                <input type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Address *</label>
                                <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} rows="2" className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Experience & Education</h2>
                            <div>
                                <label className="block text-xs font-medium mb-2">Current Status *</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['fresher', 'experienced', 'batch'].map(status => (
                                        <button key={status} onClick={() => handleInputChange('status', status)} className={`p-3 border-2 rounded-lg ${formData.status === status ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5">Highest Education *</label>
                                <select value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                                    <option value="">Select education</option>
                                    <option value="high-school">High School</option>
                                    <option value="bachelors">Bachelor's</option>
                                    <option value="masters">Master's</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">What Type of Mentor You Want?</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {menteeTypes.map(type => (
                                    <button key={type} onClick={() => handleInputChange('menteeType', type)} className={`p-2.5 border-2 rounded-lg text-left ${formData.menteeType === type ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                        <span className="text-xs font-medium">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="px-5 py-4 bg-gray-50 flex justify-between border-t">
                    <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1} className="px-4 py-2 rounded-lg disabled:opacity-50">Previous</button>
                    {currentStep < 3 ? (
                        <button onClick={() => setCurrentStep(s => s + 1)} disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">Next</button>
                    ) : (
                        <button onClick={handleSubmit} disabled={!isStep3Valid} className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">Complete</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Header = ({ isSidebarOpen, setIsSidebarOpen, userData, isProfileDropdownOpen, setIsProfileDropdownOpen, onProfileClick, onLogoutClick }) => (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden">
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#062117] rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <h1 className="text-xl font-bold">MenteeHub</h1>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="w-10 h-10 bg-[#062117] rounded-full flex items-center justify-center text-white">
                    {userData?.name?.charAt(0) || 'U'}
                </button>
                <ProfileDropdown userData={userData} isOpen={isProfileDropdownOpen} onProfileClick={onProfileClick} onLogoutClick={onLogoutClick} />
            </div>
        </div>
    </header>
);

// 🔥 FIXED: Sidebar component with proper navigation
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, currentPath, onLogout }) => {
    const navigate = useNavigate();

    // 🔥 FIX: Use navigate directly without window check
    const handleNavigation = (path) => {
        console.log('Navigating to:', path); // Debug log
        navigate(path);
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r transition-transform z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 overflow-y-auto`}>
            <div className="p-6">
                <nav className="space-y-2 mb-8">
                    {topNavigationItems.map(item => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.path;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <Icon size={20} />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
                <div className="border-t pt-6">
                    <h3 className="text-gray-400 text-xs uppercase mb-4 px-4">Long Term Mentorship</h3>
                    <nav className="space-y-2">
                        {ltmNavigationItems.map(item => {
                            const Icon = item.icon;
                            const isActive = currentPath === item.path;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                                >
                                    <Icon size={20} />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-6 pt-6 border-t">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
                        <LogOut size={20} />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

const MenteeDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(false);

    // 🔥 DEBUG: Log current path
    useEffect(() => {
        console.log('Current path:', location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const userDataCookie = getCookie('userData');
        if (userDataCookie) {
            try {
                setUserData(JSON.parse(decodeURIComponent(userDataCookie)));
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }

        const profileDataCookie = getCookie('profileData');
        if (profileDataCookie) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(profileDataCookie));
                setShowOnboarding(!parsedData.profileCompleted);
            } catch (e) {
                setShowOnboarding(true);
            }
        } else {
            setShowOnboarding(true);
        }
    }, []);

    const handleProfileComplete = (data) => {
        setShowOnboarding(false);
        const mergedData = { ...userData, ...data };
        setUserData(mergedData);
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(mergedData))}; path=/; max-age=86400`;
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setTimeout(() => window.location.href = '/login', 100);
    };

    return (
        <>
            <div className="min-h-screen bg-white flex">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    currentPath={location.pathname}
                    onLogout={() => setIsLogoutModalOpen(true)}
                />
                <div className="flex-1 flex flex-col">
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        userData={userData}
                        isProfileDropdownOpen={isProfileDropdownOpen}
                        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
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
                        <Outlet context={{ userData }} />
                    </main>
                </div>
                {isSidebarOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={() => setIsSidebarOpen(false)} />}
                {isProfileDropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />}
                <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
            </div>
            {showOnboarding && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>
                    <div className="relative z-10">
                        <ProfileCompletionForm onComplete={handleProfileComplete} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MenteeDashboard;





