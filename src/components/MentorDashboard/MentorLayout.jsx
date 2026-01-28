// ============================================
// FILE: MentorLayout.jsx (Updated with Routes)
// ============================================

import React, { useState, useEffect } from 'react';
import { Home, Calendar, Bell, User, BookOpen, Users, MessageSquare, DollarSign, Star, HelpCircle, Menu, X, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Logout Modal Component
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6 max-w-md w-full">
                <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
                    <LogOut className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-white text-2xl font-bold text-center mb-2">Confirm Logout</h2>
                <p className="text-gray-400 text-center mb-6">
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#0098cc]/10 text-white py-3 rounded-lg hover:bg-[#0098cc]/20 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

// Profile Dropdown Component
const ProfileDropdown = ({ onLogoutClick, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [userinfo, setuserinfo] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setuserinfo(parsedUser);
        }
    }, []);

    if (!isOpen) return null;

    const handleProfileClick = () => {
        navigate("/mentor-profile");
        onClose?.();
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#062117] rounded-full flex items-center justify-center text-white font-bold">
                        {userinfo?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-[#062117]">{userinfo?.name}</p>
                        <p className="text-sm text-gray-500">{userinfo?.email}</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    <User size={18} />
                    <span>View Profile</span>
                </button>
                <button
                    onClick={onLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

// Navigation items configuration with routes
const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/mentor/dashboard' },
    { id: 'sessions', label: 'My Sessions', icon: BookOpen, route: '/mentor/dashboard/sessions' },
    { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/mentor-dashboard/earnings' },
    { id: 'reviews', label: 'Reviews', icon: Star, route: '/mentor-dashboard/reviews' },
    { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/mentor-dashboard/support' },
];

// Main Layout Component
const MentorLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/';
    };

    const handleNavigate = (route) => {
        navigate(route);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    // Determine active route
    const isActiveRoute = (route) => {
        if (route === '/mentor/dashboard') {
            return location.pathname === '/mentor/dashboard' || location.pathname === '/mentor/dashboard/';
        }
        return location.pathname.startsWith(route);
    };

    const Header = () => (
        <header className="bg-[#062117] border-b border-[#0098cc]/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden text-white hover:text-[#0098cc] transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0098cc] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <h1 className="text-white text-xl font-bold">MentorHub</h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="hidden md:block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#062117] placeholder-gray-400 focus:outline-none focus:border-[#062117]"
                />
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                    <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#0098cc]/90 transition-colors"
                    >
                        {userData?.name?.charAt(0) || 'U'}
                    </button>
                    <ProfileDropdown
                        isOpen={isProfileDropdownOpen}
                        onClose={() => setIsProfileDropdownOpen(false)}
                        onLogoutClick={() => {
                            setIsProfileDropdownOpen(false);
                            setIsLogoutModalOpen(true);
                        }}
                    />
                </div>
            </div>
        </header>
    );

    const Sidebar = () => (
        <aside className={`
      fixed lg:sticky top-0 left-0 h-screen bg-[#062117] border-r border-[#0098cc]/20 
      transition-transform duration-300 z-50
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      w-64 overflow-y-auto
    `}>
            <div className="p-6">
                <nav className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.route);
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.route)}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-[#0098cc] text-white'
                                        : 'text-gray-300 hover:bg-[#0098cc]/10 hover:text-white'}
                `}
                            >
                                <Icon size={20} />
                                <span className="flex-1 text-left">{item.label}</span>
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="flex-1 text-left">Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-[#0a1612] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default MentorLayout;