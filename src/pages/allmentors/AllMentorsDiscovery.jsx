import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, Target, Clock, MapPin, TrendingUp, Users, GraduationCap, Loader2 } from 'lucide-react';
import { useGetAllMentorsQuery } from './allmentors';


const AllMentorsDiscovery = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all mentors without any filters
    const { data: mentorsData, isLoading, isError, error, refetch } = useGetAllMentorsQuery();

    const mentors = mentorsData?.mentors || [];

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

    const mapMentorData = (mentor) => {
        const expertise = mentor.currentSkills
            ? mentor.currentSkills.split(',').map(skill => skill.trim())
            : [];

        const rating = 4.5 + Math.random() * 0.5;
        const reviews = Math.floor(100 + Math.random() * 200);
        const sessionsCompleted = Math.floor(150 + Math.random() * 350);

        return {
            _id: mentor._id,
            name: mentor.fullName,
            title: mentor.currentRole || 'Mentor',
            company: mentor.companyName || 'Independent Consultant',
            category: mentor.mentorCategory,
            experience: `${mentor.yearsOfExperience} years`,
            rating: rating.toFixed(1),
            reviews: reviews,
            sessionsCompleted: sessionsCompleted,
            expertise: expertise.slice(0, 3),
            availability: mentor.status === 'approved' ? 'Available' : 'Busy',
            hourlyRate: mentor.hourlyRate || 2000,
            image: mentor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.fullName)}&background=0098cc&color=fff&size=200`,
            nextAvailable: mentor.nextAvailable || 'Today',
            responseTime: mentor.responseTime || '< 2 hours',
            location: mentor.location || 'India',
            languages: mentor.languages || ['English'],
            campaignsLaunched: Math.floor(50 + Math.random() * 250),
            reachImpact: `${Math.floor(10 + Math.random() * 490)}M+`,
            email: mentor.email,
            linkedin: mentor.linkedinUrl
        };
    };

    return (
        <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="w-10 h-10 text-[#0098cc]" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            All Available Mentors
                        </h1>
                    </div>
                    <p className="text-gray-400">Connect with experienced mentors across all domains and expertise</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, role, company, category, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-[#0a2d20] border border-[#0098cc]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
                        />
                    </div>
                </div>

                {/* Results Count */}
                {!isLoading && !isError && (
                    <div className="mb-6 flex items-center justify-between">
                        <div className="text-gray-400">
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
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">Loading mentors...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {isError && (
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
                )}

                {/* Mentor Cards Grid */}
                {!isLoading && !isError && filteredMentors.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredMentors.map((apiMentor) => {
                            const mentor = mapMentorData(apiMentor);
                            return (
                                <div
                                    key={mentor._id}
                                    className="group bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl overflow-hidden hover:border-[#0098cc]/60 hover:shadow-2xl hover:shadow-[#0098cc]/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Card Header */}
                                    <div className="relative h-40 bg-gradient-to-br from-[#0098cc]/20 to-[#062117]">
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${mentor.availability === 'Available'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                                }`}>
                                                {mentor.availability}
                                            </span>
                                        </div>
                                        {mentor.category && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0098cc]/20 text-[#0098cc] border border-[#0098cc]/30">
                                                    {mentor.category}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute -bottom-10 left-6">
                                            <img
                                                src={mentor.image}
                                                alt={mentor.name}
                                                className="w-20 h-20 rounded-xl border-4 border-[#0a2d20] object-cover shadow-xl"
                                            />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="pt-14 px-6 pb-6">
                                        <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                                        <p className="text-[#0098cc] text-sm font-semibold mb-1">{mentor.title}</p>
                                        <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" />
                                            {mentor.company}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-[#0098cc]/20">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-white font-bold text-sm">{mentor.rating}</span>
                                                <span className="text-gray-400 text-xs">({mentor.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                <TrendingUp className="w-4 h-4 text-[#0098cc]" />
                                                {mentor.sessionsCompleted} sessions
                                            </div>
                                        </div>

                                        {/* Impact Stats */}
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                    <Target className="w-3 h-3" />
                                                    Projects
                                                </div>
                                                <div className="text-white text-sm font-bold">{mentor.campaignsLaunched}+</div>
                                            </div>
                                            <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    Experience
                                                </div>
                                                <div className="text-white text-sm font-bold">{mentor.experience}</div>
                                            </div>
                                        </div>

                                        {/* Expertise Tags */}
                                        {mentor.expertise.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {mentor.expertise.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] text-xs rounded-md border border-[#0098cc]/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {mentor.expertise.length > 3 && (
                                                    <span className="px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] text-xs rounded-md border border-[#0098cc]/20">
                                                        +{mentor.expertise.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Location & Response Time */}
                                        <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {mentor.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {mentor.responseTime}
                                            </div>
                                        </div>

                                        {/* Price & CTA */}
                                        <div className="flex items-center justify-between pt-3 border-t border-[#0098cc]/20">
                                            <div>
                                                <span className="text-xl font-bold text-white">₹{mentor.hourlyRate}</span>
                                                <span className="text-gray-400 text-xs">/hour</span>
                                            </div>
                                            <button className="px-4 py-2 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0098cc]/30 transition-all duration-300 transform hover:scale-105 text-sm">
                                                Book Session
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* No Results */}
                {!isLoading && !isError && filteredMentors.length === 0 && (
                    <div className="text-center py-16 bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl">
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
    );
};

export default AllMentorsDiscovery;