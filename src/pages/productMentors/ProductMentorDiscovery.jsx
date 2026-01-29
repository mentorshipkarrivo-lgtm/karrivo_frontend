import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Briefcase, Package, Clock, MapPin, TrendingUp, Users, Lightbulb, Loader2 } from 'lucide-react';
import { useGetProductMentorsQuery } from "./ProductMentorsapislice"

const ProductMentorDiscovery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    // Build filters object for API query
    const apiFilters = useMemo(() => {
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

        if (selectedLanguages.length > 0) {
            filters.languages = selectedLanguages;
        }

        if (searchQuery.trim()) {
            filters.search = searchQuery.trim();
        }

        // Handle price range
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
    }, [selectedCategory, selectedExperience, selectedAvailability, selectedLanguages, searchQuery, priceRange]);

    // Fetch mentors from API
    const { data, isLoading, isError, error } = useGetProductMentorsQuery(apiFilters);

    const categories = [
        'All',
        'Engineering Mentors',
        'Product Strategy',
        'Product Design & UX',
        'Product Analytics',
        'Product Leadership',
        'Growth Product',
        'B2B Product',
        'B2C Product'
    ];

    const experienceLevels = ['All', '0-3 years', '3-7 years', '7-12 years', '12+ years'];
    const priceRanges = ['All', '₹0-800', '₹800-1500', '₹1500-3000', '₹3000+'];
    const availabilityOptions = ['All', 'Available', 'Busy'];
    const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Gujarati'];

    // Transform API data to match UI format
    const transformMentorData = (apiMentor) => {
        return {
            id: apiMentor._id,
            name: apiMentor.fullName,
            title: apiMentor.currentRole || 'Mentor',
            company: apiMentor.companyName || 'N/A',
            category: apiMentor.mentorCategory,
            experience: apiMentor.yearsOfExperience ? `${apiMentor.yearsOfExperience} years` : 'Not specified',
            rating: 4.5, // Default rating since not in API
            reviews: 0, // Default reviews since not in API
            sessionsCompleted: 0, // Default sessions since not in API
            expertise: apiMentor.currentSkills ? apiMentor.currentSkills.split(',').map(s => s.trim()).slice(0, 3) : [],
            availability: apiMentor.status === 'approved' ? 'Available' : 'Busy',
            hourlyRate: apiMentor.hourlyRate,
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(apiMentor.fullName)}&background=0098cc&color=fff&size=200`,
            nextAvailable: apiMentor.status === 'approved' ? 'Today' : 'Not available',
            responseTime: '< 2 hours',
            location: apiMentor.location || 'India',
            languages: apiMentor.languages || ['English'],
            productsLaunched: 0, // Default since not in API
            usersImpacted: 'N/A', // Default since not in API
            linkedinUrl: apiMentor.linkedinUrl,
            motivationStatement: apiMentor.motivationStatement
        };
    };

    // Get mentors from API data
    const mentors = data?.mentors?.map(transformMentorData) || [];
    const filteredMentors = mentors;

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
                        <Package className="w-10 h-10 text-[#0098cc]" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Find Your Product Mentor
                        </h1>
                    </div>
                    <p className="text-gray-400">Connect with experienced product leaders who've built products users love</p>
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
                                    Product Area
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
                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-12 h-12 text-[#0098cc] animate-spin mx-auto mb-4" />
                                    <p className="text-gray-400">Loading mentors...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="text-center py-16 bg-[#0a2d20] border border-red-500/20 rounded-2xl">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="w-8 h-8 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Failed to load mentors</h3>
                                <p className="text-gray-400 mb-4">{error?.data?.message || 'Something went wrong. Please try again.'}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-[#0098cc] text-white rounded-lg hover:bg-[#00b4e6] transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Success State - Results */}
                        {!isLoading && !isError && (
                            <>
                                {/* Results Count */}
                                <div className="mb-6 text-gray-400">
                                    Showing <span className="text-[#0098cc] font-semibold">{filteredMentors.length}</span> of <span className="text-white font-semibold">{data?.total || 0}</span> mentors
                                </div>

                                {/* Mentor Cards Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {filteredMentors.map((mentor) => (
                                        <div
                                            key={mentor.id}
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

                                                {/* Product Impact */}
                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                        <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                            <Lightbulb className="w-3 h-3" />
                                                            Experience
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.experience}</div>
                                                    </div>
                                                    <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                        <div className="text-[#0098cc] text-xs font-semibold mb-1 flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            Impact
                                                        </div>
                                                        <div className="text-white text-sm font-bold">{mentor.usersImpacted}</div>
                                                    </div>
                                                </div>

                                                {/* Expertise Tags */}
                                                {mentor.expertise.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                                        {mentor.expertise.map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] text-xs rounded-md border border-[#0098cc]/20"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
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
                                    ))}
                                </div>

                                {/* No Results */}
                                {filteredMentors.length === 0 && (
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductMentorDiscovery;





