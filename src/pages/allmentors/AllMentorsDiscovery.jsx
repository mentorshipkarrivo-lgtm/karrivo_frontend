// import React, { useState } from 'react';
// import { Search, Star, Loader2, GraduationCap } from 'lucide-react';
// import { useGetAllMentorsQuery } from './Allmentorsapislice';
// import { useNavigate } from 'react-router-dom';
// import ProfileModal from '../home/mentorsection/ProfileModal';
// import BookingModal from '../home/mentorsection/BookingModal';
// import { motion } from "framer-motion";


// const AllMentorsDiscovery = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedMentorId] = useState(null);
//     const [selectedMentor,] = useState(null);
//     const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//     const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//     const navigate = useNavigate();

//     // Fetch all mentors without any filters
//     const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

//     // Handle different API response structures
//     const mentors = mentorsData?.data || mentorsData?.mentors || [];

//     // Debug log to check what we're receiving
//     console.log('API Response:', mentorsData);
//     console.log('Mentors array:', mentors);
//     console.log('Is Loading:', isLoading);
//     console.log('Is Error:', isError);

//     // 🔥 CHECK IF USER IS LOGGED IN
//     const isLoggedIn = !!localStorage.getItem("authToken");

//     // Filter mentors based on search query only (client-side filtering)
//     const filteredMentors = mentors.filter(mentor => {
//         if (!searchQuery.trim()) return true;

//         const searchLower = searchQuery.toLowerCase();
//         return (
//             mentor.fullName?.toLowerCase().includes(searchLower) ||
//             mentor.currentRole?.toLowerCase().includes(searchLower) ||
//             mentor.companyName?.toLowerCase().includes(searchLower) ||
//             mentor.mentorCategory?.toLowerCase().includes(searchLower) ||
//             mentor.currentSkills?.toLowerCase().includes(searchLower)
//         );
//     });

//     // 🔥 UPDATED: Handle Book Session with Login Check
//     const handleBookSession = (mentor) => {
//         console.log("Book session clicked for mentor:", mentor._id);

//         if (!isLoggedIn) {
//             // User NOT logged in → Redirect to login WITH mentorId
//             console.log("User not logged in, redirecting to login with mentorId:", mentor._id);
//             navigate(`/login?mentorId=${mentor._id}`);
//         } else {
//             // User IS logged in → Go directly to booking page
//             console.log("User logged in, going to booking page with mentorId:", mentor._id);
//             navigate(`/book-session?mentorId=${mentor._id}`);
//         }
//     };

//     // Handle View Profile
//     const handleViewProfile = (mentor) => {
//         navigate(`/mentor-profile/${mentor._id}`);
//     };

//     // Loading state
//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28 flex justify-center items-center">
//                 <div className="text-center">
//                     <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
//                     <p className="text-gray-400 text-lg">Loading mentors...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (isError) {
//         return (
//             <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center py-16 bg-[#0a2d20] border border-red-500/30 rounded-2xl">
//                         <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <Search className="w-10 h-10 text-red-500" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-white mb-2">Error loading mentors</h3>
//                         <p className="text-gray-400 mb-6">{error?.data?.message || 'Something went wrong'}</p>
//                         <button
//                             onClick={() => refetch()}
//                             className="px-8 py-3 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0098cc]/30 transition-all"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Header */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="mb-8"
//                     >
//                         <div className="flex items-center gap-3 mb-3">
//                             <GraduationCap className="w-10 h-10 text-[#0098cc]" />
//                             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-[#ffffff] bg-clip-text text-transparent">
//                                 All Available Mentors
//                             </h1>
//                         </div>
//                         <p className="text-white/80">Learn from industry experts at leading tech companies</p>
//                     </motion.div>

//                     {/* Search Bar */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                         className="mb-8"
//                     >
//                         <div className="relative max-w-2xl">
//                             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                                 type="text"
//                                 placeholder="Search by name, role, company, category, or skills..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-[#0098cc]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
//                             />
//                         </div>
//                     </motion.div>

//                     {/* Results Count */}
//                     <div className="mb-6 flex items-center justify-between">
//                         <div className="text-white/80">
//                             Showing <span className="text-[#0098cc] font-bold text-lg">{filteredMentors.length}</span> mentors
//                         </div>
//                         {searchQuery && (
//                             <button
//                                 onClick={() => setSearchQuery('')}
//                                 className="text-[#0098cc] text-sm hover:text-[#00b4e6] transition-colors"
//                             >
//                                 Clear Search
//                             </button>
//                         )}
//                     </div>

//                     {/* Mentor Cards Grid */}
//                     {filteredMentors.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {filteredMentors.map((mentor, index) => {
//                                 const skillsArray = mentor.currentSkills
//                                     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
//                                     : [];

//                                 return (
//                                     <motion.div
//                                         key={mentor._id || index}
//                                         initial={{ opacity: 0, y: 30 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ duration: 0.6, delay: index * 0.1 }}
//                                         className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-xl transition-all"
//                                     >
//                                         <div className="w-full h-44 overflow-hidden">
//                                             <img
//                                                 src={mentor.profileImage || "https://via.placeholder.com/400"}
//                                                 alt={mentor.fullName}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>

//                                         <div className="p-4">
//                                             <h3 className="text-[#062117] font-bold text-lg mb-1">
//                                                 {mentor.fullName || "Unknown Mentor"}
//                                             </h3>
//                                             <p className="text-[#062117]/70 text-sm mb-2">
//                                                 {mentor.currentRole || "Role not specified"}
//                                             </p>

//                                             <div className="flex flex-wrap gap-2 mb-2">
//                                                 {skillsArray.slice(0, 3).map((skill, i) => (
//                                                     <span
//                                                         key={i}
//                                                         className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc]"
//                                                     >
//                                                         {skill}
//                                                     </span>
//                                                 ))}
//                                             </div>

//                                             <div className="flex items-center justify-between mb-3">
//                                                 <div className="flex items-center gap-2">
//                                                     <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                                                     <span className="text-sm text-[#062117] font-semibold">5.0</span>
//                                                 </div>
//                                                 <span className="text-sm text-[#062117]/70">
//                                                     {mentor.yearsOfExperience || 0}+ yrs exp
//                                                 </span>
//                                             </div>

//                                             <div className="flex flex-col gap-2">
//                                                 <button
//                                                     onClick={() => handleViewProfile(mentor)}
//                                                     className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
//                                                 >
//                                                     View Profile
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleBookSession(mentor)}
//                                                     className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
//                                                 >
//                                                     Book Session
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         <div className="text-center py-16 bg-white/5 border border-[#0098cc]/20 rounded-2xl">
//                             <div className="w-16 h-16 bg-[#0098cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <Search className="w-8 h-8 text-[#0098cc]" />
//                             </div>
//                             <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
//                             <p className="text-gray-400 mb-4">
//                                 {searchQuery ? 'Try adjusting your search query' : 'No mentors available at the moment'}
//                             </p>
//                             {searchQuery && (
//                                 <button
//                                     onClick={() => setSearchQuery('')}
//                                     className="px-6 py-2 bg-[#0098cc] text-white rounded-lg hover:bg-[#00b4e6] transition-colors"
//                                 >
//                                     Clear Search
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {selectedMentor && (
//                 <>
//                     <ProfileModal
//                         mentorId={selectedMentorId}
//                         isOpen={isProfileModalOpen}
//                         onClose={() => setIsProfileModalOpen(false)}
//                         onBookSession={() => {
//                             setIsProfileModalOpen(false);
//                             setIsBookingModalOpen(true);
//                         }}
//                     />
//                     <BookingModal
//                         mentor={selectedMentor}
//                         isOpen={isBookingModalOpen}
//                         onClose={() => setIsBookingModalOpen(false)}
//                     />
//                 </>
//             )}
//         </>
//     );
// };

// export default AllMentorsDiscovery;

import React, { useState } from 'react';
import { Search, Loader2, GraduationCap, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { useGetAllMentorsQuery } from './Allmentorsapislice';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../home/mentorsection/ProfileModal';
import BookingModal from '../home/mentorsection/BookingModal';
import { motion } from "framer-motion";


const AllMentorsDiscovery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMentorId] = useState(null);
    const [selectedMentor,] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate();

    const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

    const mentors = mentorsData?.data || mentorsData?.mentors || [];

    const isLoggedIn = !!localStorage.getItem("authToken");

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

    const handleBookSession = (mentor) => {
        if (!isLoggedIn) {
            navigate(`/login?mentorId=${mentor._id}`);
        } else {
            navigate(`/book-session?mentorId=${mentor._id}`);
        }
    };

    const handleViewProfile = (mentor) => {
        navigate(`/mentor-profile/${mentor._id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen py-8 px-4 pt-28 flex justify-center items-center" style={{ backgroundColor: "#062117" }}>
                <div className="text-center">
                    <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: "#0098cc" }} />
                    <p className="text-gray-400 text-lg">Loading mentors...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen py-8 px-4 pt-28" style={{ backgroundColor: "#062117" }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: "#0a2d20", borderColor: "rgba(239,68,68,0.3)" }}>
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                            <Search className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Error loading mentors</h3>
                        <p className="text-gray-400 mb-6">{error?.data?.message || 'Something went wrong'}</p>
                        <button
                            onClick={() => refetch()}
                            className="px-8 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                            style={{ backgroundColor: "#0098cc" }}
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
            <div className="min-h-screen py-8 px-4 pt-28" style={{ backgroundColor: "#062117" }}>
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <GraduationCap className="w-10 h-10" style={{ color: "#0098cc" }} />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                All Available Mentors
                            </h1>
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.6)" }}>
                            Learn from industry experts at leading tech companies
                        </p>
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
                                className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(0,152,204,0.3)",
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#0098cc")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.3)")}
                            />
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <div className="mb-6 flex items-center justify-between">
                        <div style={{ color: "rgba(255,255,255,0.7)" }}>
                            Showing{" "}
                            <span className="font-bold text-lg" style={{ color: "#0098cc" }}>
                                {filteredMentors.length}
                            </span>{" "}
                            mentors
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-sm transition-colors"
                                style={{ color: "#0098cc" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#00b4e6")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#0098cc")}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>

                    {/* Mentor Cards Grid */}
                    {filteredMentors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                            {filteredMentors.map((mentor, index) => {
                                const skillsArray = mentor.currentSkills
                                    ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
                                    : [];

                                const displaySkills = [
                                    skillsArray[0] || null,
                                    skillsArray[1] || null,
                                    skillsArray[2] || null,
                                ];

                                const initials = mentor.fullName
                                    ? mentor.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
                                    : "?";

                                return (
                                    <motion.div
                                        key={mentor._id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.08 }}
                                        className="rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
                                        style={{
                                            backgroundColor: "#0a2d20",
                                            border: "1px solid rgba(0,152,204,0.2)",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.5)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.2)")}
                                    >
                                        {/* IMAGE / AVATAR AREA */}
                                        <div
                                            className="h-40 w-full shrink-0 relative flex items-center justify-center overflow-hidden"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(0,152,204,0.15) 0%, #062117 100%)",
                                            }}
                                        >
                                            {mentor.profileImage ? (
                                                <img
                                                    src={mentor.profileImage}
                                                    alt={mentor.fullName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className="w-20 h-20 rounded-full flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: "rgba(0,152,204,0.2)",
                                                        border: "2px solid rgba(0,152,204,0.4)",
                                                    }}
                                                >
                                                    <span className="text-2xl font-bold" style={{ color: "#0098cc" }}>
                                                        {initials}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* CARD BODY */}
                                        <div className="p-5 flex flex-col flex-1">

                                            {/* NAME */}
                                            <h3 className="font-bold text-base leading-tight line-clamp-1 text-white">
                                                {mentor.fullName || "Unknown Mentor"}
                                            </h3>

                                            {/* ROLE */}
                                            <p className="text-sm font-semibold mt-1 line-clamp-1" style={{ color: "#0098cc" }}>
                                                {mentor.currentRole || "Role not specified"}
                                            </p>

                                            {/* COMPANY */}
                                            <p className="text-xs mt-0.5 line-clamp-1 h-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                {mentor.companyName || ""}
                                            </p>

                                            {/* SKILLS — always 3 slots */}
                                            <div className="flex gap-1.5 mt-3">
                                                {displaySkills.map((skill, i) => (
                                                    <div key={i} className="flex-1">
                                                        {skill ? (
                                                            <span
                                                                className="block text-center text-xs px-1.5 py-1 rounded border truncate w-full"
                                                                style={{
                                                                    backgroundColor: "rgba(0,152,204,0.1)",
                                                                    color: "#0098cc",
                                                                    borderColor: "rgba(0,152,204,0.2)",
                                                                }}
                                                            >
                                                                {skill}
                                                            </span>
                                                        ) : (
                                                            <span className="block h-[26px]" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* EXP + LOCATION */}
                                            <div
                                                className="mt-4 pt-3 flex items-center justify-between gap-2"
                                                style={{ borderTop: "1px solid rgba(0,152,204,0.15)" }}
                                            >
                                                <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                                    <Briefcase className="w-3 h-3" />
                                                    <span className="truncate">{mentor.yearsOfExperience || 0}+ yrs exp</span>
                                                </span>
                                                {mentor.location && (
                                                    <span className="flex items-center gap-1 text-xs truncate max-w-[90px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                        <MapPin className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{mentor.location}</span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* BUTTONS — pinned to bottom */}
                                            <div className="mt-auto pt-4 flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleViewProfile(mentor)}
                                                    className="w-full text-sm font-semibold py-3 rounded-lg border transition-all hover:scale-105"
                                                    style={{
                                                        borderColor: "#0098cc",
                                                        color: "#0098cc",
                                                        backgroundColor: "transparent",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#0098cc";
                                                        e.currentTarget.style.color = "#fff";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = "transparent";
                                                        e.currentTarget.style.color = "#0098cc";
                                                    }}
                                                >
                                                    View Profile
                                                </button>
                                                <button
                                                    onClick={() => handleBookSession(mentor)}
                                                    className="w-full text-white text-sm font-semibold py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2"
                                                    style={{ backgroundColor: "#0098cc" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#007fa3")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0098cc")}
                                                >
                                                    Book Session
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div
                            className="text-center py-16 rounded-2xl border"
                            style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(0,152,204,0.2)" }}
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: "rgba(0,152,204,0.1)" }}
                            >
                                <Search className="w-8 h-8" style={{ color: "#0098cc" }} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
                            <p className="text-gray-400 mb-4">
                                {searchQuery ? 'Try adjusting your search query' : 'No mentors available at the moment'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-2 text-white rounded-lg transition-colors hover:scale-105"
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