

    // import React, { useState } from 'react';
    // import { Search, Loader2, GraduationCap, Briefcase, MapPin, ArrowRight } from 'lucide-react';
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

    //     const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

    //     const mentors = mentorsData?.data || mentorsData?.mentors || [];

    //     const isLoggedIn = !!localStorage.getItem("authToken");

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

    //     const handleBookSession = (mentor) => {
    //         if (!isLoggedIn) {
    //             navigate(`/login?mentorId=${mentor._id}`);
    //         } else {
    //             navigate(`/book-session?mentorId=${mentor._id}`);
    //         }
    //     };

    //     const handleViewProfile = (mentor) => {
    //         navigate(`/mentor-profile/${mentor._id}`);
    //     };

    //     if (isLoading) {
    //         return (
    //             <div className="min-h-screen py-8 px-4 pt-28 flex justify-center items-center" style={{ backgroundColor: "#062117" }}>
    //                 <div className="text-center">
    //                     <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: "#0098cc" }} />
    //                     <p className="text-gray-400 text-lg">Loading mentors...</p>
    //                 </div>
    //             </div>
    //         );
    //     }

    //     if (isError) {
    //         return (
    //             <div className="min-h-screen py-8 px-4 pt-28" style={{ backgroundColor: "#062117" }}>
    //                 <div className="max-w-7xl mx-auto">
    //                     <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: "#0a2d20", borderColor: "rgba(239,68,68,0.3)" }}>
    //                         <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
    //                             <Search className="w-10 h-10 text-red-500" />
    //                         </div>
    //                         <h3 className="text-2xl font-bold text-white mb-2">Error loading mentors</h3>
    //                         <p className="text-gray-400 mb-6">{error?.data?.message || 'Something went wrong'}</p>
    //                         <button
    //                             onClick={() => refetch()}
    //                             className="px-8 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
    //                             style={{ backgroundColor: "#0098cc" }}
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
    //             <div className="min-h-screen py-8 px-4 pt-28" style={{ backgroundColor: "#062117" }}>
    //                 <div className="max-w-7xl mx-auto">

    //                     {/* Header */}
    //                     <motion.div
    //                         initial={{ opacity: 0, y: 30 }}
    //                         animate={{ opacity: 1, y: 0 }}
    //                         transition={{ duration: 0.8 }}
    //                         className="mb-8"
    //                     >
    //                         <div className="flex items-center gap-3 mb-3">
    //                             <GraduationCap className="w-10 h-10" style={{ color: "#0098cc" }} />
    //                             <h1 className="text-3xl md:text-4xl font-bold text-white">
    //                                 All Available Mentors
    //                             </h1>
    //                         </div>
    //                         <p style={{ color: "rgba(255,255,255,0.6)" }}>
    //                             Learn from industry experts at leading tech companies
    //                         </p>
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
    //                                 className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors"
    //                                 style={{
    //                                     backgroundColor: "rgba(255,255,255,0.05)",
    //                                     border: "1px solid rgba(0,152,204,0.3)",
    //                                 }}
    //                                 onFocus={(e) => (e.currentTarget.style.borderColor = "#0098cc")}
    //                                 onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.3)")}
    //                             />
    //                         </div>
    //                     </motion.div>

    //                     {/* Results Count */}
    //                     <div className="mb-6 flex items-center justify-between">
    //                         <div style={{ color: "rgba(255,255,255,0.7)" }}>
    //                             Showing{" "}
    //                             <span className="font-bold text-lg" style={{ color: "#0098cc" }}>
    //                                 {filteredMentors.length}
    //                             </span>{" "}
    //                             mentors
    //                         </div>
    //                         {searchQuery && (
    //                             <button
    //                                 onClick={() => setSearchQuery('')}
    //                                 className="text-sm transition-colors"
    //                                 style={{ color: "#0098cc" }}
    //                                 onMouseEnter={(e) => (e.currentTarget.style.color = "#00b4e6")}
    //                                 onMouseLeave={(e) => (e.currentTarget.style.color = "#0098cc")}
    //                             >
    //                                 Clear Search
    //                             </button>
    //                         )}
    //                     </div>

    //                     {/* Mentor Cards Grid */}
    //                     {filteredMentors.length > 0 ? (
    //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
    //                             {filteredMentors.map((mentor, index) => {
    //                                 const skillsArray = mentor.currentSkills
    //                                     ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
    //                                     : [];

    //                                 const displaySkills = [
    //                                     skillsArray[0] || null,
    //                                     skillsArray[1] || null,
    //                                     skillsArray[2] || null,
    //                                 ];

    //                                 const initials = mentor.fullName
    //                                     ? mentor.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    //                                     : "?";

    //                                 return (
    //                                     <motion.div
    //                                         key={mentor._id || index}
    //                                         initial={{ opacity: 0, y: 30 }}
    //                                         animate={{ opacity: 1, y: 0 }}
    //                                         transition={{ duration: 0.6, delay: index * 0.08 }}
    //                                         className="rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
    //                                         style={{
    //                                             backgroundColor: "#0a2d20",
    //                                             border: "1px solid rgba(0,152,204,0.2)",
    //                                         }}
    //                                         onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.5)")}
    //                                         onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,152,204,0.2)")}
    //                                     >
    //                                         {/* IMAGE / AVATAR AREA */}
    //                                         <div
    //                                             className="h-40 w-full shrink-0 relative flex items-center justify-center overflow-hidden"
    //                                             style={{
    //                                                 background: "linear-gradient(135deg, rgba(0,152,204,0.15) 0%, #062117 100%)",
    //                                             }}
    //                                         >
    //                                             {mentor.profileImage ? (
    //                                                 <img
    //                                                     src={mentor.profileImage}
    //                                                     alt={mentor.fullName}
    //                                                     className="w-full h-full object-cover"
    //                                                 />
    //                                             ) : (
    //                                                 <div
    //                                                     className="w-20 h-20 rounded-full flex items-center justify-center"
    //                                                     style={{
    //                                                         backgroundColor: "rgba(0,152,204,0.2)",
    //                                                         border: "2px solid rgba(0,152,204,0.4)",
    //                                                     }}
    //                                                 >
    //                                                     <span className="text-2xl font-bold" style={{ color: "#0098cc" }}>
    //                                                         {initials}
    //                                                     </span>
    //                                                 </div>
    //                                             )}
    //                                         </div>

    //                                         {/* CARD BODY */}
    //                                         <div className="p-5 flex flex-col flex-1">

    //                                             {/* NAME */}
    //                                             <h3 className="font-bold text-base leading-tight line-clamp-1 text-white">
    //                                                 {mentor.fullName || "Unknown Mentor"}
    //                                             </h3>

    //                                             {/* ROLE */}
    //                                             <p className="text-sm font-semibold mt-1 line-clamp-1" style={{ color: "#0098cc" }}>
    //                                                 {mentor.currentRole || "Role not specified"}
    //                                             </p>

    //                                             {/* COMPANY */}
    //                                             <p className="text-xs mt-0.5 line-clamp-1 h-4" style={{ color: "rgba(255,255,255,0.4)" }}>
    //                                                 {mentor.companyName || ""}
    //                                             </p>

    //                                             {/* SKILLS — always 3 slots */}
    //                                             <div className="flex gap-1.5 mt-3">
    //                                                 {displaySkills.map((skill, i) => (
    //                                                     <div key={i} className="flex-1">
    //                                                         {skill ? (
    //                                                             <span
    //                                                                 className="block text-center text-xs px-1.5 py-1 rounded border truncate w-full"
    //                                                                 style={{
    //                                                                     backgroundColor: "rgba(0,152,204,0.1)",
    //                                                                     color: "#0098cc",
    //                                                                     borderColor: "rgba(0,152,204,0.2)",
    //                                                                 }}
    //                                                             >
    //                                                                 {skill}
    //                                                             </span>
    //                                                         ) : (
    //                                                             <span className="block h-[26px]" />
    //                                                         )}
    //                                                     </div>
    //                                                 ))}
    //                                             </div>

    //                                             {/* EXP + LOCATION */}
    //                                             <div
    //                                                 className="mt-4 pt-3 flex items-center justify-between gap-2"
    //                                                 style={{ borderTop: "1px solid rgba(0,152,204,0.15)" }}
    //                                             >
    //                                                 <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
    //                                                     <Briefcase className="w-3 h-3" />
    //                                                     <span className="truncate">{mentor.yearsOfExperience || 0}+ yrs exp</span>
    //                                                 </span>
    //                                                 {mentor.location && (
    //                                                     <span className="flex items-center gap-1 text-xs truncate max-w-[90px]" style={{ color: "rgba(255,255,255,0.4)" }}>
    //                                                         <MapPin className="w-3 h-3 shrink-0" />
    //                                                         <span className="truncate">{mentor.location}</span>
    //                                                     </span>
    //                                                 )}
    //                                             </div>

    //                                             {/* BUTTONS — pinned to bottom */}
    //                                             <div className="mt-auto pt-4 flex flex-col gap-2">
    //                                                 <button
    //                                                     onClick={() => handleViewProfile(mentor)}
    //                                                     className="w-full text-sm font-semibold py-3 rounded-lg border transition-all hover:scale-105"
    //                                                     style={{
    //                                                         borderColor: "#0098cc",
    //                                                         color: "#0098cc",
    //                                                         backgroundColor: "transparent",
    //                                                     }}
    //                                                     onMouseEnter={(e) => {
    //                                                         e.currentTarget.style.backgroundColor = "#0098cc";
    //                                                         e.currentTarget.style.color = "#fff";
    //                                                     }}
    //                                                     onMouseLeave={(e) => {
    //                                                         e.currentTarget.style.backgroundColor = "transparent";
    //                                                         e.currentTarget.style.color = "#0098cc";
    //                                                     }}
    //                                                 >
    //                                                     View Profile
    //                                                 </button>
    //                                                 <button
    //                                                     onClick={() => handleBookSession(mentor)}
    //                                                     className="w-full text-white text-sm font-semibold py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2"
    //                                                     style={{ backgroundColor: "#0098cc" }}
    //                                                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#007fa3")}
    //                                                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0098cc")}
    //                                                 >
    //                                                     Book Session
    //                                                     <ArrowRight className="w-4 h-4" />
    //                                                 </button>
    //                                             </div>

    //                                         </div>
    //                                     </motion.div>
    //                                 );
    //                             })}
    //                         </div>
    //                     ) : (
    //                         <div
    //                             className="text-center py-16 rounded-2xl border"
    //                             style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(0,152,204,0.2)" }}
    //                         >
    //                             <div
    //                                 className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
    //                                 style={{ backgroundColor: "rgba(0,152,204,0.1)" }}
    //                             >
    //                                 <Search className="w-8 h-8" style={{ color: "#0098cc" }} />
    //                             </div>
    //                             <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
    //                             <p className="text-gray-400 mb-4">
    //                                 {searchQuery ? 'Try adjusting your search query' : 'No mentors available at the moment'}
    //                             </p>
    //                             {searchQuery && (
    //                                 <button
    //                                     onClick={() => setSearchQuery('')}
    //                                     className="px-6 py-2 text-white rounded-lg transition-colors hover:scale-105"
    //                                     style={{ backgroundColor: "#0098cc" }}
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


