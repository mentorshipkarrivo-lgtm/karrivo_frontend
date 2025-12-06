import React, { useState } from 'react';
    import { Search, Filter, Star, Zap, Cpu, Clock, MapPin, TrendingUp, Target, Users, Brain } from 'lucide-react';

    const AIMentorDiscovery = () => {
        const [selectedCategory, setSelectedCategory] = useState('All');
        const [selectedExperience, setSelectedExperience] = useState('All');
        const [searchQuery, setSearchQuery] = useState('');
        const [priceRange, setPriceRange] = useState('All');
        const [selectedAvailability, setSelectedAvailability] = useState('All');
        const [selectedLanguages, setSelectedLanguages] = useState([]);

        const categories = [
            'All',
            'Machine Learning',
            'Deep Learning & Neural Networks',
            'NLP & LLMs',
            'Computer Vision',
            'AI Strategy & Leadership',
            'MLOps & AI Engineering',
            'Generative AI',
            'Robotics & Reinforcement Learning'
        ];

        const experienceLevels = ['All', '0-3 years', '3-7 years', '7-12 years', '12+ years'];
        const priceRanges = ['All', '₹0-800', '₹800-1500', '₹1500-3000', '₹3000+'];
        const availabilityOptions = ['All', 'Available', 'Busy'];
        const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Gujarati'];

        const mentors = [
            {
                id: 1,
                name: 'Dr. Arjun Krishnan',
                title: 'AI Research Lead',
                company: 'Google DeepMind',
                category: 'Machine Learning',
                experience: '12+ years',
                rating: 4.9,
                reviews: 312,
                sessionsCompleted: 520,
                expertise: ['Transformers', 'Model Architecture', 'Research Papers'],
                availability: 'Available',
                hourlyRate: 3500,
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                nextAvailable: 'Today',
                responseTime: '< 2 hours',
                location: 'Bangalore, India',
                languages: ['English', 'Hindi'],
                modelsBuilt: 25,
                papersPublished: '15+',
                usersImpacted: '100M+'
            },
            {
                id: 2,
                name: 'Meera Sharma',
                title: 'Senior ML Engineer',
                company: 'OpenAI',
                category: 'NLP & LLMs',
                experience: '7-12 years',
                rating: 4.9,
                reviews: 267,
                sessionsCompleted: 445,
                expertise: ['LLM Fine-tuning', 'Prompt Engineering', 'RAG Systems'],
                availability: 'Available',
                hourlyRate: 3200,
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                nextAvailable: 'Tomorrow',
                responseTime: '< 1 hour',
                location: 'Mumbai, India',
                languages: ['English', 'Hindi'],
                modelsBuilt: 18,
                papersPublished: '8+',
                usersImpacted: '50M+'
            },
            {
                id: 3,
                name: 'Vikram Patel',
                title: 'Head of Computer Vision',
                company: 'Tesla AI',
                category: 'Computer Vision',
                experience: '12+ years',
                rating: 5.0,
                reviews: 289,
                sessionsCompleted: 490,
                expertise: ['Object Detection', 'Image Segmentation', 'Video Analysis'],
                availability: 'Busy',
                hourlyRate: 3800,
                image: 'https://randomuser.me/api/portraits/men/52.jpg',
                nextAvailable: '4 days',
                responseTime: '< 3 hours',
                location: 'Bangalore, India',
                languages: ['English', 'Telugu'],
                modelsBuilt: 30,
                papersPublished: '20+',
                usersImpacted: '200M+'
            },
            {
                id: 4,
                name: 'Dr. Priya Reddy',
                title: 'VP of AI Strategy',
                company: 'Microsoft',
                category: 'AI Strategy & Leadership',
                experience: '12+ years',
                rating: 4.9,
                reviews: 334,
                sessionsCompleted: 580,
                expertise: ['AI Roadmap', 'Team Building', 'Enterprise AI'],
                availability: 'Available',
                hourlyRate: 4200,
                image: 'https://randomuser.me/api/portraits/women/65.jpg',
                nextAvailable: 'Today',
                responseTime: '< 2 hours',
                location: 'Hyderabad, India',
                languages: ['English', 'Hindi'],
                modelsBuilt: 35,
                papersPublished: '25+',
                usersImpacted: '500M+'
            },
            {
                id: 5,
                name: 'Rahul Desai',
                title: 'MLOps Lead',
                company: 'Netflix',
                category: 'MLOps & AI Engineering',
                experience: '7-12 years',
                rating: 4.8,
                reviews: 223,
                sessionsCompleted: 385,
                expertise: ['Model Deployment', 'CI/CD for ML', 'Monitoring'],
                availability: 'Available',
                hourlyRate: 2800,
                image: 'https://randomuser.me/api/portraits/men/67.jpg',
                nextAvailable: 'Today',
                responseTime: '< 1 hour',
                location: 'Bangalore, India',
                languages: ['English', 'Hindi'],
                modelsBuilt: 22,
                papersPublished: '5+',
                usersImpacted: '80M+'
            },
            {
                id: 6,
                name: 'Ananya Iyer',
                title: 'Senior AI Researcher',
                company: 'Meta AI',
                category: 'Deep Learning & Neural Networks',
                experience: '7-12 years',
                rating: 4.8,
                reviews: 245,
                sessionsCompleted: 410,
                expertise: ['Neural Architecture', 'Transfer Learning', 'Model Optimization'],
                availability: 'Available',
                hourlyRate: 3100,
                image: 'https://randomuser.me/api/portraits/women/72.jpg',
                nextAvailable: '2 days',
                responseTime: '< 2 hours',
                location: 'Pune, India',
                languages: ['English', 'Gujarati'],
                modelsBuilt: 20,
                papersPublished: '12+',
                usersImpacted: '150M+'
            },
            {
                id: 7,
                name: 'Karthik Menon',
                title: 'Generative AI Engineer',
                company: 'Anthropic',
                category: 'Generative AI',
                experience: '3-7 years',
                rating: 4.7,
                reviews: 198,
                sessionsCompleted: 325,
                expertise: ['Diffusion Models', 'GANs', 'Image Generation'],
                availability: 'Available',
                hourlyRate: 2600,
                image: 'https://randomuser.me/api/portraits/men/45.jpg',
                nextAvailable: 'Today',
                responseTime: '< 1 hour',
                location: 'Chennai, India',
                languages: ['English', 'Tamil'],
                modelsBuilt: 15,
                papersPublished: '6+',
                usersImpacted: '30M+'
            },
            {
                id: 8,
                name: 'Dr. Sneha Gupta',
                title: 'Chief AI Officer',
                company: 'NVIDIA',
                category: 'AI Strategy & Leadership',
                experience: '12+ years',
                rating: 5.0,
                reviews: 356,
                sessionsCompleted: 620,
                expertise: ['AI Vision', 'Research Strategy', 'Innovation'],
                availability: 'Busy',
                hourlyRate: 4500,
                image: 'https://randomuser.me/api/portraits/women/28.jpg',
                nextAvailable: '5 days',
                responseTime: '< 3 hours',
                location: 'Bangalore, India',
                languages: ['English', 'Hindi'],
                modelsBuilt: 40,
                papersPublished: '30+',
                usersImpacted: '1B+'
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
                if (priceRange === '₹0-800') matchesPrice = rate <= 800;
                else if (priceRange === '₹800-1500') matchesPrice = rate > 800 && rate <= 1500;
                else if (priceRange === '₹1500-3000') matchesPrice = rate > 1500 && rate <= 3000;
                else if (priceRange === '₹3000+') matchesPrice = rate > 3000;
            }

            return matchesCategory && matchesExperience && matchesSearch && matchesPrice && matchesAvailability && matchesLanguages;
        });

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-8 px-4 pt-28">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <Brain className="w-10 h-10 text-cyan-400" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                Find Your AI Mentor
                            </h1>
                        </div>
                        <p className="text-gray-400">Connect with world-class AI experts and researchers who've pushed the boundaries of machine learning</p>
                    </div>

                    {/* Main Layout */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Sidebar - Filters */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 sticky top-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-cyan-400" />
                                        Filters
                                    </h2>
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
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
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-cyan-500/30 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <label className="text-gray-400 text-sm font-semibold mb-3 block">
                                        AI Specialization
                                    </label>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedCategory === category
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                                                        : 'bg-slate-950/50 text-gray-400 hover:bg-slate-900/50 hover:text-white'
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
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                                                        : 'bg-slate-950/50 text-gray-400 hover:bg-slate-900/50 hover:text-white'
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
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                                                        : 'bg-slate-950/50 text-gray-400 hover:bg-slate-900/50 hover:text-white'
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
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                                                        : 'bg-slate-950/50 text-gray-400 hover:bg-slate-900/50 hover:text-white'
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
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                                        : 'bg-slate-950/50 text-gray-400 hover:bg-slate-900/50'
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
                                Showing <span className="text-cyan-400 font-semibold">{filteredMentors.length}</span> AI mentors
                            </div>

                            {/* Mentor Cards Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {filteredMentors.map((mentor) => (
                                    <div
                                        key={mentor.id}
                                        className="group bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Card Header */}
                                        <div className="relative h-40 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20">
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
                                                    className="w-20 h-20 rounded-xl border-4 border-slate-900 object-cover shadow-xl"
                                                />
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="pt-14 px-6 pb-6">
                                            <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                                            <p className="text-cyan-400 text-sm font-semibold mb-1">{mentor.title}</p>
                                            <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
                                                <Cpu className="w-3 h-3" />
                                                {mentor.company}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex items-center gap-4 mb-3 pb-3 border-b border-cyan-500/20">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-white font-bold text-sm">{mentor.rating}</span>
                                                    <span className="text-gray-400 text-xs">({mentor.reviews})</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                                                    {mentor.sessionsCompleted} sessions
                                                </div>
                                            </div>

                                            {/* AI Impact */}
                                            <div className="grid grid-cols-3 gap-2 mb-3">
                                                <div className="bg-slate-950/50 rounded-lg px-3 py-2 border border-cyan-500/20">
                                                    <div className="text-cyan-400 text-xs font-semibold mb-1 flex items-center gap-1">
                                                        <Zap className="w-3 h-3" />
                                                        Models
                                                    </div>
                                                    <div className="text-white text-sm font-bold">{mentor.modelsBuilt}</div>
                                                </div>
                                                <div className="bg-slate-950/50 rounded-lg px-3 py-2 border border-cyan-500/20">
                                                    <div className="text-cyan-400 text-xs font-semibold mb-1 flex items-center gap-1">
                                                        <Target className="w-3 h-3" />
                                                        Papers
                                                    </div>
                                                    <div className="text-white text-sm font-bold">{mentor.papersPublished}</div>
                                                </div>
                                                <div className="bg-slate-950/50 rounded-lg px-3 py-2 border border-cyan-500/20">
                                                    <div className="text-cyan-400 text-xs font-semibold mb-1 flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        Impact
                                                    </div>
                                                    <div className="text-white text-sm font-bold">{mentor.usersImpacted}</div>
                                                </div>
                                            </div>

                                            {/* Expertise Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {mentor.expertise.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-md border border-cyan-500/20"
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
                                            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                                                <div>
                                                    <span className="text-xl font-bold text-white">₹{mentor.hourlyRate}</span>
                                                    <span className="text-gray-400 text-xs">/hour</span>
                                                </div>
                                                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 text-sm">
                                                    Book Session
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* No Results */}
                            {filteredMentors.length === 0 && (
                                <div className="text-center py-16 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl">
                                    <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
                                    <p className="text-gray-400 mb-4">Try adjusting your filters or search query</p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
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

    export default AIMentorDiscovery;