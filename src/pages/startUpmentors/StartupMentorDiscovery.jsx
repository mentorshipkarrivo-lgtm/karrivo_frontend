import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, Rocket, Clock, MapPin, TrendingUp, Target, Users, Loader2, DollarSign, Award } from 'lucide-react';
import { useGetStartupMentorsQuery } from './startUpmentors';

const StartupMentorDiscovery = () => {
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
            if (priceRange === '₹0-1000') {
                filters.minPrice = 0;
                filters.maxPrice = 1000;
            } else if (priceRange === '₹1000-2500') {
                filters.minPrice = 1000;
                filters.maxPrice = 2500;
            } else if (priceRange === '₹2500-5000') {
                filters.minPrice = 2500;
                filters.maxPrice = 5000;
            } else if (priceRange === '₹5000+') {
                filters.minPrice = 5000;
            }
        }

        return filters;
    };

    const { data: mentorsData, isLoading, isError, error, refetch } = useGetStartupMentorsQuery(getFilters());

    const mentors = mentorsData?.mentors || [];

    const mapMentorData = (mentor) => {
        const expertise = mentor.currentSkills
            ? mentor.currentSkills.split(',').map(skill => skill.trim())
            : [];

        const rating = 4.5 + Math.random() * 0.5;
        const reviews = Math.floor(100 + Math.random() * 150);
        const sessionsCompleted = Math.floor(150 + Math.random() * 300);

        return {
            _id: mentor._id,
            name: mentor.fullName,
            title: mentor.currentRole || 'Startup Mentor',
            company: mentor.startupsFounded || mentor.companyName || 'Independent Advisor',
            category: mentor.mentorCategory,
            experience: mentor.startupExperience || `${mentor.yearsOfExperience} startups`,
            rating: rating.toFixed(1),
            reviews: reviews,
            sessionsCompleted: sessionsCompleted,
            expertise: expertise.slice(0, 5),
            availability: mentor.status === 'approved' ? 'Available' : 'Busy',
            hourlyRate: mentor.hourlyRate || 3500,
            image: mentor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.fullName)}&background=0098cc&color=fff&size=200`,
            nextAvailable: mentor.nextAvailable || 'Today',
            responseTime: mentor.responseTime || '< 2 hours',
            location: mentor.location || 'India',
            languages: mentor.languages || ['English'],
            fundsRaised: mentor.fundsRaised || '$0M+',
            startupExits: mentor.startupExits || 0,
            email: mentor.email,
            linkedin: mentor.linkedinUrl
        };
    };

    const categories = [
        'All',
        'Product & Strategy',
        'Fundraising & VC',
        'Marketing & Growth',
        'Technology & Engineering',
        'Sales & BD',
        'Operations & Scaling'
    ];

    const experienceLevels = ['All', '1-3 startups', '3-5 startups', '5-10 startups', '10+ startups'];
    const priceRanges = ['All', '₹0-1000', '₹1000-2500', '₹2500-5000', '₹5000+'];
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
        <div className="min-h-screen bg-gradient-to-br from-[#041810] via-[#062117] to-[#041810] py-8 px-4 pt-28">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-10 text-center">

                </div>

                {/* Main Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Enhanced Filters */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-[#0a2d20]/80 backdrop-blur-sm border border-[#0098cc]/30 rounded-2xl p-6 sticky top-6 shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-[#0098cc]" />
                                    Filters
                                </h2>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[#0098cc] text-sm hover:text-[#00b4e6] transition-colors font-semibold"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm font-semibold mb-2 block">
                                    Search
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Name, expertise, skill..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-[#062117] border border-[#0098cc]/40 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                                    Expertise Area
                                </label>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white shadow-lg scale-[1.02]'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/80 hover:text-white hover:border-[#0098cc]/30 border border-transparent'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                                    Startup Experience
                                </label>
                                <div className="space-y-2">
                                    {experienceLevels.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedExperience(level)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${selectedExperience === level
                                                ? 'bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white shadow-lg scale-[1.02]'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/80 hover:text-white hover:border-[#0098cc]/30 border border-transparent'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                                    Price Range (per hour)
                                </label>
                                <div className="space-y-2">
                                    {priceRanges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setPriceRange(range)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${priceRange === range
                                                ? 'bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white shadow-lg scale-[1.02]'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/80 hover:text-white hover:border-[#0098cc]/30 border border-transparent'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                                    Availability
                                </label>
                                <div className="space-y-2">
                                    {availabilityOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSelectedAvailability(option)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${selectedAvailability === option
                                                ? 'bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white shadow-lg scale-[1.02]'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/80 hover:text-white hover:border-[#0098cc]/30 border border-transparent'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="text-gray-300 text-sm font-semibold mb-3 block">
                                    Languages
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => toggleLanguage(lang)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedLanguages.includes(lang)
                                                ? 'bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white shadow-md scale-105'
                                                : 'bg-[#062117] text-gray-400 hover:bg-[#062117]/80 hover:text-white border border-[#0098cc]/20'
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
                                    Page {mentorsData?.page || 1} of {Math.ceil((mentorsData?.total || 0) / (mentorsData?.limit || 20))}
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">Loading startup mentors...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="text-center py-16 bg-[#0a2d20]/80 backdrop-blur-sm border border-red-500/30 rounded-2xl">
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
                                            className="group bg-[#0a2d20]/90 backdrop-blur-sm border border-[#0098cc]/30 rounded-2xl overflow-hidden hover:border-[#0098cc]/70 hover:shadow-2xl hover:shadow-[#0098cc]/20 transition-all duration-300 hover:-translate-y-2"
                                        >
                                            {/* Card Header */}
                                            <div className="relative h-48 bg-gradient-to-br from-[#0098cc]/30 via-[#00b4e6]/20 to-[#062117] overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDE1MiwgMjA0LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${mentor.availability === 'Available'
                                                        ? 'bg-green-500/30 text-green-300 border border-green-400/50 shadow-lg shadow-green-500/20'
                                                        : 'bg-orange-500/30 text-orange-300 border border-orange-400/50 shadow-lg shadow-orange-500/20'
                                                        }`}>
                                                        ● {mentor.availability}
                                                    </span>
                                                </div>

                                                <div className="absolute -bottom-12 left-6">
                                                    <div className="relative">
                                                        <img
                                                            src={mentor.image}
                                                            alt={mentor.name}
                                                            className="w-24 h-24 rounded-2xl border-4 border-[#0a2d20] object-cover shadow-2xl ring-2 ring-[#0098cc]/30"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#0098cc] to-[#00b4e6] rounded-full p-1.5 shadow-lg">
                                                            <Rocket className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="pt-16 px-6 pb-6">
                                                <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
                                                <p className="text-[#0098cc] text-sm font-semibold mb-1">{mentor.title}</p>
                                                <p className="text-gray-400 text-xs mb-4 flex items-center gap-1.5">
                                                    <Award className="w-3.5 h-3.5 text-[#0098cc]" />
                                                    {mentor.company}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#0098cc]/20">
                                                    <div className="flex items-center gap-1.5">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-white font-bold text-sm">{mentor.rating}</span>
                                                        <span className="text-gray-400 text-xs">({mentor.reviews})</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                                        <Users className="w-4 h-4 text-[#0098cc]" />
                                                        {mentor.sessionsCompleted} sessions
                                                    </div>
                                                </div>

                                                {/* Achievements */}
                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    <div className="bg-gradient-to-br from-[#062117] to-[#041810] rounded-xl px-3 py-3 border border-[#0098cc]/30 hover:border-[#0098cc]/50 transition-all">
                                                        <div className="flex items-center gap-1.5 text-[#0098cc] text-xs font-semibold mb-1">
                                                            <DollarSign className="w-3.5 h-3.5" />
                                                            Funds Raised
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.fundsRaised}</div>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-[#062117] to-[#041810] rounded-xl px-3 py-3 border border-[#0098cc]/30 hover:border-[#0098cc]/50 transition-all">
                                                        <div className="flex items-center gap-1.5 text-[#0098cc] text-xs font-semibold mb-1">
                                                            <Target className="w-3.5 h-3.5" />
                                                            Exits
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.startupExits} successful</div>
                                                    </div>
                                                </div>

                                                {/* Expertise Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {mentor.expertise.slice(0, 3).map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1.5 bg-[#0098cc]/15 text-[#0098cc] text-xs font-medium rounded-lg border border-[#0098cc]/30 hover:bg-[#0098cc]/25 transition-all"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {mentor.expertise.length > 3 && (
                                                        <span className="px-3 py-1.5 bg-[#0098cc]/15 text-[#0098cc] text-xs font-medium rounded-lg border border-[#0098cc]/30">
                                                            +{mentor.expertise.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Location & Response Time */}
                                                <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-[#0098cc]" />
                                                        {mentor.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-[#0098cc]" />
                                                        {mentor.responseTime}
                                                    </div>
                                                </div>

                                                {/* Price & CTA */}
                                                <div className="flex items-center justify-between pt-4 border-t border-[#0098cc]/20">
                                                    <div>
                                                        <div className="text-2xl font-bold text-white">₹{mentor.hourlyRate}</div>
                                                        <div className="text-gray-400 text-xs">per hour</div>
                                                    </div>
                                                    <button className="px-6 py-3 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#0098cc]/40 transition-all duration-300 transform hover:scale-105 text-sm">
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
                            <div className="text-center py-20 bg-[#0a2d20]/80 backdrop-blur-sm border border-[#0098cc]/30 rounded-2xl">
                                <div className="w-20 h-20 bg-[#0098cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-10 h-10 text-[#0098cc]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No mentors found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-8 py-3 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0098cc]/30 transition-all"
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
export default StartupMentorDiscovery;

