


import React, { useState, useEffect } from 'react';
import { Home, Calendar, BookOpen, Users, FileText, Briefcase, MessageSquare, UserPlus, DollarSign, Gift, Star, HelpCircle, Menu, X, LogOut, Target, CreditCard, Trophy, Linkedin, Award, User, Settings, Bell } from 'lucide-react';

// Helper function to get cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// Helper function to delete cookie
const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        // Delete cookie for current domain and all paths
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;

        // Delete cookie for parent domain
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
// Section Components
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
                            className={`
                aspect-square rounded-lg flex items-center justify-center text-sm
                ${i === 16 ? 'bg-[#062117] text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
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
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                    Paid
                                </span>
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
            <h2 className="text-[#062117] text-2xl font-bold mb-2">LTM Home</h2>
            <p className="text-gray-500">Long Term Mentorship Dashboard</p>
        </div>
    </div>
);

const BookingsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Calendar className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Session Bookings</h2>
            <p className="text-gray-500">Manage your session bookings here</p>
        </div>
    </div>
);

const SessionsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <BookOpen className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Sessions</h2>
            <p className="text-gray-500">View and manage your sessions</p>
        </div>
    </div>
);

const TasksSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Briefcase className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Tasks</h2>
            <p className="text-gray-500">Track and manage your tasks</p>
        </div>
    </div>
);

const GoalsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Target className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Goals</h2>
            <p className="text-gray-500">Set and track your goals</p>
        </div>
    </div>
);

const SubscriptionSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <CreditCard className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Subscription</h2>
            <p className="text-gray-500">Manage your subscription plan</p>
        </div>
    </div>
);

const AchievementsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Trophy className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Achievements Hub</h2>
            <p className="text-gray-500">View your achievements and milestones</p>
        </div>
    </div>
);

const LinkedinSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Linkedin className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">LinkedIn Builder</h2>
            <p className="text-gray-500">Optimize your LinkedIn profile</p>
        </div>
    </div>
);

const ReferralsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <UserPlus className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Referrals</h2>
            <p className="text-gray-500">Track your referral rewards</p>
        </div>
    </div>
);

const GiftSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Gift className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Gift Mentorship</h2>
            <p className="text-gray-500">Gift mentorship to others</p>
        </div>
    </div>
);

const TipsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Award className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">LTM Tips</h2>
            <p className="text-gray-500">Tips for successful mentorship</p>
        </div>
    </div>
);

const MenteesSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Users className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Mentees</h2>
            <p className="text-gray-500">Connect with your mentees</p>
        </div>
    </div>
);

const ProgramsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <FileText className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Training Programs</h2>
            <p className="text-gray-500">Explore training programs</p>
        </div>
    </div>
);

const MessagesSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <MessageSquare className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Messages</h2>
            <p className="text-gray-500">View your messages</p>
        </div>
    </div>
);

const EarningsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <DollarSign className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">My Earnings</h2>
            <p className="text-gray-500">Track your earnings</p>
        </div>
    </div>
);

const RewardsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Gift className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Rewards</h2>
            <p className="text-gray-500">View your rewards</p>
        </div>
    </div>
);

const ReviewsSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Star className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Reviews</h2>
            <p className="text-gray-500">Read your reviews</p>
        </div>
    </div>
);

const SupportSection = () => (
    <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <HelpCircle className="w-16 h-16 text-[#062117] mx-auto mb-4" />
            <h2 className="text-[#062117] text-2xl font-bold mb-2">Support Request</h2>
            <p className="text-gray-500">Get help and support</p>
        </div>
    </div>
);

// Profile Section
const ProfileSection = ({ userData, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        address: userData?.address || '',
        city: userData?.city || '',
        state: userData?.state || '',
        country: userData?.country || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="p-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#062117]">Profile Settings</h2>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-[#062117] text-white rounded-lg hover:bg-[#062117]/90 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 bg-[#062117] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {userData?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#062117]">{userData?.name || 'User'}</h3>
                            <p className="text-gray-600">{userData?.email || 'email@example.com'}</p>
                            <p className="text-sm text-gray-500 mt-1">Username: {userData?.username || 'N/A'}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#062117]"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#062117] text-white rounded-lg hover:bg-[#062117]/90 transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <p className="text-[#062117] font-medium">{userData?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <p className="text-[#062117] font-medium">{userData?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                <p className="text-[#062117] font-medium">{userData?.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                                <p className="text-[#062117] font-medium">{userData?.address || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                                <p className="text-[#062117] font-medium">{userData?.city || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                                <p className="text-[#062117] font-medium">{userData?.state || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>
                                <p className="text-[#062117] font-medium">{userData?.country || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                                <p className="text-[#062117] font-medium">{userData?._id || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Logout Modal Component
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

// Profile Dropdown Component
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

// Simple Router Component
const Router = ({ currentRoute, userData, onUpdateProfile }) => {
    const routes = {
        'dashboard': () => <DashboardSection userData={userData} />,
        'profile': () => <ProfileSection userData={userData} onUpdateProfile={onUpdateProfile} />,
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
        'tips': TipsSection,
        'mentees': MenteesSection,
        'programs': ProgramsSection,
        'messages': MessagesSection,
        'earnings': EarningsSection,
        'rewards': RewardsSection,
        'reviews': ReviewsSection,
        'support': SupportSection,
    };

    const Component = routes[currentRoute] || (() => <DashboardSection userData={userData} />);
    return <Component />;
};

// Navigation items configuration
const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/dashboard' },
    { id: 'ltm-home', label: 'LTM Home', icon: Home, route: '/ltm-home' },
    { id: 'sessions', label: 'My Sessions', icon: BookOpen, route: '/sessions' },
    { id: 'tasks', label: 'My Tasks', icon: Briefcase, route: '/tasks' },
    { id: 'goals', label: 'My Goals', icon: Target, route: '/goals' },
    { id: 'subscription', label: 'My Subscription', icon: CreditCard, route: '/subscription' },
    { id: 'achievements', label: 'Achievements Hub', icon: Trophy, route: '/achievements' },
    { id: 'linkedin', label: 'LinkedIn Builder', icon: Linkedin, route: '/linkedin' },
    { id: 'referrals', label: 'My Referrals', icon: UserPlus, route: '/referrals' },
    { id: 'gift', label: 'Gift Mentorship', icon: Gift, route: '/gift' },
    { id: 'tips', label: 'LTM Tips', icon: Award, route: '/tips' },
    { id: 'bookings', label: 'Session Bookings', icon: Calendar, route: '/bookings' },
    { id: 'mentees', label: 'My Mentees', icon: Users, route: '/mentees' },
    { id: 'programs', label: 'Training Programs', icon: FileText, badge: 'New', route: '/programs' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, route: '/messages' },
    { id: 'earnings', label: 'My Earnings', icon: DollarSign, route: '/earnings' },
    { id: 'rewards', label: 'Rewards', icon: Gift, route: '/rewards' },
    { id: 'reviews', label: 'Reviews', icon: Star, route: '/reviews' },
    { id: 'support', label: 'Support Request', icon: HelpCircle, route: '/support' },
];

const MenteeDashboard = () => {
    const [currentRoute, setCurrentRoute] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    // Load user data from cookie
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

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (e) => {
            const path = window.location.hash.slice(1) || 'dashboard';
            setCurrentRoute(path);
        };

        window.addEventListener('popstate', handlePopState);

        // Set initial route from URL
        const initialPath = window.location.hash.slice(1) || 'dashboard';
        setCurrentRoute(initialPath);

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (route) => {
        setCurrentRoute(route);
        window.history.pushState(null, '', `#${route}`);
        setIsProfileDropdownOpen(false);
    };

    // const handleLogout = () => {
    //     // Clear all cookies

    //     const deleteCookie = (name) => {
    //         document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    //     };

    //     deleteCookie('userData');
    //     deleteCookie('token');
    //     deleteCookie('authToken');

    //     // Navigate to login or home page
    //     window.location.href = '/login';
    // };

    const handleLogout = () => {
        // Helper function to delete cookies properly
        const deleteCookie = (name) => {
            // Delete with default path
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

            // Also try deleting without path (in case it was set differently)
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

            // Try with domain if applicable
            const domain = window.location.hostname;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        };

        // Delete all authentication-related cookies
        deleteCookie('userData');
        deleteCookie('token');
        deleteCookie('authToken');

        // Clear any session storage or local storage if used
        sessionStorage.clear();
        localStorage.clear();

        // Small delay to ensure cookies are deleted before redirect
        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    };

    const handleUpdateProfile = (updatedData) => {
        const newUserData = { ...userData, ...updatedData };
        setUserData(newUserData);

        // Update cookie
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
                    <h1 className="text-[#062117] text-xl font-bold">MentorHub</h1>
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
        <aside className={`
      fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
      transition-transform duration-300 z-50
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      w-64 overflow-y-auto shadow-lg
    `}>
            <div className="p-6">
                <nav className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentRoute === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.id);
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-[#062117] text-white'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#062117]'}
                `}
                            >
                                <Icon size={20} />
                                <span className="flex-1 text-left text-sm">{item.label}</span>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-gray-400 text-xs uppercase mb-4 px-4 font-semibold">Configure</h3>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#062117] transition-all">
                        <Gift size={20} />
                        <span className="flex-1 text-left text-sm">Promotions</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">New</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#062117] transition-all">
                        <FileText size={20} />
                        <span className="flex-1 text-left text-sm">Session Settings</span>
                    </button>
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
    );
};

export default MenteeDashboard;


