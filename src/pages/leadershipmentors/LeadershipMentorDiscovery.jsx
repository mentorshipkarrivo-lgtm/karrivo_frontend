import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, Award, Clock, MapPin, TrendingUp, Target, Users, Loader2 } from 'lucide-react';
import { useGetLeadershipMentorsQuery } from './leaderShipmentor';

const LeadershipMentorDiscovery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const getFilters = () => {
        const filters = {};

        if (selectedCategory !== 'All') {
            filters.category = selectedCategory;
        }

        if (selectedExperience !== 'All') {
            filters.experience = selectedExperience;
        }

        if (selectedAvailability !== 'All') {
            filters.availability = selectedAvailability;
        }

        if (searchQuery && searchQuery.trim() !== '') {
            filters.search = searchQuery.trim();
        }

        if (selectedLanguages.length > 0) {
            filters.languages = selectedLanguages;
        }

        if (priceRange !== 'All') {
            if (priceRange === '₹0-800') {
                filters.minPrice = 0;
                filters.maxPrice = 800;
            } else if (priceRange === '₹800-1500') {
                filters.minPrice = 800;
                filters.maxPrice = 1500;
            } else if (priceRange === '₹1500-3000') {
                filters.minPrice = 1500;
                filters.maxPrice = 3000;
            } else if (priceRange === '₹3000+') {
                filters.minPrice = 3000;
            }
        }

        return filters;
    };

    const { data: mentorsData, isLoading, isError, error, refetch } = useGetLeadershipMentorsQuery(getFilters());

    const mentors = mentorsData?.mentors || [];

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
            title: mentor.currentRole || 'Leadership Mentor',
            company: mentor.companyName || 'Independent Consultant',
            category: mentor.mentorCategory,
            experience: `${mentor.yearsOfExperience} years`,
            rating: rating.toFixed(1),
            reviews: reviews,
            sessionsCompleted: sessionsCompleted,
            expertise: expertise.slice(0, 3),
            availability: mentor.status === 'approved' ? 'Available' : 'Busy',
            hourlyRate: mentor.hourlyRate || 2500,
            image: mentor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.fullName)}&background=0098cc&color=fff&size=200`,
            nextAvailable: mentor.nextAvailable || 'Today',
            responseTime: mentor.responseTime || '< 2 hours',
            location: mentor.location || 'India',
            languages: mentor.languages || ['English'],
            teamsLed: Math.floor(50 + Math.random() * 750),
            companiesScaled: ['Unicorn', 'Series C', '2 IPOs', 'Fortune 500', 'Global Scale'][Math.floor(Math.random() * 5)],
            email: mentor.email,
            linkedin: mentor.linkedinUrl
        };
    };

    const categories = [
        'All',
        'Executive Leadership',
        'Team Management',
        'Strategic Leadership',
        'Change Management',
        'Organizational Development',
        'Startup Leadership',
        'Diversity & Inclusion'
    ];

    const experienceLevels = ['All', '0-3 years', '3-7 years', '7-12 years', '12+ years'];
    const priceRanges = ['All', '₹0-800', '₹800-1500', '₹1500-3000', '₹3000+'];
    const availabilityOptions = ['All', 'Available', 'Busy'];
    const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Gujarati'];

    const toggleLanguage = (lang) => {
        if (selectedLanguages.includes(lang)) {
            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
        } else {
            setSelectedLanguages([...selectedLanguages, lang]);
        }
    };

    const clearAllFilters = () => {
        setSelectedCategory('All');
        setSelectedExperience('All');
        setPriceRange('All');
        setSelectedAvailability('All');
        setSelectedLanguages([]);
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Target className="w-10 h-10 text-[#0098cc]" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Find Your Leadership Mentor
                        </h1>
                    </div>
                    <p className="text-gray-400">Connect with experienced leaders who've scaled teams and transformed organizations</p>
                </div>

                {/* Main Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Filters */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-[#0098cc]" />
                                    Filters
                                </h2>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[#0098cc] text-sm hover:text-[#00b4e6] transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-gray-400 text-sm font-semibold mb-2 block">
                                    Search
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Name, expertise, skill..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-[#062117] border border-[#0098cc]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                    Leadership Area
                                </label>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedCategory === category
                                                ? 'bg-[#0098cc] text-white shadow-lg'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/50 hover:text-white'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="mb-6">
                                <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                    Experience Level
                                </label>
                                <div className="space-y-2">
                                    {experienceLevels.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedExperience(level)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedExperience === level
                                                ? 'bg-[#0098cc] text-white shadow-lg'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/50 hover:text-white'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                    Price Range (per hour)
                                </label>
                                <div className="space-y-2">
                                    {priceRanges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setPriceRange(range)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${priceRange === range
                                                ? 'bg-[#0098cc] text-white shadow-lg'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/50 hover:text-white'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mb-6">
                                <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                    Availability
                                </label>
                                <div className="space-y-2">
                                    {availabilityOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSelectedAvailability(option)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedAvailability === option
                                                ? 'bg-[#0098cc] text-white shadow-lg'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/50 hover:text-white'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                    Languages
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => toggleLanguage(lang)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLanguages.includes(lang)
                                                ? 'bg-[#0098cc] text-white'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/50'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Mentor Cards */}
                    <div className="flex-1">
                        {/* Results Count */}
                        {!isLoading && !isError && (
                            <div className="mb-6 flex items-center justify-between">
                                <div className="text-gray-400">
                                    Showing <span className="text-[#0098cc] font-bold text-lg">{mentors.length}</span> mentors
                                </div>
                                <div className="text-sm text-gray-500">
                                    Page {mentorsData?.page || 1} of {mentorsData?.totalPages || 1}
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">Loading leadership mentors...</p>
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
                        {!isLoading && !isError && mentors.length > 0 && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {mentors.map((apiMentor) => {
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

                                                {/* Leadership Impact */}
                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                        <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            Teams Led
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.teamsLed}+ people</div>
                                                    </div>
                                                    <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                        <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                            <Award className="w-3 h-3" />
                                                            Scale
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.companiesScaled}</div>
                                                    </div>
                                                </div>

                                                {/* Expertise Tags */}
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
                        {!isLoading && !isError && mentors.length === 0 && (
                            <div className="text-center py-16 bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl">
                                <div className="w-16 h-16 bg-[#0098cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-[#0098cc]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
                                <p className="text-gray-400 mb-4">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-2 bg-[#0098cc] text-white rounded-lg hover:bg-[#00b4e6] transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadershipMentorDiscovery;