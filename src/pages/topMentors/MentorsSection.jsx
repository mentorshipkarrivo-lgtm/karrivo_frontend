import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, X, Calendar, Users, Mail, Phone, MapPin, Clock, ChevronRight, CreditCard, Lock } from 'lucide-react';
import MentorMenteePlatform from './MentorMentee';
import { useFetchTopMentorsQuery, useBookSessionMutation } from "./Mentorsectionapislice"
import AllMentorsDiscovery from '../allmentors/AllMentorsDiscovery';

export default function FindTopMentors() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 8 });
    const mentors = Array.isArray(data) ? data : [];

    const [selectedMentor, setSelectedMentor] = useState(null);
    const [bookingData, setBookingData] = useState({ 
        checkIn: '', 
        checkOut: '', 
        guests: 1, 
        name: '', 
        lastName: '',
        email: '', 
        phone: '',
        sessionType: 'One-on-One'
    });
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        billingAddress: ''
    });
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [bookSession] = useBookSessionMutation();

    const handleViewDetails = (mentor) => {
        setSelectedMentor(mentor);
        setShowMoreDetails(false);
        setShowPaymentForm(false);
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        // Show payment form instead of booking immediately
        setShowPaymentForm(true);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            // In a real app, you'd process payment here
            await bookSession({ mentorId: selectedMentor._id, ...bookingData }).unwrap();
            alert('Payment successful! Session booked.');
            setSelectedMentor(null);
            setShowPaymentForm(false);
            setBookingData({ 
                checkIn: '', 
                checkOut: '', 
                guests: 1, 
                name: '', 
                lastName: '',
                email: '', 
                phone: '',
                sessionType: 'One-on-One'
            });
            setPaymentData({
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                cvv: '',
                billingAddress: ''
            });
        } catch (err) {
            console.error(err);
            alert('Payment failed!');
        }
    };

    const calculateTotalAmount = () => {
        if (!bookingData.checkIn || !bookingData.checkOut) return 0;
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const hours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
        return hours * (selectedMentor?.hourlyRate || 0);
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#062117' }}>
            {/* Hero Section */}
            <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center text-white px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">Connect with Top Mentors</h1>
                    <p className="text-sm sm:text-base text-gray-300 mb-4">Browse mentors and book sessions to accelerate your career.</p>
                </div>
            </div>

            {/* Mentor Grid */}
            {/* <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
                {isLoading ? (
                    <p className="text-white text-center">Loading mentors...</p>
                ) : isError ? (
                    <p className="text-red-500 text-center">Failed to load mentors</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {mentors.map((mentor) => (
                            <div key={mentor._id} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-all">
                                <div className="relative h-48 sm:h-60 overflow-hidden">
                                    <img
                                        src={mentor.profileImage || 'https://img.freepik.com/free-photo/confident-man_1098-16175.jpg?semt=ais_hybrid&w=740&q=80'}
                                        alt={mentor.fullName}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#0098cc] shadow-lg">
                                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 flex flex-col gap-2">
                                    <h3 className="text-base sm:text-lg font-bold text-[#062117] truncate">{mentor.fullName}</h3>
                                    <p className="text-[#062117]/70 text-xs sm:text-sm truncate">{mentor.currentRole}</p>
                                    <button
                                        onClick={() => handleViewDetails(mentor)}
                                        className="mt-2 bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded text-sm transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}

            <AllMentorsDiscovery />

            <MentorMenteePlatform />

            {/* Modal */}
            {selectedMentor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg sm:rounded-xl w-full max-w-6xl my-4 sm:my-8 relative">
                        <button
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
                            onClick={() => {
                                setSelectedMentor(null);
                                setShowPaymentForm(false);
                            }}
                        >
                            <X size={20} className="sm:w-6 sm:h-6" />
                        </button>

                        <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-hidden">
                            {/* Left: Booking/Payment Form */}
                            <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                                {!showPaymentForm ? (
                                    // Booking Form
                                    <form className="space-y-4 sm:space-y-6" onSubmit={handleBookingSubmit}>
                                        {/* Section 1: Session Details */}
                                        <div>
                                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                                                    1
                                                </div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Session Details</h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Session Start Date & Time
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="datetime-local"
                                                            name="checkIn"
                                                            value={bookingData.checkIn}
                                                            onChange={handleBookingChange}
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Session End Date & Time
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="datetime-local"
                                                            name="checkOut"
                                                            value={bookingData.checkOut}
                                                            onChange={handleBookingChange}
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        No. of Participants
                                                    </label>
                                                    <div className="relative">
                                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <select
                                                            name="guests"
                                                            value={bookingData.guests}
                                                            onChange={handleBookingChange}
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white appearance-none"
                                                            required
                                                        >
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Session Type
                                                    </label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <select
                                                            name="sessionType"
                                                            value={bookingData.sessionType}
                                                            onChange={handleBookingChange}
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent bg-white appearance-none"
                                                            required
                                                        >
                                                            <option>One-on-One</option>
                                                            <option>Group Session</option>
                                                            <option>Workshop</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Contact Details */}
                                        <div>
                                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                                                    2
                                                </div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Contact Details</h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={bookingData.name}
                                                        onChange={handleBookingChange}
                                                        placeholder="Your first name"
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={bookingData.lastName}
                                                        onChange={handleBookingChange}
                                                        placeholder="Your last name"
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Phone Number
                                                    </label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={bookingData.phone}
                                                            onChange={handleBookingChange}
                                                            placeholder="Your phone number"
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Email
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={bookingData.email}
                                                            onChange={handleBookingChange}
                                                            placeholder="Your email address"
                                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-black hover:bg-gray-900 text-white font-semibold py-2.5 sm:py-3 rounded-lg w-full transition text-sm sm:text-base"
                                        >
                                            Proceed to Payment
                                        </button>
                                    </form>
                                ) : (
                                    // Payment Form
                                    <form className="space-y-4 sm:space-y-6" onSubmit={handlePaymentSubmit}>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowPaymentForm(false)}
                                                className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm flex items-center gap-1"
                                            >
                                                <ChevronRight className="w-4 h-4 rotate-180" />
                                                Back
                                            </button>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                                                    3
                                                </div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Payment Details</h3>
                                            </div>

                                            {/* Booking Summary */}
                                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-5 mb-6 border border-blue-100">
                                                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Booking Summary</h4>
                                                <div className="space-y-2 text-xs sm:text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Mentor</span>
                                                        <span className="font-semibold text-gray-800">{selectedMentor.fullName}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Session Type</span>
                                                        <span className="font-semibold text-gray-800">{bookingData.sessionType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Participants</span>
                                                        <span className="font-semibold text-gray-800">{bookingData.guests}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Duration</span>
                                                        <span className="font-semibold text-gray-800">
                                                            {bookingData.checkIn && bookingData.checkOut 
                                                                ? Math.max(1, Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60))) + ' hours'
                                                                : '0 hours'
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Rate per hour</span>
                                                        <span className="font-semibold text-gray-800">₹{selectedMentor.hourlyRate}</span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-blue-200 pt-3 mt-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-base font-bold text-gray-800">Total Amount</span>
                                                        <span className="text-2xl font-bold text-[#0098cc]">₹{calculateTotalAmount()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Simple Payment Info */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={`${bookingData.name} ${bookingData.lastName}`}
                                                        readOnly
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-600"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                        Amount to Pay
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                                                        <input
                                                            type="text"
                                                            value={calculateTotalAmount()}
                                                            readOnly
                                                            className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-600 font-semibold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Razorpay Info */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-6">
                                                <div className="flex items-start gap-3">
                                                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 mb-1">Secure Payment via Razorpay</p>
                                                        <p className="text-xs text-gray-600">
                                                            You'll be redirected to Razorpay's secure payment gateway to complete your transaction.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 sm:py-3.5 rounded-lg w-full transition text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <Lock className="w-5 h-5" />
                                            Pay Now - ₹{calculateTotalAmount()}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Right: Mentor Preview */}
                            <div className="flex-1 bg-gray-50 lg:border-l border-gray-200 overflow-y-auto">
                                <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-amber-50 to-orange-50">
                                    <img
                                        src={selectedMentor.profileImage || 'https://img.freepik.com/free-photo/confident-man_1098-16175.jpg?semt=ais_hybrid&w=740&q=80'}
                                        alt={selectedMentor.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                <div className="p-4 sm:p-6">
                                    {!showMoreDetails ? (
                                        <>
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                                <h2 className="text-xl sm:text-2xl font-bold text-[#062117]">{selectedMentor.fullName}</h2>
                                                <div className="text-left sm:text-right">
                                                    <div className="text-2xl font-bold text-[#062117]">₹{selectedMentor.hourlyRate}</div>
                                                    <div className="text-xs sm:text-sm text-gray-500">per hour</div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                                <p className="text-sm sm:text-base text-gray-700 font-medium">{selectedMentor.currentRole}</p>
                                                <p className="text-sm sm:text-base text-gray-600">{selectedMentor.companyName}</p>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        {selectedMentor.yearsOfExperience} yrs experience
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        {selectedMentor.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 border border-gray-200">
                                                <h3 className="font-semibold text-[#062117] mb-3 text-sm sm:text-base">Session Features</h3>
                                                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                                                    <li className="flex items-start gap-2">
                                                        <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <span>Expert {selectedMentor.mentorCategory} guidance</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <span>{selectedMentor.mentoringStyle} mentoring style</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <span>Personalized learning approach</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <span>Industry insights & best practices</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <button
                                                className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm flex items-center gap-1"
                                                onClick={() => setShowMoreDetails(true)}
                                            >
                                                View Full Profile
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="space-y-3 sm:space-y-4">
                                            <button
                                                className="text-[#0098cc] hover:text-[#007fa3] font-medium text-xs sm:text-sm mb-2 flex items-center gap-1"
                                                onClick={() => setShowMoreDetails(false)}
                                            >
                                                <ChevronRight className="w-4 h-4 rotate-180" />
                                                Back to Summary
                                            </button>
                                            
                                            <div className="space-y-3 text-xs sm:text-sm">
                                                <div className="pb-3 border-b border-gray-200">
                                                    <p className="font-semibold text-gray-700 mb-1">Email</p>
                                                    <p className="text-gray-600 break-all">{selectedMentor.email}</p>
                                                </div>
                                                <div className="pb-3 border-b border-gray-200">
                                                    <p className="font-semibold text-gray-700 mb-1">Phone</p>
                                                    <p className="text-gray-600">{selectedMentor.phone}</p>
                                                </div>
                                                {selectedMentor.languages && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Languages</p>
                                                        <p className="text-gray-600">{selectedMentor.languages.join(', ')}</p>
                                                    </div>
                                                )}
                                                {selectedMentor.areasOfInterest && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Areas of Interest</p>
                                                        <p className="text-gray-600">{selectedMentor.areasOfInterest}</p>
                                                    </div>
                                                )}
                                                {selectedMentor.currentSkills && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Current Skills</p>
                                                        <p className="text-gray-600">{selectedMentor.currentSkills}</p>
                                                    </div>
                                                )}
                                                {selectedMentor.highestDegree && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Education</p>
                                                        <p className="text-gray-600">{selectedMentor.highestDegree} in {selectedMentor.fieldOfStudy}</p>
                                                        {selectedMentor.schoolName && (
                                                            <p className="text-gray-500 text-xs mt-1">{selectedMentor.schoolName}</p>
                                                        )}
                                                    </div>
                                                )}
                                                {selectedMentor.whyMentor && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Why I Mentor</p>
                                                        <p className="text-gray-600">{selectedMentor.whyMentor}</p>
                                                    </div>
                                                )}
                                                {selectedMentor.greatestAchievement && (
                                                    <div className="pb-3 border-b border-gray-200">
                                                        <p className="font-semibold text-gray-700 mb-1">Greatest Achievement</p>
                                                        <p className="text-gray-600">{selectedMentor.greatestAchievement}</p>
                                                    </div>
                                                )}
                                                {selectedMentor.linkedinUrl && (
                                                    <a 
                                                        href={selectedMentor.linkedinUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[#0098cc] hover:text-[#007fa3] font-medium"
                                                    >
                                                        View LinkedIn Profile
                                                        <ChevronRight className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}