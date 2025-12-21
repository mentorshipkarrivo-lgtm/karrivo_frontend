import React, { useState } from "react";
import { Star, Calendar, X } from "lucide-react";
import {
    useGetMentorsQuery,
    useGetSlotsQuery,
    useBookFreeTrialMutation,
    useBookPremiumTrialMutation,
} from "./bookingsapislice"
import { skipToken } from "@reduxjs/toolkit/query";


export default function BookingsSection() {
    const { data, isLoading } = useGetMentorsQuery();

    const mentors = data?.data?.data || [];
    const [open, setOpen] = useState(false);
    const [mentor, setMentor] = useState(null);
    const [trialType, setTrialType] = useState("FREE");
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");

    const { data: slotsData } = useGetSlotsQuery(
        mentor && date ? { mentorId: mentor._id, date } : skipToken
    );

    const [bookFreeTrial] = useBookFreeTrialMutation();
    const [bookPremiumTrial] = useBookPremiumTrialMutation();

    const submitBooking = async () => {
        if (!slot || !date) return alert("Select date & time");

        if (trialType === "FREE") {
            await bookFreeTrial({
                mentorId: mentor._id,
                date,
                timeSlot: slot,
            });
            alert("Free trial booked");
        } else {
            await bookPremiumTrial({
                mentorId: mentor._id,
                date,
                timeSlot: slot,
                paymentId: "DUMMY_PAYMENT",
            });
            alert("Premium trial booked");
        }

        setOpen(false);
    };

    if (isLoading) return <p>Loading mentors...</p>;

    return (
        <div className="p-4 md:p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="xl:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Trial Bookings</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map((mentor) => (
                        <div
                            key={mentor._id}
                            className="bg-white border rounded-xl p-5 shadow-sm"
                        >
                            <div className="flex justify-between mb-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 bg-[#062117] text-white flex items-center justify-center rounded-lg font-bold">
                                    {mentor.fullName?.slice(0, 2).toUpperCase()}
                                </div>

                                {/* Rating (static for now) */}
                                <div className="flex items-center gap-1">
                                    <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                                    <span className="font-semibold">5.0</span>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-[#062117]">
                                {mentor.fullName}
                            </h3>

                            <p className="text-gray-700">
                                {mentor.currentRole}
                            </p>

                            <p className="text-sm text-gray-500 mb-2">
                                {mentor.companyName}
                            </p>

                            <p className="text-sm text-gray-600 mb-4">
                                {mentor.yearsOfExperience} Years Experience
                            </p>

                            <p className="text-sm font-semibold text-[#062117] mb-4">
                                ₹{mentor.hourlyRate}/hr
                            </p>

                            <button
                                onClick={() => {
                                    setMentor(mentor);
                                    setOpen(true);
                                }}
                                className="w-full bg-[#062117] text-white py-2 rounded-lg font-semibold hover:bg-[#062117]/90"
                            >
                                Book Trial
                            </button>
                        </div>
                    ))}

                </div>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-1">
                <div className="bg-blue-50 border rounded-xl p-6 sticky top-6">
                    <Calendar />
                    <h3 className="font-bold mt-3">Your remaining trials</h3>
                    <p className="text-sm text-gray-600">
                        Book free trials & find your mentor.
                    </p>
                </div>
            </div>

            {/* MODAL */}
            {open && mentor && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
                        <button onClick={() => setOpen(false)} className="absolute top-4 right-4">
                            <X />
                        </button>

                        <h3 className="font-bold text-xl mb-4">
                            Book with {mentor.name}
                        </h3>

                        <div className="flex gap-2 mb-4">
                            {["FREE", "PREMIUM"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTrialType(t)}
                                    className={`flex-1 py-2 rounded-lg ${trialType === t
                                        ? "bg-[#062117] text-white"
                                        : "border"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <input
                            type="date"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {slotsData?.slots?.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSlot(s)}
                                    className={`border py-2 rounded-lg ${slot === s && "bg-[#062117] text-white"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={submitBooking}
                            className="w-full bg-[#062117] text-white py-3 rounded-lg font-bold"
                        >
                            {trialType === "FREE" ? "Confirm Free Booking" : "Proceed to Pay"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
