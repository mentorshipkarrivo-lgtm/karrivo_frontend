import React, { useState } from "react";
import { Star, Calendar, X, Clock, Check, Crown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
    useGetMentorsQuery,
    useGetSlotsQuery,
    useBookFreeTrialMutation,
    useBookPremiumTrialMutation,
} from "./Bookingsapislice"
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

export default function BookingsSection() {
    const navigate = useNavigate();

    /* ================= API ================= */
    const { data, isLoading, isError } = useGetMentorsQuery();

    // ✅ FIX: extract mentors array correctly
    const mentorsList = Array.isArray(data?.mentors)
        ? data.mentors
        : [];

    /* ================= STATE ================= */
    const [open, setOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [trialType, setTrialType] = useState("FREE");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    /* ================= SLOTS ================= */
    const { data: slotsData, isLoading: slotsLoading } = useGetSlotsQuery(
        selectedMentor && selectedDate
            ? { mentorId: selectedMentor._id, date: selectedDate }
            : skipToken
    );

    const availableSlots = slotsData?.slots || [];

    /* ================= MUTATIONS ================= */
    const [bookFreeTrial, { isLoading: bookingFree }] =
        useBookFreeTrialMutation();
    const [bookPremiumTrial, { isLoading: bookingPremium }] =
        useBookPremiumTrialMutation();

    /* ================= HELPERS ================= */
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push({
                date: date.toISOString().split("T")[0],
                day: date
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase(),
                displayDate: date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                }),
            });
        }
        return dates;
    };

    const availableDates = generateDates();

    /* ================= ACTIONS ================= */
    const handleBookTrial = (mentor) => {
        setSelectedMentor(mentor);
        setOpen(true);
        setSelectedDate("");
        setSelectedSlot("");
        setTrialType("FREE");
    };

    const handleViewProfile = (mentor) => {
        navigate(`/mentor-profile/${mentor._id}`);
    };

    const submitBooking = async () => {
        if (!selectedDate || !selectedSlot) {
            alert("Please select date & time");
            return;
        }

        try {
            if (trialType === "FREE") {
                await bookFreeTrial({
                    mentorId: selectedMentor._id,
                    date: selectedDate,
                    timeSlot: selectedSlot,
                }).unwrap();
                alert("Free trial booked successfully!");
            } else {
                await bookPremiumTrial({
                    mentorId: selectedMentor._id,
                    date: selectedDate,
                    timeSlot: selectedSlot,
                    paymentId: "DUMMY_PAYMENT_" + Date.now(),
                }).unwrap();
                alert("Premium trial booked successfully!");
            }
            setOpen(false);
        } catch (error) {
            alert(error?.data?.message || "Booking failed, try again");
        }
    };

    /* ================= LOADING & ERROR ================= */
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600">
                Error loading mentors
            </div>
        );
    }

    /* ================= UI ================= */
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Recommended Mentors for you
                    </h1>
                    <p className="text-gray-600">
                        You still have free trial sessions available — Book now!
                    </p>
                </motion.div>

                {/* EMPTY STATE */}
                {mentorsList.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No mentors available at the moment
                    </div>
                ) : (
                    /* TABLE-LIKE CARDS */
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mentor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role & Experience
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Skills & Interests
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {mentorsList.map((mentor, index) => {
                                        const areasArray = mentor.areasOfInterest
                                            ? mentor.areasOfInterest
                                                .split(/[,;]+/)
                                                .map((s) => s.trim())
                                                .filter(Boolean)
                                            : [];

                                        return (
                                            <motion.tr
                                                key={mentor._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                viewport={{ once: true }}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                {/* MENTOR INFO */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-[#eff6ff] rounded-lg flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                                                            {mentor.fullName?.slice(0, 2).toUpperCase()}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-gray-900 truncate">
                                                                {mentor.fullName}
                                                            </div>
                                                            {mentor.companyName && (
                                                                <div className="text-xs text-gray-500 truncate">
                                                                    {mentor.companyName}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* ROLE & EXPERIENCE */}
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 font-medium">
                                                        {mentor.currentRole}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {mentor.yearsOfExperience} Years Experience
                                                    </div>
                                                </td>

                                                {/* SKILLS & INTERESTS */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {areasArray.slice(0, 3).map((area, i) => (
                                                            <span
                                                                key={i}
                                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"
                                                            >
                                                                {area}
                                                            </span>
                                                        ))}
                                                        {areasArray.length > 3 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{areasArray.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* RATING */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            5.0
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleViewProfile(mentor)}
                                                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                        >
                                                            View Profile
                                                        </button>

                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL - UNCHANGED */}
            {open && selectedMentor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Select Date and Time</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-600">Book a trial session with</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {selectedMentor.fullName?.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-sm">{selectedMentor.fullName}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="font-bold text-lg mb-3">Choose Your Trial Type</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setTrialType("FREE")}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${trialType === "FREE"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                <span className="font-bold">Free Trial</span>
                                            </div>
                                            <span className="text-green-600 font-bold">Free</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>Basic mentorship session</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>30 minutes session duration</span>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setTrialType("PREMIUM")}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${trialType === "PREMIUM"
                                            ? "border-yellow-500 bg-yellow-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Crown className="w-5 h-5 text-yellow-600" />
                                                <span className="font-bold">Golden Trial</span>
                                            </div>
                                            <span className="text-orange-600 font-bold">₹199</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>100% show up by mentor</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>Priority Slot within 24hrs</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span>Personalised mentorship plan</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-3">Select Date</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {availableDates.map((dateObj) => (
                                        <button
                                            key={dateObj.date}
                                            onClick={() => {
                                                setSelectedDate(dateObj.date);
                                                setSelectedSlot("");
                                            }}
                                            className={`p-4 rounded-xl border-2 transition-all ${selectedDate === dateObj.date
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="text-sm text-gray-500 mb-1">{dateObj.day}</div>
                                            <div className="font-bold text-lg">{dateObj.displayDate}</div>
                                            <div className={`text-xs mt-1 ${selectedDate === dateObj.date ? "text-green-600" : "text-gray-500"
                                                }`}>
                                                Available
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <div>
                                    <h3 className="font-bold text-lg mb-3">Select Time</h3>
                                    {slotsLoading ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                            <p className="mt-2 text-sm text-gray-600">Loading slots...</p>
                                        </div>
                                    ) : availableSlots && availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-3 px-2 rounded-lg border-2 transition-all font-medium text-sm ${selectedSlot === slot
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No slots available for this date
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedDate && selectedSlot && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                            <span className="font-medium">
                                                {availableDates.find(d => d.date === selectedDate)?.displayDate} 2026
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-600" />
                                            <span className="font-medium">
                                                {selectedSlot} to {(() => {
                                                    const [time, period] = selectedSlot.split(' ');
                                                    const [hours, minutes] = time.split(':');
                                                    const endMinutes = parseInt(minutes) + 30;
                                                    const endHours = endMinutes >= 60 ? parseInt(hours) + 1 : parseInt(hours);
                                                    const finalMinutes = endMinutes >= 60 ? endMinutes - 60 : endMinutes;
                                                    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')} ${period}`;
                                                })()}
                                            </span>
                                        </div>
                                        <span className="text-gray-500 text-xs">30min Session</span>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={submitBooking}
                                disabled={!selectedDate || !selectedSlot || (bookingFree || bookingPremium)}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {bookingFree || bookingPremium ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processing...
                                    </span>
                                ) : (
                                    "Continue →"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}