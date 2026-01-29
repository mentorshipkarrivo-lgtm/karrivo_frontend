// DashboardSection.jsx

import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Loader2, AlertCircle, User } from 'lucide-react';
import { useGetMenteeDashboardQuery } from './dashboardApiSlice';

const DashboardSection = () => {
    // Get userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.username || userData?._id;
    console.log(userId, "userid");

    // Fetch dashboard data
    const { data: dashboardResponse, isLoading, isError, error } = useGetMenteeDashboardQuery(userId);

    // Extract data from response
    const dashboardData = dashboardResponse?.data;

    // Format time ago
    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffMs = now - then;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Get initials from name
    const getInitials = (name) => {
        if (!name) return '?';
        const nameParts = name.trim().split(' ');
        if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-500 h-16 w-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-600">
                        {error?.data?.message || "Failed to load dashboard data"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#062117] mb-2">
                    Welcome back, {dashboardData?.user?.name || 'User'}!
                </h2>
                <p className="text-gray-600">Here's what's happening with your mentorship today.</p>
            </div>

            {/* Profile Completion Alert */}
            {!dashboardData?.profileCompleted && (
                <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
                        <p className="text-yellow-700">
                            <span className="font-semibold">Complete your profile</span> to get better mentor recommendations!
                        </p>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm font-medium">Total Sessions</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        {dashboardData?.stats?.totalSessions || 0}
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                        {dashboardData?.stats?.monthlyGrowth?.sessions > 0 ? (
                            <span className="text-green-600">
                                ↑ {dashboardData?.stats?.monthlyGrowth?.sessions}% from last month
                            </span>
                        ) : (
                            <span>No growth this month</span>
                        )}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm font-medium">Active Mentors</h3>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        {dashboardData?.stats?.activeMentors || 0}
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                        {dashboardData?.mentors?.length > 0 ? (
                            <span className="text-green-600">
                                {dashboardData.mentors.length} mentor{dashboardData.mentors.length > 1 ? 's' : ''} available
                            </span>
                        ) : (
                            <span>No mentors yet</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Available Mentors & Upcoming Sessions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Available Mentors */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#062117] text-lg font-semibold">Available Mentors</h3>
                        <span className="text-sm text-gray-500">
                            {dashboardData?.mentors?.length || 0} mentor{dashboardData?.mentors?.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="space-y-3">
                        {dashboardData?.mentors && dashboardData.mentors.length > 0 ? (
                            dashboardData.mentors.map((mentor) => (
                                <div key={mentor.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-lg">
                                            {mentor.initials || getInitials(mentor.name)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#062117] truncate">{mentor.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{mentor.email}</p>
                                        {mentor.city !== 'N/A' && mentor.country !== 'N/A' && (
                                            <p className="text-xs text-gray-400">
                                                {mentor.city}, {mentor.country}
                                            </p>
                                        )}
                                    </div>
                                 
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No mentors available yet</p>
                                <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#062117] text-lg font-semibold">Upcoming Sessions</h3>
                        <span className="text-sm text-gray-500">
                            {dashboardData?.upcomingSessions?.length || 0} session{dashboardData?.upcomingSessions?.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="space-y-3">
                        {dashboardData?.upcomingSessions && dashboardData.upcomingSessions.length > 0 ? (
                            dashboardData.upcomingSessions.map((session) => (
                                <div key={session.id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">
                                            {session.mentorInitials}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#062117] truncate">{session.title}</p>
                                        <p className="text-sm text-gray-600">
                                            <Calendar className="inline w-4 h-4 mr-1" />
                                            {formatDate(session.date)} at {session.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No upcoming sessions</p>
                                <p className="text-sm text-gray-400 mt-1">Book a session with a mentor to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-[#062117] text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                        dashboardData.recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <p className="text-gray-700">{activity.action}</p>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {formatTimeAgo(activity.timestamp)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No recent activity</p>
                            <p className="text-sm text-gray-400 mt-1">Your activity will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {/* User Info Summary */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-[#062117] text-lg font-semibold mb-4">Your Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-700">{dashboardData?.user?.email || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-700">{dashboardData?.user?.phone || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-700">
                            {dashboardData?.user?.city}, {dashboardData?.user?.country}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium text-gray-700">{dashboardData?.user?.role || 'Mentee'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;