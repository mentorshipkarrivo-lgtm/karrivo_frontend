// // ============================================
// // FILE: MentorLayout (Updated with Routes)
// // ============================================

// import React, { useState, useEffect } from 'react';
// import { Home, Calendar, Bell, User, BookOpen, Users, MessageSquare, DollarSign, Star, HelpCircle, Menu, X, LogOut } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// // Logout Modal Component
// const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6 max-w-md w-full">
//                 <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
//                     <LogOut className="w-8 h-8 text-red-400" />
//                 </div>
//                 <h2 className="text-white text-2xl font-bold text-center mb-2">Confirm Logout</h2>
//                 <p className="text-gray-400 text-center mb-6">
//                     Are you sure you want to logout? You'll need to sign in again to access your account.
//                 </p>
//                 <div className="flex gap-4">
//                     <button
//                         onClick={onClose}
//                         className="flex-1 bg-[#0098cc]/10 text-white py-3 rounded-lg hover:bg-[#0098cc]/20 transition-colors"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Profile Dropdown Component
// const ProfileDropdown = ({ onLogoutClick, isOpen, onClose }) => {
//     const navigate = useNavigate();
//     const [userinfo, setuserinfo] = useState(null);

//     useEffect(() => {
//         const userData = localStorage.getItem("userData");
//         if (userData) {
//             const parsedUser = JSON.parse(userData);
//             setuserinfo(parsedUser);
//         }
//     }, []);

//     if (!isOpen) return null;

//     const handleProfileClick = () => {
//         navigate("/mentor-profile");
//         onClose?.();
//     };

//     return (
//         <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
//             <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-[#062117] rounded-full flex items-center justify-center text-white font-bold">
//                         {userinfo?.name?.charAt(0) || 'U'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="font-semibold text-[#062117]">{userinfo?.name}</p>
//                         <p className="text-sm text-gray-500">{userinfo?.email}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-2">
//                 <button
//                     onClick={handleProfileClick}
//                     className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                     <User size={18} />
//                     <span>View Profile</span>
//                 </button>
//                 <button
//                     onClick={onLogoutClick}
//                     className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
//                 >
//                     <LogOut size={18} />
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Navigation items configuration with routes
// const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/mentor/dashboard' },
//     { id: 'sessions', label: 'My Sessions', icon: BookOpen, route: '/mentor/dashboard/sessions' },
//     { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/mentor-dashboard/earnings' },
//     { id: 'reviews', label: 'Reviews', icon: Star, route: '/mentor-dashboard/reviews' },
//     { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/mentor-dashboard/support' },
// ];

// // Main Layout Component
// const MentorLayout = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [userData, setUserData] = useState(null);
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const userData = localStorage.getItem("userData");
//         if (userData) {
//             setUserData(JSON.parse(userData));
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userData');
//         window.location.href = '/';
//     };

//     const handleNavigate = (route) => {
//         navigate(route);
//         if (window.innerWidth < 1024) setIsSidebarOpen(false);
//     };

//     // Determine active route
//     const isActiveRoute = (route) => {
//         if (route === '/mentor/dashboard') {
//             return location.pathname === '/mentor/dashboard' || location.pathname === '/mentor/dashboard/';
//         }
//         return location.pathname.startsWith(route);
//     };

//     const Header = () => (
//         <header className="bg-[#062117] border-b border-[#0098cc]/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
//             <div className="flex items-center gap-4">
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="lg:hidden text-white hover:text-[#0098cc] transition-colors"
//                 >
//                     {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-[#0098cc] rounded-lg flex items-center justify-center">
//                         <span className="text-white font-bold text-xl">M</span>
//                     </div>
//                     <h1 className="text-white text-xl font-bold">MentorHub</h1>
//                 </div>
//             </div>

//             <div className="flex items-center gap-4">
//                 {/* <input
//                     type="text"
//                     placeholder="Search..."
//                     className="hidden md:block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#062117] placeholder-gray-400 focus:outline-none focus:border-[#062117]"
//                 /> */}
//                 {/* <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <Bell size={20} className="text-gray-600" />
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                 </button> */}
//                 <div className="relative">
//                     <button
//                         onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                         className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#0098cc]/90 transition-colors"
//                     >
//                         {userData?.name?.charAt(0) || 'U'}
//                     </button>
//                     <ProfileDropdown
//                         isOpen={isProfileDropdownOpen}
//                         onClose={() => setIsProfileDropdownOpen(false)}
//                         onLogoutClick={() => {
//                             setIsProfileDropdownOpen(false);
//                             setIsLogoutModalOpen(true);
//                         }}
//                     />
//                 </div>
//             </div>
//         </header>
//     );

//     const Sidebar = () => (
//         <aside className={`
//       fixed lg:sticky top-0 left-0 h-screen bg-[#062117] border-r border-[#0098cc]/20 
//       transition-transform duration-300 z-50
//       ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       w-64 overflow-y-auto
//     `}>
//             <div className="p-6">
//                 <nav className="space-y-2">
//                     {navigationItems.map((item) => {
//                         const Icon = item.icon;
//                         const isActive = isActiveRoute(item.route);
//                         return (
//                             <button
//                                 key={item.id}
//                                 onClick={() => handleNavigate(item.route)}
//                                 className={`
//                   w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
//                   ${isActive
//                                         ? 'bg-[#0098cc] text-white'
//                                         : 'text-gray-300 hover:bg-[#0098cc]/10 hover:text-white'}
//                 `}
//                             >
//                                 <Icon size={20} />
//                                 <span className="flex-1 text-left">{item.label}</span>
//                             </button>
//                         );
//                     })}
//                     <button
//                         onClick={() => setIsLogoutModalOpen(true)}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
//                     >
//                         <LogOut size={20} />
//                         <span className="flex-1 text-left">Logout</span>
//                     </button>
//                 </nav>
//             </div>
//         </aside>
//     );

//     return (
//         <div className="min-h-screen bg-[#0a1612] flex">
//             <Sidebar />
//             <div className="flex-1 flex flex-col min-h-screen">
//                 <Header />
//                 <main className="flex-1 overflow-y-auto">
//                     {children}
//                 </main>
//             </div>
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 lg:hidden z-40"
//                     onClick={() => setIsSidebarOpen(false)}
//                 />
//             )}
//             <LogoutModal
//                 isOpen={isLogoutModalOpen}
//                 onClose={() => setIsLogoutModalOpen(false)}
//                 onConfirm={handleLogout}
//             />
//         </div>
//     );
// };

// export default MentorLayout;




// // ============================================
// // FILE: MentorLayout (Collapsible Sidebar)
// // ============================================
// import React, { useState, useEffect } from 'react';
// import { Home, BookOpen, DollarSign, Star, HelpCircle, Menu, X, LogOut } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// // Navigation items
// const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/mentor/dashboard' },
//     { id: 'sessions', label: 'My Sessions', icon: BookOpen, route: '/mentor/dashboard/sessions' },
//     { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/mentor/dashboard/earnings' },
//     { id: 'reviews', label: 'Reviews', icon: Star, route: '/mentor/dashboard/reviews' },
//     { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/mentor-dashboard/support' },
// ];

// // Logout Modal
// const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-[#031610] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
//                 <h2 className="text-white text-xl font-semibold mb-2">Confirm Logout</h2>
//                 <p className="text-white/70 text-sm mb-6">
//                     Are you sure you want to logout? You'll need to sign in again to access your account.
//                 </p>
//                 <div className="flex gap-3">
//                     <button
//                         onClick={onClose}
//                         className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Profile Dropdown
// const ProfileDropdown = ({ onLogoutClick, isOpen, onClose }) => {
//     const navigate = useNavigate();
//     const [userinfo, setuserinfo] = useState(null);

//     useEffect(() => {
//         const userData = localStorage.getItem('userData');
//         if (userData) setuserinfo(JSON.parse(userData));
//     }, []);

//     if (!isOpen) return null;

//     return (
//         <div className="absolute right-0 top-14 w-64 bg-[#031610] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
//             <div className="p-4 border-b border-white/10 flex items-center gap-3">
//                 <div className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
//                     {userinfo?.name?.charAt(0) || 'U'}
//                 </div>
//                 <div className="min-w-0">
//                     <p className="text-white text-sm font-medium truncate">{userinfo?.name}</p>
//                     <p className="text-white/70 text-xs truncate">{userinfo?.email}</p>
//                 </div>
//             </div>
//             <div className="p-2">
//                 <button
//                     onClick={() => { navigate('/mentor-profile'); onClose?.(); }}
//                     className="w-full text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-colors text-sm"
//                 >
//                     View Profile
//                 </button>
//                 <button
//                     onClick={onLogoutClick}
//                     className="w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Main Layout
// const MentorLayout = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [userData, setUserData] = useState(null);
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const stored = localStorage.getItem('userData');
//         if (stored) setUserData(JSON.parse(stored));
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userData');
//         window.location.href = '/';
//     };

//     const handleNavigate = (route) => {
//         navigate(route);
//     };

//     const isActiveRoute = (route) => {
//         if (route === '/mentor/dashboard') {
//             return location.pathname === '/mentor/dashboard' || location.pathname === '/mentor/dashboard/';
//         }
//         return location.pathname.startsWith(route);
//     };

//     const getCurrentPageLabel = () => {
//         const activeItem = navigationItems.find((item) => isActiveRoute(item.route));
//         return activeItem ? activeItem.label : 'Dashboard';
//     };

//     // Sidebar width: 64px collapsed (icons only), 256px expanded
//     const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';
//     const mainMargin = isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16';

//     return (
//         <div className="min-h-screen bg-[#031610] flex">

//             {/* ── SIDEBAR ── */}
//             <aside
//                 className={`fixed left-0 top-0 h-full ${sidebarWidth} bg-[#031610] border-r border-white/10 z-40 flex flex-col transition-all duration-300 overflow-hidden`}
//             >
//                 {/* Logo row */}
//                 <div className="h-16 flex items-center border-b border-white/10 shrink-0 px-3">
//                     <div className="flex items-center gap-2.5 overflow-hidden">
//                         <div className="w-8 h-8 bg-[#0098cc] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
//                             M
//                         </div>
//                         {isSidebarOpen && (
//                             <span className="text-white font-semibold text-base whitespace-nowrap">
//                                 MentorHub
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 {/* Nav items */}
//                 <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
//                     {navigationItems.map((item) => {
//                         const Icon = item.icon;
//                         const isActive = isActiveRoute(item.route);
//                         return (
//                             <button
//                                 key={item.id}
//                                 onClick={() => handleNavigate(item.route)}
//                                 title={!isSidebarOpen ? item.label : ''}
//                                 className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isActive
//                                         ? 'bg-[#0098cc] text-white'
//                                         : 'text-white hover:bg-[#0098cc]/10 hover:text-white'
//                                     } ${!isSidebarOpen ? 'justify-center' : ''}`}
//                             >
//                                 <Icon size={18} className="shrink-0" />
//                                 {isSidebarOpen && (
//                                     <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
//                                 )}
//                             </button>
//                         );
//                     })}
//                 </nav>

//                 {/* Logout */}
//                 <div className="px-2 pb-4 shrink-0">
//                     <button
//                         onClick={() => setIsLogoutModalOpen(true)}
//                         title={!isSidebarOpen ? 'Logout' : ''}
//                         className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ${!isSidebarOpen ? 'justify-center' : ''
//                             }`}
//                     >
//                         <LogOut size={18} className="shrink-0" />
//                         {isSidebarOpen && (
//                             <span className="whitespace-nowrap text-sm font-medium">Logout</span>
//                         )}
//                     </button>
//                 </div>
//             </aside>

//             {/* ── MAIN CONTENT ── */}
//             <div className={`flex-1 flex flex-col ${mainMargin} min-h-screen transition-all duration-300`}>

//                 {/* Header */}
//                 <header className="h-16 bg-[#031610] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
//                     <div className="flex items-center gap-4">
//                         {/* Hamburger — always visible, toggles sidebar */}
//                         <button
//                             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                             className="text-white hover:text-[#0098cc] transition-colors"
//                         >
//                             {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>
//                         <h1 className="text-white text-lg font-semibold">
//                             {getCurrentPageLabel()}
//                         </h1>
//                     </div>

//                     {/* Profile avatar */}
//                     <div className="relative">
//                         <button
//                             onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                             className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#0098cc]/90 transition-colors"
//                         >
//                             {userData?.name?.charAt(0) || 'U'}
//                         </button>
//                         <ProfileDropdown
//                             isOpen={isProfileDropdownOpen}
//                             onClose={() => setIsProfileDropdownOpen(false)}
//                             onLogoutClick={() => {
//                                 setIsProfileDropdownOpen(false);
//                                 setIsLogoutModalOpen(true);
//                             }}
//                         />
//                     </div>
//                 </header>

//                 <main className="flex-1 p-4 lg:p-6 overflow-auto">
//                     {children}
//                 </main>
//             </div>

//             <LogoutModal
//                 isOpen={isLogoutModalOpen}
//                 onClose={() => setIsLogoutModalOpen(false)}
//                 onConfirm={handleLogout}
//             />
//         </div>
//     );
// };

// export default MentorLayout;



import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, DollarSign, Star, HelpCircle, Menu, X, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Navigation items
const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/mentor/dashboard' },
    { id: 'sessions', label: 'My Sessions', icon: BookOpen, route: '/mentor/dashboard/sessions' },
    { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/mentor/dashboard/earnings' },
    { id: 'reviews', label: 'Reviews', icon: Star, route: '/mentor/dashboard/reviews' },
    { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/mentor-dashboard/support' },
];

// Logout Modal
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-[#031610] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                <h2 className="text-white text-xl font-semibold mb-2">Confirm Logout</h2>
                <p className="text-white/70 text-sm mb-6">
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

// Profile Dropdown
const ProfileDropdown = ({ onLogoutClick, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [userinfo, setuserinfo] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) setuserinfo(JSON.parse(userData));
    }, []);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                onClose?.();
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-14 w-64 bg-[#031610] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {userinfo?.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{userinfo?.name || 'User'}</p>
                    <p className="text-white/70 text-xs truncate">{userinfo?.email || ''}</p>
                </div>
            </div>
            <div className="p-2">
                <button
                    onClick={() => { navigate('/mentor-profile'); onClose?.(); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-colors text-sm"
                >
                    View Profile
                </button>
                <button
                    onClick={onLogoutClick}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

// Main Layout
const MentorLayout = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // On mobile: sidebar is a drawer (hidden by default)
    // On desktop: sidebar is always visible, can be collapsed to icon-only
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const stored = localStorage.getItem('userData');
        if (stored) setUserData(JSON.parse(stored));
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/';
    };

    const isActiveRoute = (route) => {
        if (route === '/mentor/dashboard') {
            return location.pathname === '/mentor/dashboard' || location.pathname === '/mentor/dashboard/';
        }
        return location.pathname.startsWith(route);
    };

    const getCurrentPageLabel = () => {
        const activeItem = navigationItems.find((item) => isActiveRoute(item.route));
        return activeItem ? activeItem.label : 'Dashboard';
    };

    // Sidebar content — shared between mobile drawer and desktop sidebar
    const SidebarContent = ({ collapsed = false, onNavClick }) => (
        <>
            {/* Logo row */}
            <div className="h-16 flex items-center border-b border-white/10 shrink-0 px-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 bg-[#0098cc] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                        M
                    </div>
                    {!collapsed && (
                        <span className="text-white font-semibold text-base whitespace-nowrap">
                            MentorHub
                        </span>
                    )}
                </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.route);
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                navigate(item.route);
                                onNavClick?.();
                            }}
                            title={collapsed ? item.label : ''}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-[#0098cc] text-white'
                                    : 'text-white/70 hover:bg-[#0098cc]/10 hover:text-white'
                                } ${collapsed ? 'justify-center' : ''}`}
                        >
                            <Icon size={18} className="shrink-0" />
                            {!collapsed && (
                                <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-2 pb-4 shrink-0">
                <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    title={collapsed ? 'Logout' : ''}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut size={18} className="shrink-0" />
                    {!collapsed && (
                        <span className="whitespace-nowrap text-sm font-medium">Logout</span>
                    )}
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#031610] flex">

            {/* ── MOBILE OVERLAY ── */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* ── MOBILE DRAWER (slide in from left) ── */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-[#031610] border-r border-white/10 z-40 flex flex-col transition-transform duration-300 lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Close button inside drawer */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
                <SidebarContent collapsed={false} onNavClick={() => setIsMobileOpen(false)} />
            </aside>

            {/* ── DESKTOP SIDEBAR (always visible, collapsible) ── */}
            <aside
                className={`hidden lg:flex fixed left-0 top-0 h-full flex-col bg-[#031610] border-r border-white/10 z-40 transition-all duration-300 ${isDesktopCollapsed ? 'w-16' : 'w-64'
                    }`}
            >
                <SidebarContent
                    collapsed={isDesktopCollapsed}
                    onNavClick={() => { }}
                />
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isDesktopCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                    }`}
            >
                {/* Header */}
                <header className="h-16 bg-[#031610] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        {/* Mobile: opens drawer | Desktop: collapses sidebar */}
                        <button
                            onClick={() => {
                                if (window.innerWidth >= 1024) {
                                    setIsDesktopCollapsed(!isDesktopCollapsed);
                                } else {
                                    setIsMobileOpen(!isMobileOpen);
                                }
                            }}
                            className="text-white hover:text-[#0098cc] transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <Menu size={24} />
                        </button>

                        <h1 className="text-white text-base lg:text-lg font-semibold truncate max-w-[180px] sm:max-w-none">
                            {getCurrentPageLabel()}
                        </h1>
                    </div>

                    {/* Profile avatar */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="w-9 h-9 lg:w-10 lg:h-10 bg-[#0098cc] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#0098cc]/90 transition-colors text-sm"
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
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {children}
                </main>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default MentorLayout;