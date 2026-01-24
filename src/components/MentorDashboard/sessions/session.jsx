import React, { useEffect, useState } from "react";
import { useGetMentorSessionsQuery } from "./sessionsapislice";

const SessionsPage = () => {
    const [mentorId, setMentorId] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userDataString = localStorage.getItem("userData");

        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);

                // Check if user is a mentor (role 2)
                if (userData.role === 2 && userData._id) {
                    setMentorId(userData._id);
                }
            } catch (error) {
                console.error("Error parsing userData from localStorage:", error);
            }
        }
    }, []);

    const { data, isLoading, error } = useGetMentorSessionsQuery(mentorId, {
        skip: !mentorId, // Skip query if mentorId is not available
    });

    if (!mentorId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#062117] text-white">
                <p>Unable to load mentor information. Please log in again.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#062117] text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading sessions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#062117] text-white">
                <p className="text-red-400">Error loading sessions. Please try again.</p>
            </div>
        );
    }

    const sessions = data?.data || [];

    return (
        <div className="min-h-screen bg-[#062117] p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">
                Your Sessions
            </h1>

            {sessions.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-300 text-lg">No sessions found.</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Your upcoming and past sessions will appear here.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* TOP */}
                        <div>
                            <h2 className="text-lg font-bold text-[#062117] mb-2">
                                {session.topic}
                            </h2>

                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Mentee:</strong>{" "}
                                {session.menteeId?.name || "N/A"}
                            </p>

                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Email:</strong>{" "}
                                {session.menteeId?.email || "N/A"}
                            </p>

                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Date:</strong>{" "}
                                {new Date(session.sessionDate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Time:</strong>{" "}
                                {session.startTime} - {session.endTime}
                            </p>

                            {session.description && (
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Description:</strong>{" "}
                                    {session.description}
                                </p>
                            )}
                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                            <span className="text-lg font-bold text-[#062117]">
                                ₹{session.price}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold text-white uppercase
                                    ${session.status === "confirmed"
                                        ? "bg-green-600"
                                        : session.status === "pending"
                                            ? "bg-yellow-500"
                                            : session.status === "cancelled"
                                                ? "bg-red-500"
                                                : session.status === "completed"
                                                    ? "bg-blue-500"
                                                    : "bg-gray-500"
                                    }
                                `}
                            >
                                {session.status}
                            </span>
                        </div>

                        {/* Optional: Action buttons based on status */}
                        {session.status === "pending" && (
                            <div className="flex gap-2 mt-3">
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition-colors">
                                    Accept
                                </button>
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition-colors">
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionsPage;