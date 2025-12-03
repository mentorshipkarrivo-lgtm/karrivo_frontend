// import React, { useState } from 'react';
// import { Search, Filter, Star, Briefcase, GraduationCap, Clock, MapPin, TrendingUp } from 'lucide-react';

// const MentorDiscovery = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedExperience, setSelectedExperience] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState('All');

//   const categories = [
//     'All',
//     'Software Engineering',
//     'Data Science',
//     'Cloud & DevOps',
//     'Machine Learning',
//     'Cybersecurity',
//     'Mobile Development'
//   ];

//   const experienceLevels = ['All', '0-5 years', '5-10 years', '10-15 years', '15+ years'];
//   const priceRanges = ['All', '₹0-500', '₹500-1000', '₹1000-2000', '₹2000+'];

//   const mentors = [
//     {
//       id: 1,
//       name: 'Dr. Rajesh Kumar',
//       title: 'Senior Software Architect',
//       company: 'Google India',
//       category: 'Software Engineering',
//       experience: '15+ years',
//       rating: 4.9,
//       reviews: 234,
//       sessionsCompleted: 450,
//       expertise: ['System Design', 'Cloud Architecture', 'Microservices'],
//       availability: 'Available',
//       hourlyRate: 1500,
//       image: 'https://randomuser.me/api/portraits/men/32.jpg',
//       nextAvailable: '2 days ago',
//       responseTime: '< 2 hours',
//       location: 'Bangalore, India',
//       languages: ['English', 'Hindi']
//     },
//     {
//       id: 2,
//       name: 'Priya Sharma',
//       title: 'Lead Data Scientist',
//       company: 'Microsoft',
//       category: 'Data Science',
//       experience: '10-15 years',
//       rating: 4.8,
//       reviews: 189,
//       sessionsCompleted: 320,
//       expertise: ['Machine Learning', 'Python', 'Data Analytics'],
//       availability: 'Available',
//       hourlyRate: 1200,
//       image: 'https://randomuser.me/api/portraits/women/44.jpg',
//       nextAvailable: 'Today',
//       responseTime: '< 1 hour',
//       location: 'Hyderabad, India',
//       languages: ['English', 'Telugu']
//     },
//     {
//       id: 3,
//       name: 'Amit Patel',
//       title: 'DevOps Principal Engineer',
//       company: 'Amazon Web Services',
//       category: 'Cloud & DevOps',
//       experience: '10-15 years',
//       rating: 5.0,
//       reviews: 156,
//       sessionsCompleted: 280,
//       expertise: ['AWS', 'Kubernetes', 'CI/CD'],
//       availability: 'Busy',
//       hourlyRate: 1800,
//       image: 'https://randomuser.me/api/portraits/men/52.jpg',
//       nextAvailable: '5 days ago',
//       responseTime: '< 3 hours',
//       location: 'Mumbai, India',
//       languages: ['English', 'Gujarati']
//     },
//     {
//       id: 4,
//       name: 'Sneha Reddy',
//       title: 'ML Research Engineer',
//       company: 'Meta',
//       category: 'Machine Learning',
//       experience: '5-10 years',
//       rating: 4.7,
//       reviews: 142,
//       sessionsCompleted: 210,
//       expertise: ['Deep Learning', 'Computer Vision', 'NLP'],
//       availability: 'Available',
//       hourlyRate: 1400,
//       image: 'https://randomuser.me/api/portraits/women/65.jpg',
//       nextAvailable: 'Tomorrow',
//       responseTime: '< 2 hours',
//       location: 'Chennai, India',
//       languages: ['English', 'Tamil']
//     },
//     {
//       id: 5,
//       name: 'Vikram Singh',
//       title: 'Cybersecurity Lead',
//       company: 'Cisco',
//       category: 'Cybersecurity',
//       experience: '15+ years',
//       rating: 4.9,
//       reviews: 198,
//       sessionsCompleted: 380,
//       expertise: ['Security Audits', 'Ethical Hacking', 'Cloud Security'],
//       availability: 'Available',
//       hourlyRate: 2000,
//       image: 'https://randomuser.me/api/portraits/men/67.jpg',
//       nextAvailable: 'Today',
//       responseTime: '< 1 hour',
//       location: 'Pune, India',
//       languages: ['English', 'Hindi']
//     },
//     {
//       id: 6,
//       name: 'Anjali Mehta',
//       title: 'Senior iOS Developer',
//       company: 'Apple',
//       category: 'Mobile Development',
//       experience: '5-10 years',
//       rating: 4.8,
//       reviews: 167,
//       sessionsCompleted: 290,
//       expertise: ['Swift', 'SwiftUI', 'iOS Architecture'],
//       availability: 'Available',
//       hourlyRate: 1300,
//       image: 'https://randomuser.me/api/portraits/women/72.jpg',
//       nextAvailable: '3 days ago',
//       responseTime: '< 2 hours',
//       location: 'Delhi, India',
//       languages: ['English', 'Hindi']
//     }
//   ];

//   const filteredMentors = mentors.filter(mentor => {
//     const matchesCategory = selectedCategory === 'All' || mentor.category === selectedCategory;
//     const matchesExperience = selectedExperience === 'All' || mentor.experience === selectedExperience;
//     const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

//     let matchesPrice = true;
//     if (priceRange !== 'All') {
//       const rate = mentor.hourlyRate;
//       if (priceRange === '₹0-500') matchesPrice = rate <= 500;
//       else if (priceRange === '₹500-1000') matchesPrice = rate > 500 && rate <= 1000;
//       else if (priceRange === '₹1000-2000') matchesPrice = rate > 1000 && rate <= 2000;
//       else if (priceRange === '₹2000+') matchesPrice = rate > 2000;
//     }

//     return matchesCategory && matchesExperience && matchesSearch && matchesPrice;
//   });

//   return (
//     <div className="min-h-screen bg-[#062117] py-8 px-4 pt-28">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Find Your Perfect Engineering Mentor
//           </h1>
//           <p className="text-gray-400">Connect with industry experts and accelerate your career growth</p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, expertise, or skill..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-4 bg-[#0a2d20] border border-[#0098cc]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-colors"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mb-8 space-y-4">
//           {/* Category Filter */}
//           <div>
//             <label className="text-gray-400 text-sm font-semibold mb-2 flex items-center gap-2">
//               <Filter className="w-4 h-4" />
//               Category
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                     selectedCategory === category
//                       ? 'bg-[#0098cc] text-white shadow-lg shadow-[#0098cc]/30'
//                       : 'bg-[#0a2d20] text-gray-400 border border-[#0098cc]/20 hover:border-[#0098cc]/40'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Experience & Price Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-400 text-sm font-semibold mb-2 block">
//                 Experience Level
//               </label>
//               <select
//                 value={selectedExperience}
//                 onChange={(e) => setSelectedExperience(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#0a2d20] border border-[#0098cc]/30 rounded-lg text-white focus:outline-none focus:border-[#0098cc] transition-colors"
//               >
//                 {experienceLevels.map((level) => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-400 text-sm font-semibold mb-2 block">
//                 Price Range (per hour)
//               </label>
//               <select
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#0a2d20] border border-[#0098cc]/30 rounded-lg text-white focus:outline-none focus:border-[#0098cc] transition-colors"
//               >
//                 {priceRanges.map((range) => (
//                   <option key={range} value={range}>{range}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-4 text-gray-400">
//           Showing <span className="text-[#0098cc] font-semibold">{filteredMentors.length}</span> mentors
//         </div>

//         {/* Mentor Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMentors.map((mentor) => (
//             <div
//               key={mentor.id}
//               className="group bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl overflow-hidden hover:border-[#0098cc]/60 hover:shadow-2xl hover:shadow-[#0098cc]/10 transition-all duration-300 hover:-translate-y-1"
//             >
//               {/* Card Header with Image */}
//               <div className="relative h-48 bg-gradient-to-br from-[#0098cc]/20 to-[#062117]">
//                 <div className="absolute top-4 left-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     mentor.availability === 'Available' 
//                       ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                       : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
//                   }`}>
//                     {mentor.availability}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-12 left-6">
//                   <img
//                     src={mentor.image}
//                     alt={mentor.name}
//                     className="w-24 h-24 rounded-xl border-4 border-[#0a2d20] object-cover shadow-xl"
//                   />
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="pt-16 px-6 pb-6">
//                 {/* Name & Title */}
//                 <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
//                 <p className="text-[#0098cc] text-sm font-semibold mb-1">{mentor.title}</p>
//                 <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
//                   <Briefcase className="w-3 h-3" />
//                   {mentor.company}
//                 </p>

//                 {/* Rating & Stats */}
//                 <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#0098cc]/20">
//                   <div className="flex items-center gap-1">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-white font-bold text-sm">{mentor.rating}</span>
//                     <span className="text-gray-400 text-xs">({mentor.reviews})</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-gray-400 text-xs">
//                     <TrendingUp className="w-4 h-4 text-[#0098cc]" />
//                     {mentor.sessionsCompleted} sessions
//                   </div>
//                 </div>

//                 {/* Experience Badge */}
//                 <div className="flex items-center gap-2 mb-3">
//                   <GraduationCap className="w-4 h-4 text-[#0098cc]" />
//                   <span className="text-gray-300 text-sm font-medium">{mentor.experience} experience</span>
//                 </div>

//                 {/* Expertise Tags */}
//                 <div className="flex flex-wrap gap-1.5 mb-4">
//                   {mentor.expertise.slice(0, 3).map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] text-xs rounded-md border border-[#0098cc]/20"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Location & Response Time */}
//                 <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
//                   <div className="flex items-center gap-1">
//                     <MapPin className="w-3 h-3" />
//                     {mentor.location}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {mentor.responseTime}
//                   </div>
//                 </div>

//                 {/* Price & CTA */}
//                 <div className="flex items-center justify-between pt-4 border-t border-[#0098cc]/20">
//                   <div>
//                     <span className="text-2xl font-bold text-white">₹{mentor.hourlyRate}</span>
//                     <span className="text-gray-400 text-sm">/hour</span>
//                   </div>
//                   <button className="px-5 py-2.5 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0098cc]/30 transition-all duration-300 transform hover:scale-105 text-sm">
//                     Book Session
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredMentors.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-16 h-16 bg-[#0098cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-[#0098cc]" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2">No mentors found</h3>
//             <p className="text-gray-400">Try adjusting your filters or search query</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MentorDiscovery;


import React, { useState } from 'react';
import { Search, Filter, Star, Briefcase, GraduationCap, Clock, MapPin, TrendingUp, X } from 'lucide-react';

const MentorDiscovery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

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

    const mentors = [
        {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            title: 'Senior Software Architect',
            company: 'Google India',
            category: 'Software Engineering',
            experience: '15+ years',
            rating: 4.9,
            reviews: 234,
            sessionsCompleted: 450,
            expertise: ['System Design', 'Cloud Architecture', 'Microservices'],
            availability: 'Available',
            hourlyRate: 1500,
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            nextAvailable: '2 days ago',
            responseTime: '< 2 hours',
            location: 'Bangalore, India',
            languages: ['English', 'Hindi']
        },
        {
            id: 2,
            name: 'Priya Sharma',
            title: 'Lead Data Scientist',
            company: 'Microsoft',
            category: 'Data Science',
            experience: '10-15 years',
            rating: 4.8,
            reviews: 189,
            sessionsCompleted: 320,
            expertise: ['Machine Learning', 'Python', 'Data Analytics'],
            availability: 'Available',
            hourlyRate: 1200,
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            nextAvailable: 'Today',
            responseTime: '< 1 hour',
            location: 'Hyderabad, India',
            languages: ['English', 'Telugu']
        },
        {
            id: 3,
            name: 'Amit Patel',
            title: 'DevOps Principal Engineer',
            company: 'Amazon Web Services',
            category: 'Cloud & DevOps',
            experience: '10-15 years',
            rating: 5.0,
            reviews: 156,
            sessionsCompleted: 280,
            expertise: ['AWS', 'Kubernetes', 'CI/CD'],
            availability: 'Busy',
            hourlyRate: 1800,
            image: 'https://randomuser.me/api/portraits/men/52.jpg',
            nextAvailable: '5 days ago',
            responseTime: '< 3 hours',
            location: 'Mumbai, India',
            languages: ['English', 'Gujarati']
        },
        {
            id: 4,
            name: 'Sneha Reddy',
            title: 'ML Research Engineer',
            company: 'Meta',
            category: 'Machine Learning',
            experience: '5-10 years',
            rating: 4.7,
            reviews: 142,
            sessionsCompleted: 210,
            expertise: ['Deep Learning', 'Computer Vision', 'NLP'],
            availability: 'Available',
            hourlyRate: 1400,
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            nextAvailable: 'Tomorrow',
            responseTime: '< 2 hours',
            location: 'Chennai, India',
            languages: ['English', 'Tamil']
        },
        {
            id: 5,
            name: 'Vikram Singh',
            title: 'Cybersecurity Lead',
            company: 'Cisco',
            category: 'Cybersecurity',
            experience: '15+ years',
            rating: 4.9,
            reviews: 198,
            sessionsCompleted: 380,
            expertise: ['Security Audits', 'Ethical Hacking', 'Cloud Security'],
            availability: 'Available',
            hourlyRate: 2000,
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            nextAvailable: 'Today',
            responseTime: '< 1 hour',
            location: 'Pune, India',
            languages: ['English', 'Hindi']
        },
        {
            id: 6,
            name: 'Anjali Mehta',
            title: 'Senior iOS Developer',
            company: 'Apple',
            category: 'Mobile Development',
            experience: '5-10 years',
            rating: 4.8,
            reviews: 167,
            sessionsCompleted: 290,
            expertise: ['Swift', 'SwiftUI', 'iOS Architecture'],
            availability: 'Available',
            hourlyRate: 1300,
            image: 'https://randomuser.me/api/portraits/women/72.jpg',
            nextAvailable: '3 days ago',
            responseTime: '< 2 hours',
            location: 'Delhi, India',
            languages: ['English', 'Hindi']
        },
        {
            id: 7,
            name: 'Karthik Nair',
            title: 'Full Stack Developer',
            company: 'Flipkart',
            category: 'Software Engineering',
            experience: '5-10 years',
            rating: 4.6,
            reviews: 125,
            sessionsCompleted: 195,
            expertise: ['React', 'Node.js', 'MongoDB'],
            availability: 'Available',
            hourlyRate: 900,
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
            nextAvailable: 'Today',
            responseTime: '< 1 hour',
            location: 'Bangalore, India',
            languages: ['English', 'Tamil']
        },
        {
            id: 8,
            name: 'Neha Gupta',
            title: 'AI/ML Engineer',
            company: 'IBM',
            category: 'Machine Learning',
            experience: '10-15 years',
            rating: 4.9,
            reviews: 210,
            sessionsCompleted: 340,
            expertise: ['TensorFlow', 'PyTorch', 'Neural Networks'],
            availability: 'Busy',
            hourlyRate: 1600,
            image: 'https://randomuser.me/api/portraits/women/28.jpg',
            nextAvailable: '4 days ago',
            responseTime: '< 3 hours',
            location: 'Hyderabad, India',
            languages: ['English', 'Hindi']
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
            if (priceRange === '₹0-500') matchesPrice = rate <= 500;
            else if (priceRange === '₹500-1000') matchesPrice = rate > 500 && rate <= 1000;
            else if (priceRange === '₹1000-2000') matchesPrice = rate > 1000 && rate <= 2000;
            else if (priceRange === '₹2000+') matchesPrice = rate > 2000;
        }

        return matchesCategory && matchesExperience && matchesSearch && matchesPrice && matchesAvailability && matchesLanguages;
    });

    return (
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
                        <div className="mb-6 text-gray-400">
                            Showing <span className="text-[#0098cc] font-semibold">{filteredMentors.length}</span> mentors
                        </div>

                        {/* Mentor Cards Grid - 2 columns */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {filteredMentors.map((mentor) => (
                                <div
                                    key={mentor.id}
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
                                        {/* Name & Title */}
                                        <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                                        <p className="text-[#0098cc] text-sm font-semibold mb-1">{mentor.title}</p>
                                        <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" />
                                            {mentor.company}
                                        </p>

                                        {/* Rating & Stats */}
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

                                        {/* Experience Badge */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <GraduationCap className="w-4 h-4 text-[#0098cc]" />
                                            <span className="text-gray-300 text-sm">{mentor.experience}</span>
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

export default MentorDiscovery;



