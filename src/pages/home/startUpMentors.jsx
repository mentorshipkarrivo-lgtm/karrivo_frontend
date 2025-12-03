import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, Rocket, Clock, MapPin, TrendingUp, Target, Users } from 'lucide-react';

const StartupMentorDiscovery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

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

    const mentors = [
        {
            id: 1,
            name: 'Arjun Malhotra',
            title: 'Serial Entrepreneur & Angel Investor',
            company: 'Founded 3 unicorns',
            category: 'Fundraising & VC',
            experience: '10+ startups',
            rating: 4.9,
            reviews: 187,
            sessionsCompleted: 320,
            expertise: ['Series A-C Fundraising', 'Pitch Deck', 'VC Relations'],
            availability: 'Available',
            hourlyRate: 4500,
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            nextAvailable: 'Today',
            responseTime: '< 2 hours',
            location: 'Bangalore, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$120M+',
            startupExits: 2
        },
        {
            id: 2,
            name: 'Priya Deshmukh',
            title: 'Growth Marketing Expert',
            company: 'Ex-Head of Growth, Razorpay',
            category: 'Marketing & Growth',
            experience: '5-10 startups',
            rating: 4.8,
            reviews: 156,
            sessionsCompleted: 280,
            expertise: ['Growth Hacking', 'User Acquisition', 'PLG Strategy'],
            availability: 'Available',
            hourlyRate: 3200,
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            nextAvailable: 'Tomorrow',
            responseTime: '< 1 hour',
            location: 'Mumbai, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$45M+',
            startupExits: 1
        },
        {
            id: 3,
            name: 'Vikram Kapoor',
            title: 'Product Strategy Leader',
            company: 'Ex-CPO, Flipkart',
            category: 'Product & Strategy',
            experience: '5-10 startups',
            rating: 5.0,
            reviews: 203,
            sessionsCompleted: 410,
            expertise: ['Product-Market Fit', '0-1 Products', 'Strategy'],
            availability: 'Busy',
            hourlyRate: 3800,
            image: 'https://randomuser.me/api/portraits/men/52.jpg',
            nextAvailable: '4 days',
            responseTime: '< 3 hours',
            location: 'Bangalore, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$80M+',
            startupExits: 3
        },
        {
            id: 4,
            name: 'Sneha Reddy',
            title: 'Tech Startup Advisor',
            company: 'Founded 2 successful SaaS companies',
            category: 'Technology & Engineering',
            experience: '3-5 startups',
            rating: 4.7,
            reviews: 124,
            sessionsCompleted: 195,
            expertise: ['Tech Architecture', 'Team Building', 'MVP Development'],
            availability: 'Available',
            hourlyRate: 2800,
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            nextAvailable: 'Today',
            responseTime: '< 2 hours',
            location: 'Hyderabad, India',
            languages: ['English', 'Telugu'],
            fundsRaised: '$25M+',
            startupExits: 2
        },
        {
            id: 5,
            name: 'Rohit Sharma',
            title: 'Sales & Business Development',
            company: 'Ex-VP Sales, Zomato',
            category: 'Sales & BD',
            experience: '5-10 startups',
            rating: 4.9,
            reviews: 178,
            sessionsCompleted: 340,
            expertise: ['Enterprise Sales', 'Partnership Strategy', 'Revenue Growth'],
            availability: 'Available',
            hourlyRate: 3500,
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            nextAvailable: 'Today',
            responseTime: '< 1 hour',
            location: 'Delhi, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$60M+',
            startupExits: 1
        },
        {
            id: 6,
            name: 'Kavya Iyer',
            title: 'Operations & Scaling Expert',
            company: 'Ex-COO, Swiggy',
            category: 'Operations & Scaling',
            experience: '5-10 startups',
            rating: 4.8,
            reviews: 145,
            sessionsCompleted: 265,
            expertise: ['Operations Excellence', 'Scaling Teams', 'Process Design'],
            availability: 'Available',
            hourlyRate: 3000,
            image: 'https://randomuser.me/api/portraits/women/72.jpg',
            nextAvailable: '2 days',
            responseTime: '< 2 hours',
            location: 'Chennai, India',
            languages: ['English', 'Tamil'],
            fundsRaised: '$50M+',
            startupExits: 2
        },
        {
            id: 7,
            name: 'Amit Verma',
            title: 'Early-Stage Startup Advisor',
            company: 'Angel Investor & Mentor',
            category: 'Product & Strategy',
            experience: '10+ startups',
            rating: 4.6,
            reviews: 132,
            sessionsCompleted: 220,
            expertise: ['Business Model', 'Go-to-Market', 'Early Hiring'],
            availability: 'Available',
            hourlyRate: 2500,
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
            nextAvailable: 'Today',
            responseTime: '< 1 hour',
            location: 'Pune, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$35M+',
            startupExits: 4
        },
        {
            id: 8,
            name: 'Meera Nair',
            title: 'Fundraising & Investor Relations',
            company: 'Ex-Partner, Sequoia Capital',
            category: 'Fundraising & VC',
            experience: '10+ startups',
            rating: 4.9,
            reviews: 198,
            sessionsCompleted: 380,
            expertise: ['Investor Pitching', 'Term Sheets', 'Due Diligence'],
            availability: 'Busy',
            hourlyRate: 5000,
            image: 'https://randomuser.me/api/portraits/women/28.jpg',
            nextAvailable: '5 days',
            responseTime: '< 3 hours',
            location: 'Bangalore, India',
            languages: ['English', 'Hindi'],
            fundsRaised: '$200M+',
            startupExits: 5
        }
    ];

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

    const filteredMentors = mentors.filter(mentor => {
        const matchesCategory = selectedCategory === 'All' || mentor.category === selectedCategory;
        const matchesExperience = selectedExperience === 'All' || mentor.experience === selectedExperience;
        const matchesAvailability = selectedAvailability === 'All' || mentor.availability === selectedAvailability;
        const matchesLanguages = selectedLanguages.length === 0 ||
            selectedLanguages.some(lang => mentor.languages.includes(lang));
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesPrice = true;
        if (priceRange !== 'All') {
            const rate = mentor.hourlyRate;
            if (priceRange === '₹0-1000') matchesPrice = rate <= 1000;
            else if (priceRange === '₹1000-2500') matchesPrice = rate > 1000 && rate <= 2500;
            else if (priceRange === '₹2500-5000') matchesPrice = rate > 2500 && rate <= 5000;
            else if (priceRange === '₹5000+') matchesPrice = rate > 5000;
        }

        return matchesCategory && matchesExperience && matchesSearch && matchesPrice && matchesAvailability && matchesLanguages;
    });

    return (
        <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Rocket className="w-10 h-10 text-[#0098cc]" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Find Your Startup Mentor
                        </h1>
                    </div>
                    <p className="text-gray-400">Connect with experienced founders who've built, scaled, and exited successful startups</p>
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
                                    Expertise Area
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
                                    Startup Experience
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
                        <div className="mb-6 text-gray-400">
                            Showing <span className="text-[#0098cc] font-semibold">{filteredMentors.length}</span> mentors
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
                                            <Rocket className="w-3 h-3" />
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
                                                <Users className="w-4 h-4 text-[#0098cc]" />
                                                {mentor.sessionsCompleted} sessions
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                <div className="text-[#0098cc] text-xs font-semibold mb-1">Funds Raised</div>
                                                <div className="text-white text-sm font-bold">{mentor.fundsRaised}</div>
                                            </div>
                                            <div className="bg-[#062117] rounded-lg px-3 py-2 border border-[#0098cc]/20">
                                                <div className="text-[#0098cc] text-xs font-semibold mb-1">Exits</div>
                                                <div className="text-white text-sm font-bold">{mentor.startupExits} successful</div>
                                            </div>
                                        </div>

                                        {/* Expertise Tags */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupMentorDiscovery;