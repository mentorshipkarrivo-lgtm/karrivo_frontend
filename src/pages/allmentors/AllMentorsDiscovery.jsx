

    
    import React, { useState } from 'react';
import { Search, Loader2, GraduationCap, Briefcase, Star, ArrowRight } from 'lucide-react';
import { useGetAllMentorsQuery } from './Allmentorsapislice';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../home/mentorsection/ProfileModal';
import BookingModal from '../home/mentorsection/BookingModal';
import { motion } from "framer-motion";

const AllMentorsDiscovery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMentorId] = useState(null);
    const [selectedMentor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate();

    const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

    const mentors = mentorsData?.data || mentorsData?.mentors || [];
    const isLoggedIn = !!localStorage.getItem("authToken");

    const filteredMentors = mentors.filter(mentor => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            mentor.fullName?.toLowerCase().includes(q) ||
            mentor.currentRole?.toLowerCase().includes(q) ||
            mentor.companyName?.toLowerCase().includes(q) ||
            mentor.mentorCategory?.toLowerCase().includes(q) ||
            mentor.currentSkills?.toLowerCase().includes(q)
        );
    });

    const handleBookSession = (mentor) => {
        if (!isLoggedIn) navigate(`/login?mentorId=${mentor._id}`);
        else navigate(`/book-session?mentorId=${mentor._id}`);
    };

    const handleViewProfile = (mentor) => {
        navigate(`/mentor-profile/${mentor._id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white pt-28 flex justify-center items-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: "#0098cc" }} />
                    <p className="text-slate-400 text-base">Loading mentors...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-white pt-28 px-4">
                <div className="max-w-7xl mx-auto text-center py-16 rounded-2xl border border-red-100 bg-red-50">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Error loading mentors</h3>
                    <p className="text-slate-500 mb-6">{error?.data?.message || 'Something went wrong'}</p>
                    <button
                        onClick={() => refetch()}
                        className="px-8 py-3 text-white font-semibold rounded-xl transition-all hover:opacity-90"
                        style={{ backgroundColor: "#0098cc" }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white py-8 px-4 pt-28">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <GraduationCap className="w-8 h-8" style={{ color: "#0098cc" }} />
                            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">
                                All Available Mentors
                            </h1>
                        </div>
                        <p className="text-slate-500 text-sm">
                            Learn from industry experts at leading tech companies
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, role, company, category, or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-[#1a1a2e] placeholder-slate-400
                                           border border-[#d9e2ec] focus:outline-none focus:border-[#0098cc] transition-colors text-sm"
                            />
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-bold text-[#0098cc]">{filteredMentors.length}</span>{" "}
                            mentor{filteredMentors.length !== 1 ? "s" : ""}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-sm font-medium transition-colors"
                                style={{ color: "#0098cc" }}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>

                    {/* Mentor Cards Grid */}
                    {filteredMentors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredMentors.map((mentor, index) => {
                                const guidanceAreas = Array.isArray(mentor.guidanceAreas) ? mentor.guidanceAreas : [];

                                const initials = mentor.fullName
                                    ? mentor.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
                                    : "?";

                                const profilePhoto =
                                    mentor.profilePhoto ||
                                    mentor["profile Photo"] ||
                                    mentor.profileImage ||
                                    "";

                                const rating = mentor.rating || 5.0;

                                return (
                                    <motion.article
                                        key={mentor._id || index}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="group bg-white rounded-xl border border-slate-200 overflow-hidden
                                                   hover:border-[#0098cc] hover:shadow-md transition-all duration-200
                                                   flex items-stretch h-[180px]"
                                    >
                                        {/* LEFT: Image */}
                                        <div className="relative w-[160px] h-full bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 overflow-hidden">
                                            {profilePhoto ? (
                                                <>
                                                    <img
                                                        src={profilePhoto}
                                                        alt={mentor.fullName}
                                                        className="w-full h-full object-cover object-center"
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex";
                                                        }}
                                                    />
                                                    <div className="hidden w-full h-full bg-[#e8f6fc] items-center justify-center">
                                                        <span className="text-4xl font-bold text-[#0098cc]">{initials}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-[#e8f6fc] flex items-center justify-center">
                                                    <span className="text-4xl font-bold text-[#0098cc]">{initials}</span>
                                                </div>
                                            )}

                                            {/* Rating badge */}
                                            <div className="absolute top-2 right-2 bg-white shadow-md rounded-full px-2 py-0.5 flex items-center gap-0.5 border border-slate-100">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-[10px] font-bold text-slate-800">{rating.toFixed(1)}</span>
                                            </div>

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                                        </div>

                                        {/* RIGHT: Content */}
                                        <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
                                            <div>
                                                <h3 className="font-semibold text-[#1a1a2e] text-sm leading-tight truncate">
                                                    {mentor.fullName || "Unknown Mentor"}
                                                </h3>
                                                <p className="text-xs mt-0.5 truncate">
                                                    <span className="text-[#0098cc] font-medium">{mentor.currentRole || "Mentor"}</span>
                                                    {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience}+ yrs` : ""}
                                                </p>
                                                {mentor.companyName && (
                                                    <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 truncate">
                                                        <Briefcase className="w-3 h-3 flex-shrink-0" />
                                                        <span className="truncate">{mentor.companyName}</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Guidance area pills */}
                                            {guidanceAreas.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {guidanceAreas.slice(0, 2).map((area, i) => (
                                                        <span key={i} className="inline-block text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm">
                                                            {area}
                                                        </span>
                                                    ))}
                                                    {guidanceAreas.length > 2 && (
                                                        <span className="text-[8px] text-slate-400 px-1.5 py-0.5">+{guidanceAreas.length - 2}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Buttons */}
                                            <div className="flex gap-2 mt-1">
                                                <button
                                                    onClick={() => handleViewProfile(mentor)}
                                                    className="flex-1 py-1.5 rounded-lg font-semibold text-xs text-white
                                                               transition-all duration-150 active:scale-[0.97]
                                                               bg-[#1a1a2e] hover:bg-[#0098cc]"
                                                >
                                                    View Profile
                                                </button>
                                             
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 rounded-2xl border border-slate-200 bg-slate-50">
                            <div className="w-14 h-14 rounded-full bg-[#e8f6fc] flex items-center justify-center mx-auto mb-4">
                                <Search className="w-7 h-7 text-[#0098cc]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">No mentors found</h3>
                            <p className="text-slate-500 text-sm mb-4">
                                {searchQuery ? 'Try adjusting your search query' : 'No mentors available at the moment'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-2 text-white rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                                    style={{ backgroundColor: "#0098cc" }}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {selectedMentor && (
                <>
                    <ProfileModal
                        mentorId={selectedMentorId}
                        isOpen={isProfileModalOpen}
                        onClose={() => setIsProfileModalOpen(false)}
                        onBookSession={() => {
                            setIsProfileModalOpen(false);
                            setIsBookingModalOpen(true);
                        }}
                    />
                    <BookingModal
                        mentor={selectedMentor}
                        isOpen={isBookingModalOpen}
                        onClose={() => setIsBookingModalOpen(false)}
                    />
                </>
            )}
        </>
    );
};

export default AllMentorsDiscovery;


// export default AllMentorsDiscovery;


