import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, GraduationCap, Clock, MapPin, TrendingUp, Loader2 } from 'lucide-react';
import { useGetMentorsQuery } from "./EngineeringMentoraslice";
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../home/mentorsection/profileSection';
import BookingModal from '../home/mentorsection/Modalbooking';

const EngineeringMentors = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedMentorId] = useState(null);
    const [selectedMentor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate();

    const getFilters = () => {
        const filters = {
            category: selectedCategory,
            experience: selectedExperience,
            availability: selectedAvailability,
            search: searchQuery,
            languages: selectedLanguages,
        };

        if (priceRange !== 'All') {
            if (priceRange === '₹0-500') {
                filters.minPrice = 0;
                filters.maxPrice = 500;
            } else if (priceRange === '₹500-1000') {
                filters.minPrice = 500;
                filters.maxPrice = 1000;
            } else if (priceRange === '₹1000-2000') {
                filters.minPrice = 1000;
                filters.maxPrice = 2000;
            } else if (priceRange === '₹2000+') {
                filters.minPrice = 2000;
            }
        }

        return filters;
    };

    const { data: mentorsData, isLoading, isError, error, refetch } = useGetMentorsQuery(getFilters());

    const mentors = mentorsData?.mentors || [];

    // 🔥 CHECK IF USER IS LOGGED IN
    const isLoggedIn = !!localStorage.getItem("authToken");

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

    // Helper function to map API mentor to UI format
    const mapMentorData = (mentor) => {
        // Extract expertise from currentSkills
        const expertise = mentor.currentSkills
            ? mentor.currentSkills.split(',').map(skill => skill.trim())
            : [];

        // Calculate a placeholder rating (you can add real ratings to your API later)
        const rating = 4.5 + Math.random() * 0.5;
        const reviews = Math.floor(10 + Math.random() * 90);
        const sessionsCompleted = Math.floor(20 + Math.random() * 80);

        return {
            _id: mentor._id,
            name: mentor.fullName,
            title: mentor.currentRole || 'Engineering Mentor',
            company: mentor.companyName || 'Independent',
            location: mentor.location || 'India',
            experience: `${mentor.yearsOfExperience} years experience`,
            expertise: expertise.slice(0, 5),
            rating: rating.toFixed(1),
            reviews: reviews,
            sessionsCompleted: sessionsCompleted,
            hourlyRate: '1500',
            availability: mentor.status === 'approved' ? 'Available' : 'Busy',
            responseTime: 'Within 2 hours',
            image: mentor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.fullName)}&background=0098cc&color=fff&size=200`,
            mentoringStyle: mentor.mentoringStyle,
            mentoringFrequency: mentor.mentoringFrequency,
            category: mentor.mentorCategory,
            email: mentor.email,
            linkedin: mentor.linkedinUrl
        };
    };

    const categories = [
        'All',
        'Software Engineering',
        'Data Science',
        'Cloud & DevOps',
        'Machine Learning',
        'Cybersecurity',
        'Mobile Development'
    ];

    const experienceLevels = ['All', '0-5 years', '5-10 years', '10-15 years', '15+ years'];
    const priceRanges = ['All', '₹0-500', '₹500-1000', '₹1000-2000', '₹2000+'];
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
        <>
            <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Find Your Perfect Engineering Mentor
                        </h1>
                        <p className="text-gray-400">Connect with industry experts and accelerate your career growth</p>
                    </div>

                    {/* Main Layout - Sidebar + Content */}
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
                                            placeholder="Name, skill, expertise..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-[#062117] border border-[#0098cc]/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                        Category
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
                                <div className="mb-6 text-gray-400">
                                    Showing <span className="text-[#0098cc] font-semibold">{mentors.length}</span> mentors
                                </div>
                            )}

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
                                        <Search className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Error loading mentors</h3>
                                    <p className="text-gray-400 mb-4">{error?.data?.message || 'Something went wrong'}</p>
                                    <button
                                        onClick={() => refetch()}
                                        className="px-6 py-2 bg-[#0098cc] text-white rounded-lg hover:bg-[#00b4e6] transition-colors"
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
                                                {/* Card Header with Image */}
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

                                                    <div className="flex items-center gap-2 mb-3">
                                                        <GraduationCap className="w-4 h-4 text-[#0098cc]" />
                                                        <span className="text-gray-300 text-sm">{mentor.experience}</span>
                                                    </div>

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
                                                                +{mentor.expertise.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>

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

                                                    {/* Updated Buttons Section */}
                                                    <div className="space-y-2 pt-3 border-t border-[#0098cc]/20">
                                                        <button
                                                            onClick={() => handleViewProfile(apiMentor)}
                                                            className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
                                                        >
                                                            View Profile
                                                        </button>
                                                        <button
                                                            onClick={() => handleBookSession(apiMentor)}
                                                            className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
                                                        >
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

export default EngineeringMentors;