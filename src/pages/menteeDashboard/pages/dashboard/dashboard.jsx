// DashboardSection.jsx

import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useGetMenteeDashboardQuery } from './dashboardApiSlice';

const DashboardSection = () => {
    // Get userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.username || userData?._id;

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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm">Total Sessions</h3>
                        <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        {dashboardData?.stats?.totalSessions || 0}
                    </p>
                    <p className="text-green-500 text-sm mt-2">
                        ↑ {dashboardData?.stats?.monthlyGrowth?.sessions || 0}% from last month
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm">Active Mentors</h3>
                        <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        {dashboardData?.stats?.activeMentors || 0}
                    </p>
                    <p className="text-green-500 text-sm mt-2">
                        ↑ {dashboardData?.stats?.monthlyGrowth?.mentors || 0} new mentors
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm">Hours Learned</h3>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        {dashboardData?.stats?.hoursLearned || 0}
                    </p>
                    <p className="text-green-500 text-sm mt-2">
                        ↑ {dashboardData?.stats?.monthlyGrowth?.hours || 0} hrs this month
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500 text-sm">Investment</h3>
                        <DollarSign className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-[#062117] text-3xl font-bold">
                        ${dashboardData?.stats?.totalInvestment?.toLocaleString() || 0}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">Total spent</p>
                </div>
            </div>

            {/* Upcoming Sessions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Sessions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-[#062117] text-lg font-semibold mb-4">Upcoming Sessions</h3>
                    <div className="space-y-4">
                        {dashboardData?.upcomingSessions?.length > 0 ? (
                            dashboardData.upcomingSessions.map((session) => (
                                <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">
                                            {session.mentorInitials}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[#062117]">{session.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(session.date)}, {session.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-[#062117] text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {dashboardData?.recentActivity?.length > 0 ? (
                            dashboardData.recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                                    <p className="text-gray-700">{activity.action}</p>
                                    <p className="text-sm text-gray-400">
                                        {formatTimeAgo(activity.timestamp)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;