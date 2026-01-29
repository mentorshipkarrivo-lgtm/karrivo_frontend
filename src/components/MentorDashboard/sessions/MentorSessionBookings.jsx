import React, { useState, useEffect } from 'react';
import { Calendar, Star, User, Eye, Video, RefreshCw } from 'lucide-react';
import { useGetMentorSessionBookingsQuery } from '../MentorDashboardapislice';

const MentorSessionBookings = () => {
    const [mentorId, setMentorId] = useState(null);
    const [filter, setFilter] = useState('all');

    // Get mentorId from localStorage
    useEffect(() => {
        const storedMentorId = localStorage.getItem('mentorId');
        if (storedMentorId) {
            setMentorId(storedMentorId);
            console.log('Mentor ID from localStorage:', storedMentorId);
        } else {
            // Fallback: try to get from userData
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setMentorId(parsedUser?._id);
                    console.log('Mentor ID from userData:', parsedUser?._id);
                } catch (error) {
                    console.error('Error parsing userData:', error);
                }
            }
        }
    }, []);

    // Fetch session bookings using mentorId
    const {
        data: sessionsData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetMentorSessionBookingsQuery(mentorId, {
        skip: !mentorId,
    });

    const sessions = sessionsData?.data || [];
    const totalSessions = sessionsData?.count || 0;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            confirmed: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            cancelled: 'bg-red-500/20 text-red-400',
            completed: 'bg-blue-500/20 text-blue-400',
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-500/20 text-gray-400'
                    }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getPaymentBadge = (paymentStatus, isFreeSession) => {
        if (isFreeSession) {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                    Free
                </span>
            );
        }

        const paymentStyles = {
            paid: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            failed: 'bg-red-500/20 text-red-400',
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentStyles[paymentStatus] || 'bg-gray-500/20 text-gray-400'
                    }`}
            >
                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
            </span>
        );
    };

    const filteredSessions = sessions.filter((session) => {
        if (filter === 'all') return true;
        return session.status === filter;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#031610]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0098cc] mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading session bookings...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#031610]">
                <div className="text-center">
                    <p className="text-red-400 mb-4">
                        {error?.data?.message || 'Failed to load session bookings'}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-[#0098cc] hover:bg-[#0098cc]/80 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#031610] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Session Bookings</h1>
                    <p className="text-gray-400">Manage and track all your mentorship sessions</p>
                    <div className="flex gap-4 mt-4">
                        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg px-4 py-2">
                            <span className="text-gray-400 text-sm">Total Sessions: </span>
                            <span className="text-white font-semibold">{totalSessions}</span>
                        </div>
                        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg px-4 py-2">
                            <span className="text-gray-400 text-sm">Confirmed: </span>
                            <span className="text-green-400 font-semibold">
                                {sessions.filter((s) => s.status === 'confirmed').length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((filterOption) => (
                        <button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            className={`px-6 py-2 rounded-lg transition-all font-medium ${filter === filterOption
                                ? 'bg-[#0098cc] text-white'
                                : 'bg-[#062117] border border-[#0098cc]/30 text-gray-300 hover:bg-[#0098cc]/10'
                                }`}
                        >
                            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Sessions Table */}
                {filteredSessions.length === 0 ? (
                    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg p-12 text-center">
                        <Calendar className="mx-auto mb-4 text-gray-500" size={48} />
                        <h3 className="text-xl font-semibold text-white mb-2">No session bookings found</h3>
                        <p className="text-gray-400">
                            {filter !== 'all' ? `No ${filter} sessions available` : 'Your session bookings will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-[#062117] border border-[#0098cc]/30 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#031610] border-b border-[#0098cc]/30">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Mentee Details</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Topic</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date & Time</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Duration</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Payment</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#0098cc]/20">
                                    {filteredSessions.map((session) => (
                                        <tr key={session._id} className="hover:bg-[#031610]/50 transition-colors">
                                            {/* Mentee Details */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-[#0098cc]/20 rounded-full p-2">
                                                        <User size={20} className="text-[#0098cc]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{session.menteeName}</p>
                                                        <p className="text-gray-400 text-sm">{session.menteeEmail}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Topic */}
                                            <td className="px-6 py-4">
                                                <p className="text-white font-medium">{session.topic}</p>
                                                {session.description && (
                                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{session.description}</p>
                                                )}
                                            </td>

                                            {/* Date & Time */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Calendar size={16} className="text-[#0098cc]" />
                                                    <div>
                                                        <p>{formatDate(session.sessionDate)}</p>
                                                        <p className="text-sm text-gray-400">{session.startTime}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Duration */}
                                            <td className="px-6 py-4">
                                                <span className="text-gray-300">{session.durationMinutes} min</span>
                                            </td>

                                            {/* Type */}
                                            <td className="px-6 py-4">
                                                <span className="text-gray-300 capitalize">{session.sessionType}</span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">{getStatusBadge(session.status)}</td>

                                            {/* Payment */}
                                            <td className="px-6 py-4">{getPaymentBadge(session.paymentStatus, session.isFreeSession)}</td>

                                            {/* Price */}
                                            <td className="px-6 py-4">
                                                {session.isFreeSession ? (
                                                    <span className="text-purple-400 font-medium">Free</span>
                                                ) : (
                                                    <span className="text-white font-medium">
                                                        {session.currency} {session.price}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {session.meetingLink && (
                                                        <a
                                                            href={session.meetingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-[#0098cc] hover:bg-[#0098cc]/80 text-white p-2 rounded-lg transition-colors"
                                                            title="Join Meeting"
                                                        >
                                                            <Video size={18} />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default MentorSessionBookings;