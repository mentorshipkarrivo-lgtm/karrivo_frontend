import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    Video,
    Users,
    ExternalLink,
    Copy,
    Check,
    AlertCircle,
    RefreshCw,
    Trash2,
    MessageSquare
} from 'lucide-react';
// import { 
//   useGetUpcomingMeetingsQuery, 
//   useDeleteZoomMeetingMutation 
// } from './zoomApiSlice';

import { useGetUpcomingMeetingsQuery, useDeleteZoomMeetingMutation } from '../../../home/mentorsection/zoomApiSlice';
import { format } from 'date-fns';

const UpcomingMeetings = () => {
    const [copiedMeetingId, setCopiedMeetingId] = useState(null);
    const [expandedMeeting, setExpandedMeeting] = useState(null);

    const {
        data: meetingsData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUpcomingMeetingsQuery();

    const [deleteMeeting, { isLoading: isDeleting }] = useDeleteZoomMeetingMutation();

    const meetings = meetingsData?.data || [];

    const handleCopyLink = (joinUrl, meetingId) => {
        navigator.clipboard.writeText(joinUrl);
        setCopiedMeetingId(meetingId);
        setTimeout(() => setCopiedMeetingId(null), 2000);
    };

    const handleJoinMeeting = (joinUrl) => {
        window.open(joinUrl, '_blank');
    };

    const handleCancelMeeting = async (meetingId) => {
        if (window.confirm('Are you sure you want to cancel this meeting?')) {
            try {
                await deleteMeeting(meetingId).unwrap();
                alert('Meeting cancelled successfully');
            } catch (error) {
                alert('Failed to cancel meeting: ' + (error?.data?.message || error.message));
            }
        }
    };

    const getMeetingStatus = (startTime, duration) => {
        const now = new Date();
        const meetingStart = new Date(startTime);
        const meetingEnd = new Date(meetingStart.getTime() + duration * 60000);

        if (now < meetingStart) {
            const hoursUntil = Math.floor((meetingStart - now) / (1000 * 60 * 60));
            if (hoursUntil < 1) {
                const minutesUntil = Math.floor((meetingStart - now) / (1000 * 60));
                return {
                    text: `Starting in ${minutesUntil} min`,
                    color: 'text-red-600',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200'
                };
            } else if (hoursUntil < 24) {
                return {
                    text: `Starting in ${hoursUntil}h`,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200'
                };
            }
            return {
                text: 'Upcoming',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200'
            };
        } else if (now >= meetingStart && now <= meetingEnd) {
            return {
                text: 'In Progress',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                pulse: true
            };
        }
        return {
            text: 'Finished',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200'
        };
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading upcoming meetings...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Meetings</h3>
                        <p className="text-sm text-red-700 mb-4">
                            {error?.data?.message || 'Unable to fetch your upcoming meetings. Please try again.'}
                        </p>
                        <button
                            onClick={() => refetch()}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming Meetings</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {meetings.length} {meetings.length === 1 ? 'meeting' : 'meetings'} scheduled
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Meetings List */}
            {meetings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Meetings</h3>
                    <p className="text-sm text-gray-600">
                        You don't have any meetings scheduled. Book a session with a mentor to get started!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {meetings.map((meeting) => {
                            const status = getMeetingStatus(meeting.startTime, meeting.duration);
                            const isExpanded = expandedMeeting === meeting._id;

                            return (
                                <motion.div
                                    key={meeting._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    {/* Meeting Card */}
                                    <div className="p-6">
                                        {/* Status Badge */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.bgColor} ${status.color} ${status.borderColor}`}>
                                                {status.pulse && (
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                )}
                                                {status.text}
                                            </div>
                                            <button
                                                onClick={() => handleCancelMeeting(meeting._id)}
                                                disabled={isDeleting}
                                                className="text-gray-400 hover:text-red-600 transition p-1 rounded hover:bg-red-50"
                                                title="Cancel Meeting"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Meeting Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                            {meeting.topic}
                                        </h3>

                                        {/* Meeting Details */}
                                        <div className="space-y-2.5 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="font-medium">
                                                    {format(new Date(meeting.startTime), 'EEEE, MMMM d, yyyy')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span>
                                                    {format(new Date(meeting.startTime), 'h:mm a')} • {meeting.duration} minutes
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span>Meeting ID: {meeting.zoomMeetingId}</span>
                                            </div>
                                        </div>

                                        {/* Agenda - Expandable */}
                                        {meeting.agenda && (
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => setExpandedMeeting(isExpanded ? null : meeting._id)}
                                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span className="font-medium">Agenda</span>
                                                </button>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-sm text-gray-600 mt-2 pl-6">
                                                                {meeting.agenda}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}

                                        {/* Meeting Password */}
                                        {meeting.password && (
                                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Meeting Password</p>
                                                        <p className="text-sm font-mono font-semibold text-gray-900">
                                                            {meeting.password}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopyLink(meeting.password, `${meeting._id}-password`)}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        {copiedMeetingId === `${meeting._id}-password` ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleJoinMeeting(meeting.joinUrl)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition text-sm"
                                            >
                                                <Video className="w-4 h-4" />
                                                Join Meeting
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => handleCopyLink(meeting.joinUrl, meeting._id)}
                                                className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition text-sm"
                                                title="Copy meeting link"
                                            >
                                                {copiedMeetingId === meeting._id ? (
                                                    <>
                                                        <Check className="w-4 h-4 text-green-600" />
                                                        <span className="text-green-600">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4" />
                                                        Copy Link
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Meeting Settings Footer */}
                                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                            {meeting.settings?.waitingRoom && (
                                                <span className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    Waiting Room
                                                </span>
                                            )}
                                            {meeting.settings?.hostVideo && (
                                                <span className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    Host Video
                                                </span>
                                            )}
                                            {meeting.settings?.muteUponEntry && (
                                                <span className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                    Mute on Entry
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default UpcomingMeetings;