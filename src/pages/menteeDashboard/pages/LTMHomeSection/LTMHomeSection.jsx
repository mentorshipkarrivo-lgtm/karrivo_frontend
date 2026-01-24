import React, { useState } from "react";
import { Star, Calendar, X, Clock, Check, Crown } from "lucide-react";
import {
    useGetMentorsQuery,
    useGetSlotsQuery,
    useBookFreeTrialMutation,
    useBookPremiumTrialMutation,
} from "../bookingsapislice"
import { skipToken } from "@reduxjs/toolkit/query";

// Dummy mentor data for demonstration
const dummyMentor = {
    _id: "dummy_001",
    fullName: "Sarah Johnson",
    currentRole: "Senior Product Manager",
    companyName: "Google",
    yearsOfExperience: "10",
    hourlyRate: 2500,
    areasOfInterest: "Product Management, Leadership, Career Guidance",
    isDummy: true
};

export default function LTMHomeSection   () {
    const { data, isLoading, isError } = useGetMentorsQuery();

    // Combine real mentors with dummy mentor
    const realMentors = data?.data?.data || [];
    const mentors = [dummyMentor, ...realMentors];

    const [open, setOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [trialType, setTrialType] = useState("FREE");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    // For dummy mentor, generate mock slots
    const generateDummySlots = () => {
        return [
            "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM", 
            "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
            "06:00 PM", "06:15 PM", "06:30 PM"
        ];
    };

    const { data: slotsData, isLoading: slotsLoading } = useGetSlotsQuery(
        selectedMentor && !selectedMentor.isDummy && selectedDate 
            ? { mentorId: selectedMentor._id, date: selectedDate } 
            : skipToken
    );

    // Get slots based on whether it's dummy or real mentor
    const availableSlots = selectedMentor?.isDummy 
        ? generateDummySlots() 
        : (slotsData?.slots || []);

    const [bookFreeTrial, { isLoading: bookingFree }] = useBookFreeTrialMutation();
    const [bookPremiumTrial, { isLoading: bookingPremium }] = useBookPremiumTrialMutation();

    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push({
                date: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
                displayDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
            });
        }
        return dates;
    };

    const availableDates = generateDates();

    const handleBookTrial = (mentor) => {
        setSelectedMentor(mentor);
        setOpen(true);
        setSelectedDate("");
        setSelectedSlot("");
        setTrialType("FREE");
    };

    const submitBooking = async () => {
        if (!selectedSlot || !selectedDate) {
            alert("Please select date & time");
            return;
        }

        // Handle dummy mentor booking
        if (selectedMentor.isDummy) {
            alert(`✅ Demo Booking Successful!\n\nMentor: ${selectedMentor.fullName}\nDate: ${selectedDate}\nTime: ${selectedSlot}\nType: ${trialType}\n\nThis is a dummy booking for demonstration purposes.`);
            setOpen(false);
            return;
        }

        // Handle real mentor booking
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
            alert("Booking failed: " + (error?.data?.message || "Please try again"));
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading mentors...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p className="text-xl font-semibold">Error loading mentors</p>
                    <p className="mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Recommended Mentors for you
                    </h1>
                    <p className="text-gray-600">
                        You still have 9 more free trial sessions that you can avail, Book now!
                    </p>
                </div>

                {mentors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No mentors available at the moment</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative"
                            >
                                {mentor.isDummy && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        DEMO
                                    </div>
                                )}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center overflow-hidden">
                                            <span className="text-white text-xl font-bold">
                                                {mentor.fullName?.slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white border border-yellow-200 px-2 py-1 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-semibold text-sm text-gray-900">5.0</span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
                                        {mentor.fullName}
                                    </h3>
                                    <p className="text-gray-700 text-sm font-medium mb-1 line-clamp-1">
                                        {mentor.currentRole}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                                        {mentor.yearsOfExperience} Years of Experience
                                    </p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`${mentor.isDummy ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'} px-2 py-1 rounded-md text-xs font-medium border`}>
                                            {mentor.companyName}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleBookTrial(mentor)}
                                        className={`w-full ${mentor.isDummy ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-black'} text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity`}
                                    >
                                        Book a FREE Trial Session
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {open && selectedMentor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Select Date and Time</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-600">Book a trial session with</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 ${selectedMentor.isDummy ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                                            {selectedMentor.fullName?.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-sm">{selectedMentor.fullName}</span>
                                        {selectedMentor.isDummy && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                                                DEMO
                                            </span>
                                        )}
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
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                                            trialType === "FREE"
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
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                                            trialType === "PREMIUM"
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
                                            className={`p-4 rounded-xl border-2 transition-all ${
                                                selectedDate === dateObj.date
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div className="text-sm text-gray-500 mb-1">{dateObj.day}</div>
                                            <div className="font-bold text-lg">{dateObj.displayDate}</div>
                                            <div className={`text-xs mt-1 ${
                                                selectedDate === dateObj.date ? "text-green-600" : "text-gray-500"
                                            }`}>
                                                {selectedMentor.isDummy ? "7 Slots" : "Available"}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <div>
                                    <h3 className="font-bold text-lg mb-3">Select Time</h3>
                                    {!selectedMentor.isDummy && slotsLoading ? (
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
                                                    className={`py-3 px-2 rounded-lg border-2 transition-all font-medium text-sm ${
                                                        selectedSlot === slot
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
                                                {availableDates.find(d => d.date === selectedDate)?.displayDate} 2025
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