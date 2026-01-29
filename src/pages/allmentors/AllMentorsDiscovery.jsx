import React, { useState } from 'react';
import { Search, Star, Loader2, GraduationCap } from 'lucide-react';
import { useGetAllMentorsQuery } from './allmentors';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../home/mentorsection/profileSection.jsx';
import BookingModal from '../home/mentorsection/BookModal.jsx';

const AllMentorsDiscovery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMentorId] = useState(null);
    const [selectedMentor,] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate();

    // Fetch all mentors without any filters
    const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

    // Handle different API response structures
    const mentors = mentorsData?.data || mentorsData?.mentors || [];

    // Debug log to check what we're receiving
    console.log('API Response:', mentorsData);
    console.log('Mentors array:', mentors);
    console.log('Is Loading:', isLoading);
    console.log('Is Error:', isError);

    // 🔥 CHECK IF USER IS LOGGED IN
    const isLoggedIn = !!localStorage.getItem("authToken");

    // Filter mentors based on search query only (client-side filtering)
    const filteredMentors = mentors.filter(mentor => {
        if (!searchQuery.trim()) return true;

        const searchLower = searchQuery.toLowerCase();
        return (
            mentor.fullName?.toLowerCase().includes(searchLower) ||
            mentor.currentRole?.toLowerCase().includes(searchLower) ||
            mentor.companyName?.toLowerCase().includes(searchLower) ||
            mentor.mentorCategory?.toLowerCase().includes(searchLower) ||
            mentor.currentSkills?.toLowerCase().includes(searchLower)
        );
    });

    // 🔥 UPDATED: Handle Book Session with Login Check
    const handleBookSession = (mentor) => {
        console.log("Book session clicked for mentor:", mentor._id);

        if (!isLoggedIn) {
            // User NOT logged in → Redirect to login WITH mentorId
            console.log("User not logged in, redirecting to login with mentorId:", mentor._id);
            navigate(`/login?mentorId=${mentor._id}`);
        } else {
            // User IS logged in → Go directly to booking page
            console.log("User logged in, going to booking page with mentorId:", mentor._id);
            navigate(`/book-session?mentorId=${mentor._id}`);
        }
    };

    // Handle View Profile
    const handleViewProfile = (mentor) => {
        navigate(`/mentor-profile/${mentor._id}`);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28 flex justify-center items-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Loading mentors...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16 bg-[#0a2d20] border border-red-500/30 rounded-2xl">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Error loading mentors</h3>
                        <p className="text-gray-400 mb-6">{error?.data?.message || 'Something went wrong'}</p>
                        <button
                            onClick={() => refetch()}
                            className="px-8 py-3 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0098cc]/30 transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <GraduationCap className="w-10 h-10 text-[#0098cc]" />
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-[#ffffff] bg-clip-text text-transparent">
                                All Available Mentors
                            </h1>
                        </div>
                        <p className="text-white/80">Learn from industry experts at leading tech companies</p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, role, company, category, or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-[#0098cc]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
                            />
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="text-white/80">
                            Showing <span className="text-[#0098cc] font-bold text-lg">{filteredMentors.length}</span> mentors
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-[#0098cc] text-sm hover:text-[#00b4e6] transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>

                    {/* Mentor Cards Grid */}
                    {filteredMentors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredMentors.map((mentor, index) => {
                                const skillsArray = mentor.currentSkills
                                    ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
                                    : [];

                                return (
                                    <motion.div
                                        key={mentor._id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-xl transition-all"
                                    >
                                        <div className="w-full h-44 overflow-hidden">
                                            <img
                                                src={mentor.profileImage || "https://via.placeholder.com/400"}
                                                alt={mentor.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-[#062117] font-bold text-lg mb-1">
                                                {mentor.fullName || "Unknown Mentor"}
                                            </h3>
                                            <p className="text-[#062117]/70 text-sm mb-2">
                                                {mentor.currentRole || "Role not specified"}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {skillsArray.slice(0, 3).map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc]"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-sm text-[#062117] font-semibold">5.0</span>
                                                </div>
                                                <span className="text-sm text-[#062117]/70">
                                                    {mentor.yearsOfExperience || 0}+ yrs exp
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleViewProfile(mentor)}
                                                    className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
                                                >
                                                    View Profile
                                                </button>
                                                <button
                                                    onClick={() => handleBookSession(mentor)}
                                                    className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
                                                >
                                                    Book Session
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/5 border border-[#0098cc]/20 rounded-2xl">
                            <div className="w-16 h-16 bg-[#0098cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-[#0098cc]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
                            <p className="text-gray-400 mb-4">
                                {searchQuery ? 'Try adjusting your search query' : 'No mentors available at the moment'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-2 bg-[#0098cc] text-white rounded-lg hover:bg-[#00b4e6] transition-colors"
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