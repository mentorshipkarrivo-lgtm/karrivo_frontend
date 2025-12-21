import React, { useState, useEffect } from 'react';
import MentorshipProfile from './pages/profile/profilsection';
import { Home, Calendar, BookOpen, Users, FileText, ChevronLeft, CheckCircle, ChevronRight, Briefcase, MessageSquare, UserPlus, DollarSign, Gift, Star, HelpCircle, Menu, X, LogOut, Target, CreditCard, Trophy, Linkedin, Award, User, Settings, Bell } from 'lucide-react';
import BookingsSection from './pages/bookings';
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};
import HelpSupport from './pages/help&support/help&supportsection';

const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
        const domain = window.location.hostname.split('.').slice(-2).join('.');
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + domain;
    }
};

export const deleteCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + domain;
};

const DashboardSection = ({ userData }) => (
    <div className="p-6">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#062117] mb-2">Welcome back, {userData?.name || 'User'}!</h2>
            <p className="text-gray-600">Here's what's happening with your mentorship today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
                <p className="text-[#062117] text-3xl font-bold">$23,902</p>
                <p className="text-green-500 text-sm mt-2">↑ 4.2% from last month</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm mb-2">Active Mentees</h3>
                <p className="text-[#062117] text-3xl font-bold">16,815</p>
                <p className="text-green-500 text-sm mt-2">↑ 1.7% from last month</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm mb-2">New Requests</h3>
                <p className="text-[#062117] text-3xl font-bold">1,457</p>
                <p className="text-red-500 text-sm mt-2">↓ 2.9% from last month</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-500 text-sm mb-2">Total Mentees</h3>
                <p className="text-[#062117] text-3xl font-bold">2,023</p>
                <p className="text-green-500 text-sm mt-2">↑ 0.9% from last month</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-[#062117] text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="h-64 flex items-end justify-between gap-4">
                    {[5200, 4800, 7500, 4200, 8100, 3600].map((value, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-[#062117] rounded-t-lg transition-all hover:bg-[#062117]/80"
                                style={{ height: `${(value / 8100) * 100}%` }}
                            />
                            <span className="text-gray-500 text-xs mt-2">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-[#062117] text-lg font-semibold mb-4">December 2024</h3>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <div key={idx} className="text-gray-500 text-xs font-semibold">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {[...Array(31)].map((_, i) => (
                        <button
                            key={i}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm ${i === 16 ? 'bg-[#062117] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className="mt-6">
                    <h4 className="text-[#062117] text-sm font-semibold mb-2">Community Growth</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500 text-sm">↑ 0.6% from last month</span>
                        <span className="text-[#062117] text-2xl font-bold ml-auto">65%</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[#062117] text-lg font-semibold mb-4">Recent Session Bookings</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left text-gray-500 text-sm py-3">Session Name</th>
                            <th className="text-left text-gray-500 text-sm py-3">Mentee Name</th>
                            <th className="text-left text-gray-500 text-sm py-3">Mentee ID</th>
                            <th className="text-left text-gray-500 text-sm py-3">Amount</th>
                            <th className="text-left text-gray-500 text-sm py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                                    <span className="text-[#062117]">Career Mentorship</span>
                                </div>
                            </td>
                            <td className="text-gray-700">Aria</td>
                            <td className="text-gray-700">#3456791</td>
                            <td className="text-[#062117] font-medium">$372.00</td>
                            <td>
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Paid</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const LTMHomeSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Home className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Mentorship Home</h2>
            <p className="text-gray-500">Long Term Mentorship Dashboard</p>
        </div>
    </div>
);

// const BookingsSection = () => {
//     const mentors = [
//         {
//             name: 'Alexandra Mitchell',
//             title: 'Senior UX Researcher',
//             experience: '8+ Years of Experience',
//             company: 'Adobe',
//             rating: 4.9,
//             image: 'AM'
//         },
//         {
//             name: 'Marcus Thompson',
//             title: 'Tech Lead & Architect',
//             experience: '14+ Years of Experience',
//             company: 'Google',
//             rating: 5.0,
//             image: 'MT'
//         },
//         {
//             name: 'Priya Sharma',
//             title: 'Product Strategy Director',
//             experience: '11+ Years of Experience',
//             company: 'Meta',
//             rating: 4.8,
//             image: 'PS'
//         },
//         {
//             name: 'James Anderson',
//             title: 'DevOps Engineering Lead',
//             experience: '9+ Years of Experience',
//             company: 'Netflix',
//             rating: 5.0,
//             image: 'JA'
//         },
//         {
//             name: 'Sofia Martinez',
//             title: 'AI/ML Research Scientist',
//             experience: '7+ Years of Experience',
//             company: 'OpenAI',
//             rating: 4.9,
//             image: 'SM'
//         },
//         {
//             name: 'Daniel Kim',
//             title: 'Cloud Solutions Architect',
//             experience: '12+ Years of Experience',
//             company: 'AWS',
//             rating: 5.0,
//             image: 'DK'
//         }
//     ];

//     return (
//         <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
//             <div className="xl:col-span-2">
//                 <div className="mb-6">
//                     <h2 className="text-2xl font-bold text-[#062117] mb-2">Trial Bookings</h2>
//                     <p className="text-gray-600">Free 1:1 sessions for you to find the perfect mentor</p>
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
//                     <div className="flex items-center justify-between mb-4">
//                         <div>
//                             <h3 className="text-lg font-bold text-[#062117]">No Upcoming Trial Bookings</h3>
//                             <p className="text-gray-600 text-sm">Book one from mentors recommended for you</p>
//                         </div>
//                         <button className="text-[#062117] font-semibold hover:underline">View All</button>
//                     </div>
//                     <p className="text-gray-500 text-sm">Trials are 100% free and a great opportunity to finalise the mentor who's meant for you.</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {mentors.map((mentor, idx) => (
//                         <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                             <div className="flex items-start justify-between mb-4">
//                                 <div className="w-16 h-16 bg-[#062117] rounded-lg flex items-center justify-center text-white text-xl font-bold">
//                                     {mentor.image}
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                                     <span className="font-semibold text-[#062117]">{mentor.rating}</span>
//                                 </div>
//                             </div>
//                             <h3 className="text-[#062117] text-xl font-bold mb-1">{mentor.name}</h3>
//                             <p className="text-gray-700 font-medium mb-1">{mentor.title}</p>
//                             <p className="text-gray-500 text-sm mb-3">{mentor.experience}</p>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
//                                     {mentor.company.charAt(0)}
//                                 </div>
//                                 <span className="text-gray-700 text-sm">{mentor.company}</span>
//                             </div>
//                             <button className="w-full bg-[#062117] text-white py-3 rounded-lg font-semibold hover:bg-[#062117]/90 transition-colors">
//                                 Book a FREE Trial Session
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="xl:col-span-1">
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sticky top-6">
//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <Calendar className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="flex-1">
//                             <h3 className="text-[#062117] font-bold mb-2">Your remaining trials</h3>
//                             <p className="text-gray-700 mb-3">Explore from a list of 60+ mentors, book free trials and try to find the mentor who's perfect for you.</p>
//                             <button className="bg-[#062117] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#062117]/90 transition-colors w-full">
//                                 Explore All Mentors
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const SessionsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <BookOpen className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Session History</h2>
            <p className="text-gray-500">View and manage your sessions</p>
        </div>
    </div>
);

const TasksSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Briefcase className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Tasks & Assignments</h2>
            <p className="text-gray-500">Track and manage your tasks</p>
        </div>
    </div>
);

const GoalsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Target className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Goals & Milestones</h2>
            <p className="text-gray-500">Set and track your goals</p>
        </div>
    </div>
);

const SubscriptionSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <CreditCard className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Subscription Plan</h2>
            <p className="text-gray-500">Manage your subscription plan</p>
        </div>
    </div>
);

const AchievementsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Trophy className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Achievements</h2>
            <p className="text-gray-500">View your achievements and milestones</p>
        </div>
    </div>
);

const LinkedinSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Linkedin className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Profile Builder</h2>
            <p className="text-gray-500">Optimize your LinkedIn profile</p>
        </div>
    </div>
);

const ReferralsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <UserPlus className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Refer & Earn</h2>
            <p className="text-gray-500">Track your referral rewards</p>
        </div>
    </div>
);

const GiftSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Gift className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Gift a Session</h2>
            <p className="text-gray-500">Gift mentorship to others</p>
        </div>
    </div>
);

const MessagesSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <MessageSquare className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Chat & Messages</h2>
            <p className="text-gray-500">View your messages</p>
        </div>
    </div>
);





const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md w-full shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                    <LogOut className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-[#062117] text-2xl font-bold text-center mb-2">Confirm Logout</h2>
                <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-100 text-[#062117] py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileDropdown = ({ userData, onProfileClick, onLogoutClick, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#062117] rounded-full flex items-center justify-center text-white font-bold">
                        {userData?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-[#062117]">{userData?.name || 'User'}</p>
                        <p className="text-sm text-gray-500">{userData?.email || 'email@example.com'}</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <button
                    onClick={onProfileClick}
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

const Router = ({ currentRoute, userData, onUpdateProfile }) => {
    const routes = {
        'dashboard': () => <DashboardSection userData={userData} />,
        'profile': MentorshipProfile,
        'ltm-home': LTMHomeSection,
        'bookings': BookingsSection,
        'sessions': SessionsSection,
        'tasks': TasksSection,
        'goals': GoalsSection,
        'subscription': SubscriptionSection,
        'achievements': AchievementsSection,
        'linkedin': LinkedinSection,
        'referrals': ReferralsSection,
        'gift': GiftSection,
        'messages': MessagesSection,
        'support': HelpSupport,
    };

    const Component = routes[currentRoute] || (() => <DashboardSection userData={userData} />);
    return <Component />;
};

const topNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/dashboard' },
    { id: 'bookings', label: 'Trial Sessions', icon: Users, route: '/bookings' },
    { id: 'messages', label: 'Chat & Messages', icon: MessageSquare, route: '/messages' },
    { id: 'profile', label: 'Profile Settings', icon: User, route: '/profile' },
    { id: 'support', label: 'Help & Support', icon: HelpCircle, route: '/support' },
];

const ltmNavigationItems = [
    { id: 'ltm-home', label: 'Mentorship Home', icon: Home, route: '/ltm-home' },
    { id: 'sessions', label: 'Session History', icon: BookOpen, route: '/sessions' },
    { id: 'tasks', label: 'Tasks & Assignments', icon: Briefcase, route: '/tasks' },
    { id: 'goals', label: 'Goals & Milestones', icon: Target, route: '/goals' },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard, route: '/subscription' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, route: '/achievements' },
    { id: 'linkedin', label: 'Profile Builder', icon: Linkedin, route: '/linkedin' },
    { id: 'referrals', label: 'Refer & Earn', icon: UserPlus, route: '/referrals' },
    { id: 'gift', label: 'Gift a Session', icon: Gift, route: '/gift' },
];

// const MenteeDashboard = () => {
//     const [currentRoute, setCurrentRoute] = useState('dashboard');
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const userDataCookie = getCookie('userData');
//         if (userDataCookie) {
//             try {
//                 const parsedData = JSON.parse(decodeURIComponent(userDataCookie));
//                 setUserData(parsedData);
//             } catch (error) {
//                 console.error('Error parsing user data:', error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const handlePopState = () => {
//             const path = window.location.hash.slice(1) || 'dashboard';
//             setCurrentRoute(path);
//         };

//         window.addEventListener('popstate', handlePopState);
//         const initialPath = window.location.hash.slice(1) || 'dashboard';
//         setCurrentRoute(initialPath);

//         return () => window.removeEventListener('popstate', handlePopState);
//     }, []);

//     const navigate = (route) => {
//         setCurrentRoute(route);
//         window.history.pushState(null, '', `#${route}`);
//         setIsProfileDropdownOpen(false);
//     };

//     const handleLogout = () => {
//         const deleteCookie = (name) => {
//             document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//             document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
//             const domain = window.location.hostname;
//             document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
//         };

//         deleteCookie('userData');
//         deleteCookie('token');
//         deleteCookie('authToken');
//         sessionStorage.clear();
//         localStorage.clear();

//         setTimeout(() => {
//             window.location.href = '/login';
//         }, 100);
//     };

//     const handleUpdateProfile = (updatedData) => {
//         const newUserData = { ...userData, ...updatedData };
//         setUserData(newUserData);
//         document.cookie = `userData=${encodeURIComponent(JSON.stringify(newUserData))}; path=/; max-age=86400`;
//         alert('Profile updated successfully!');
//     };

//     const Header = () => (
//         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
//             <div className="flex items-center gap-4">
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="lg:hidden text-[#062117] hover:text-gray-600 transition-colors"
//                 >
//                     {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-[#062117] rounded-lg flex items-center justify-center">
//                         <span className="text-white font-bold text-xl">M</span>
//                     </div>
//                     <h1 className="text-[#062117] text-xl font-bold">MenteeHub</h1>
//                 </div>
//             </div>
//             <div className="flex items-center gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     className="hidden md:block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#062117] placeholder-gray-400 focus:outline-none focus:border-[#062117]"
//                 />
//                 <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <Bell size={20} className="text-gray-600" />
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                 </button>
//                 <div className="relative">
//                     <button
//                         onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                         className="w-10 h-10 bg-[#062117] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#062117]/90 transition-colors"
//                     >
//                         {userData?.name?.charAt(0) || 'U'}
//                     </button>
//                     <ProfileDropdown
//                         userData={userData}
//                         isOpen={isProfileDropdownOpen}
//                         onClose={() => setIsProfileDropdownOpen(false)}
//                         onProfileClick={() => {
//                             navigate('profile');
//                             setIsProfileDropdownOpen(false);
//                         }}
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
//         <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 overflow-y-auto shadow-lg`}>
//             <div className="p-6">
//                 <nav className="space-y-2 mb-8">
//                     {topNavigationItems.map((item) => {
//                         const Icon = item.icon;
//                         const isActive = currentRoute === item.id;
//                         return (
//                             <button
//                                 key={item.id}
//                                 onClick={() => {
//                                     navigate(item.id);
//                                     if (window.innerWidth < 1024) setIsSidebarOpen(false);
//                                 }}
//                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-[#062117]'}`}
//                             >
//                                 <Icon size={20} />
//                                 <span className="flex-1 text-left text-sm">{item.label}</span>
//                             </button>
//                         );
//                     })}
//                 </nav>

//                 <div className="border-t border-gray-200 pt-6">
//                     <h3 className="text-gray-400 text-xs uppercase mb-4 px-4 font-semibold tracking-wider">Long Term Mentorship</h3>
//                     <nav className="space-y-2">
//                         {ltmNavigationItems.map((item) => {
//                             const Icon = item.icon;
//                             const isActive = currentRoute === item.id;
//                             return (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => {
//                                         navigate(item.id);
//                                         if (window.innerWidth < 1024) setIsSidebarOpen(false);
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100 hover:text-[#062117]'}`}
//                                 >
//                                     <Icon size={20} />
//                                     <span className="flex-1 text-left text-sm">{item.label}</span>
//                                 </button>
//                             );
//                         })}
//                     </nav>
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                     <button
//                         onClick={() => setIsLogoutModalOpen(true)}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all"
//                     >
//                         <LogOut size={20} />
//                         <span className="flex-1 text-left text-sm">Logout</span>
//                     </button>
//                 </div>
//             </div>
//         </aside>
//     );

//     return (
//         <div className="min-h-screen bg-white flex">
//             <Sidebar />
//             <div className="flex-1 flex flex-col min-h-screen">
//                 <Header />
//                 <main className="flex-1 overflow-y-auto bg-gray-50">
//                     <Router currentRoute={currentRoute} userData={userData} onUpdateProfile={handleUpdateProfile} />
//                 </main>
//             </div>
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 lg:hidden z-40"
//                     onClick={() => setIsSidebarOpen(false)}
//                 />
//             )}
//             {isProfileDropdownOpen && (
//                 <div
//                     className="fixed inset-0 z-30"
//                     onClick={() => setIsProfileDropdownOpen(false)}
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

// export default MenteeDashboard;



// Profile Completion Form Component


const ProfileCompletionForm = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        address: '',
        status: '',
        education: '',
        menteeType: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isStep1Valid = formData.name && formData.dateOfBirth && formData.address;
    const isStep2Valid = formData.status && formData.education;
    const isStep3Valid = formData.menteeType;

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        // Save profile data to cookie
        const profileData = {
            ...formData,
            profileCompleted: true
        };
        document.cookie = `profileData=${encodeURIComponent(JSON.stringify(profileData))}; path=/; max-age=31536000`;
        onComplete(profileData);
    };

    const menteeTypes = [
        'Software Development Mentor',
        'Web Development Mentor',
        'Mobile App Development Mentor',
        'Data Science Mentor',
        'AI/ML Mentor',
        'DevOps Mentor',
        'UI/UX Design Mentor',
        'Product Management Mentor',
        'Business Analysis Mentor',
        'Cybersecurity Mentor',
        'Other'
    ];



    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
                    <h1 className="text-xl font-bold mb-1">Complete Your Profile</h1>
                    <p className="text-blue-100 text-sm">Just 3 simple steps</p>
                </div>

                {/* Progress Bar */}
                <div className="px-5 pt-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Step {currentStep} of 3</span>
                        <span className="text-xs font-medium text-gray-600">{Math.round((currentStep / 3) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <User size={16} />
                        </div>
                        <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Personal</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-200 mx-1.5">
                        <div className={`h-0.5 transition-all duration-500 ${currentStep >= 2 ? 'bg-blue-600 w-full' : 'w-0'}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Briefcase size={16} />
                        </div>
                        <span className={`text-xs font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Experience</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-200 mx-1.5">
                        <div className={`h-0.5 transition-all duration-500 ${currentStep >= 3 ? 'bg-blue-600 w-full' : 'w-0'}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Target size={16} />
                        </div>
                        <span className={`text-xs font-medium ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Goals</span>
                    </div>
                </div>

                {/* Form Content */}
                <div className="px-5 py-4 min-h-[320px]">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Personal Information</h2>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter your complete address"
                                    rows="2"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Experience & Education */}
                    {currentStep === 2 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Experience & Education</h2>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Current Status <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleInputChange('status', 'fresher')}
                                        className={`p-3 border-2 rounded-lg transition-all ${formData.status === 'fresher'
                                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-sm font-semibold mb-0.5">Fresher</div>
                                            <div className="text-xs text-gray-500">Just starting</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleInputChange('status', 'experienced')}
                                        className={`p-3 border-2 rounded-lg transition-all ${formData.status === 'experienced'
                                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-sm font-semibold mb-0.5">Experienced</div>
                                            <div className="text-xs text-gray-500">Have experience</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Highest Education <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.education}
                                    onChange={(e) => handleInputChange('education', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="">Select your education level</option>
                                    <option value="high-school">High School</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="phd">PhD</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Mentee Type */}
                    {currentStep === 3 && (
                        <div className="space-y-4 animate-fadeIn">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">What Type of Mentor You Want?</h2>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Select your field of interest <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                                    {menteeTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleInputChange('menteeType', type)}
                                            className={`p-2.5 border-2 rounded-lg transition-all text-left ${formData.menteeType === type
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium">{type}</span>
                                                {formData.menteeType === type && (
                                                    <CheckCircle size={16} className="text-blue-600" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="px-5 py-4 bg-gray-50 flex items-center justify-between border-t">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentStep === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </button>

                    {currentStep < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={
                                (currentStep === 1 && !isStep1Valid) ||
                                (currentStep === 2 && !isStep2Valid)
                            }
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${((currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid))
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                                }`}
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={!isStep3Valid}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isStep3Valid
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg'
                                }`}
                        >
                            Complete
                            <CheckCircle size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


const MenteeDashboard = () => {
    const [currentRoute, setCurrentRoute] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const userDataCookie = getCookie('userData');
        if (userDataCookie) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(userDataCookie));
                setUserData(parsedData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);



    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.hash.slice(1) || 'dashboard';
            setCurrentRoute(path);
        };

        window.addEventListener('popstate', handlePopState);
        const initialPath = window.location.hash.slice(1) || 'dashboard';
        setCurrentRoute(initialPath);

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        // Check if profile is completed
        const profileDataCookie = getCookie('profileData');
        if (profileDataCookie) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(profileDataCookie));
                if (parsedData.profileCompleted) {
                    setShowOnboarding(false);
                } else {
                    setShowOnboarding(true);
                }
            } catch (error) {
                console.error('Error parsing profile data:', error);
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


    const navigate = (route) => {
        setCurrentRoute(route);
        window.history.pushState(null, '', `#${route}`);
        setIsProfileDropdownOpen(false);
    };

    const handleLogout = () => {
        const deleteCookie = (name) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            const domain = window.location.hostname;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        };

        deleteCookie('userData');
        deleteCookie('token');
        deleteCookie('authToken');
        deleteCookie('profileData');
        sessionStorage.clear();
        localStorage.clear();

        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    };

    const handleUpdateProfile = (updatedData) => {
        const newUserData = { ...userData, ...updatedData };
        setUserData(newUserData);
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(newUserData))}; path=/; max-age=86400`;
        alert('Profile updated successfully!');
    };

    const Header = () => (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden text-[#062117] hover:text-gray-600 transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#062117] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <h1 className="text-[#062117] text-xl font-bold">MenteeHub</h1>
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
                        className="w-10 h-10 bg-[#062117] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#062117]/90 transition-colors"
                    >
                        {userData?.name?.charAt(0) || 'U'}
                    </button>
                    <ProfileDropdown
                        userData={userData}
                        isOpen={isProfileDropdownOpen}
                        onClose={() => setIsProfileDropdownOpen(false)}
                        onProfileClick={() => {
                            navigate('profile');
                            setIsProfileDropdownOpen(false);
                        }}
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
        <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 overflow-y-auto shadow-lg`}>
            <div className="p-6">
                <nav className="space-y-2 mb-8">
                    {topNavigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentRoute === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.id);
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-[#062117]'}`}
                            >
                                <Icon size={20} />
                                <span className="flex-1 text-left text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-gray-400 text-xs uppercase mb-4 px-4 font-semibold tracking-wider">Long Term Mentorship</h3>
                    <nav className="space-y-2">
                        {ltmNavigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentRoute === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.id);
                                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100 hover:text-[#062117]'}`}
                                >
                                    <Icon size={20} />
                                    <span className="flex-1 text-left text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="flex-1 text-left text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );

    return (
        <>
            <div className="min-h-screen bg-white flex">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <Router currentRoute={currentRoute} userData={userData} onUpdateProfile={handleUpdateProfile} />
                    </main>
                </div>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 lg:hidden z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
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

            {/* Onboarding Overlay */}
            {showOnboarding && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>
                    <div className="relative z-10 min-h-screen w-full">
                        <ProfileCompletionForm onComplete={handleProfileComplete} />
                    </div>
                </div>
            )}
        </>
    );

};

export default MenteeDashboard;




