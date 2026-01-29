// import React, { useState, useEffect, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Search, ChevronRight, Star, Users, Award, TrendingUp } from 'lucide-react';
// import TestimonialsSection from './Testimonals';
// import MentorsSection from './mentorsection/MentorSection';
// import FindMentor from './FindMentor';

// import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
// import MentorGrid from './HomeContact';
// import FAQAccordion from './faqs';
// import MentoHero from './Scrollvelocity';
// import HeroSection from './HeroSection ';


// const Home = () => {
//   const navigate = useNavigate();
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const texts = ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'];
//   const typingSpeed = 100;
//   const deletingSpeed = 50;
//   const pauseDuration = 1000;

//   const velocity = 12;

//   // Typing animation effect
//   useEffect(() => {
//     const currentText = texts[currentIndex];

//     const timer = setTimeout(() => {
//       if (!isDeleting) {
//         if (displayedText.length < currentText.length) {
//           setDisplayedText(currentText.slice(0, displayedText.length + 1));
//         } else {
//           setTimeout(() => setIsDeleting(true), pauseDuration);
//         }
//       } else {
//         if (displayedText.length > 0) {
//           setDisplayedText(displayedText.slice(0, -1));
//         } else {
//           setIsDeleting(false);
//           setCurrentIndex((prev) => (prev + 1) % texts.length);
//         }
//       }
//     }, isDeleting ? deletingSpeed : typingSpeed);

//     return () => clearTimeout(timer);
//   }, [displayedText, isDeleting, currentIndex]);

//   // Updated categories with routes
//   const categories = [
//     { name: 'All Mentors', path: '/Allmentors' },
//     { name: 'Engineering Mentors', path: '/engineering' },
//     { name: 'Top Mentors', path: '/top' },
//     { name: 'Startup Mentors', path: '/startup' },
//     { name: 'Product Mentors', path: '/product' },
//     { name: 'Marketing Mentors', path: '/marketing' },
//     { name: 'Leadership Mentors', path: '/leadership' },
//     { name: 'AI Mentors', path: '/ai-mentors' }
//   ];

//   const quickLinks = [
//     'Product Managers',
//     'Career Coaches',
//     'Software Engineers',
//     'Leadership Mentors',
//     'UX Designers',
//     'Data Scientists',
//     'Startup Founders'
//   ];

//   const stats = [
//     { icon: Users, value: '10,000+', label: 'Active Mentors' },
//     { icon: Star, value: '4.9/5', label: 'Average Rating' },
//     { icon: Award, value: '50,000+', label: 'Sessions Completed' },
//     { icon: TrendingUp, value: '95%', label: 'Success Rate' }
//   ];

//   // Handle search - FIND MENTORS BUTTON CLICK
//   const handleFindMentors = (e) => {
//     e.preventDefault();
//     console.log('🔍 Find Mentors clicked with query:', searchQuery);

//     if (searchQuery.trim()) {
//       const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
//       console.log('📍 Navigating to:', searchUrl);
//       navigate(searchUrl);
//     } else {
//       console.log('📍 Navigating to search page (all mentors)');
//       navigate('/search');
//     }
//   };

//   // Handle quick link clicks
//   const handleQuickLinkClick = (link) => {
//     console.log('⚡ Quick link clicked:', link);
//     navigate(`/search?q=${encodeURIComponent(link)}`);
//   };

//   // Handle category navigation
//   const handleCategoryClick = (path) => {
//     console.log('📂 Category clicked:', path);
//     navigate(path);
//   };

//   // Handle search input change
//   const handleSearchInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle Enter key press in search input
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleFindMentors(e);
//     }
//   };

//   return (
//     <div className="outer-container">
//       {/* Hero Section with Mentorloop Design */}
//       <div className="min-h-screen bg-[#062117] relative overflow-hidden pt-14 md:pt-20">

//         {/* <Navbar /> */}
//         {/* Top Navigation - RESPONSIVE */}
//         <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative z-10">
//           <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleCategoryClick(category.path)}
//                 className="whitespace-nowrap text-white/90 hover:text-white font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
//               >
//                 {category.name}
//               </button>
//             ))}
//             <button className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-all duration-300 flex-shrink-0">
//               <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* Hero Content - RESPONSIVE */}
//         <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             {/* Main Heading with Animation - RESPONSIVE */}
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1.2, ease: 'easeOut' }}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
//             >
//               <span className="text-white">1-on-1 Mentorship in</span>
//               <br />
//               <span className="text-[#4db8a8] inline-block min-h-[1.2em]">
//                 {displayedText}
//                 <span className="animate-pulse ml-1">|</span>
//               </span>
//             </motion.h1>

//             {/* Subtitle - RESPONSIVE */}
//             <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.3 }}
//               className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 px-4"
//             >
//               Learn a new skill, launch a project, land your dream career.
//             </motion.p>

//             {/* Search Bar - RESPONSIVE */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4"
//             >
//               <div className="relative flex-1 w-full">
//                 <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 sm:w-5 sm:h-5" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search by company, skills or role"
//                   className="w-full bg-transparent border-2 border-white/30 rounded-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={handleFindMentors}
//                 className="w-full sm:w-auto bg-[#0098cc] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap text-sm sm:text-base"
//               >
//                 Find mentors
//               </button>
//             </motion.div>

//             {/* Quick Links - RESPONSIVE */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.7 }}
//               className="flex flex-wrap items-center justify-center gap-2 px-4"
//             >
//               {quickLinks.map((link, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleQuickLinkClick(link)}
//                   className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
//                 >
//                   {link}
//                 </button>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Threads Animation - RESPONSIVE */}
//         {/* <div className="absolute bottom-0 left-0 right-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] pointer-events-none">
//           <div className="w-full h-full relative opacity-40">
//             <Suspense fallback={<div>Loading...</div>}>
//               <Threads
//                 amplitude={1.5}
//                 distance={0}
//                 enableMouseInteraction={true}
//               />
//             </Suspense>
//           </div>
//         </div> */}
//       </div>

//       {/* Stats Section - RESPONSIVE */}
//       <div className="bg-[#062117] py-8 sm:py-12 md:py-16">
//         <div className="container mx-auto px-4 sm:px-6 md:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center hover:bg-gradient-to-br hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 group"
//                 >
//                   <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#4db8a8] group-hover:text-[#5ac8d8] mx-auto mb-2 sm:mb-3 transition-colors duration-300" />
//                   <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-1 sm:mb-2">{stat.value}</div>
//                   <div className="text-white/70 text-xs sm:text-sm md:text-base">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <MentorMenteeHero />
//       <MentorsSection />
//       {/* <AboutPage /> */}
//       <MentorGrid />
//       <HeroSection />
//       <TestimonialsSection />
//       <FAQAccordion />
//       <MentoHero />
//       <FindMentor />
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import TestimonialsSection from './Testimonals';
import MentorsSection from './mentorsection/MentorSection';
import FindMentor from './FindMentor';

import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
import MentorGrid from './HomeContact';
import FAQAccordion from './faqs';
import MentoHero from './Scrollvelocity';
import HeroSection from './HeroSection ';
import FloatingLines from "./floatingsection"


const Home = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const texts = ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1000;

  const velocity = 12;

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIndex]);

  // Updated categories with routes
  const categories = [
    { name: 'All Mentors', path: '/Allmentors' },
    { name: 'Engineering Mentors', path: '/engineering' },
    { name: 'Top Mentors', path: '/top' },
    { name: 'Startup Mentors', path: '/startup' },
    { name: 'Product Mentors', path: '/product' },
    { name: 'Marketing Mentors', path: '/marketing' },
    { name: 'Leadership Mentors', path: '/leadership' },
    { name: 'AI Mentors', path: '/ai-mentors' }
  ];

  const quickLinks = [
    'Product Managers',
    'Career Coaches',
    'Software Engineers',
    'Leadership Mentors',
    'UX Designers',
    'Data Scientists',
    'Startup Founders'
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Mentors' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Award, value: '50,000+', label: 'Sessions Completed' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  // Handle search - FIND MENTORS BUTTON CLICK
  const handleFindMentors = (e) => {
    e.preventDefault();
    console.log('🔍 Find Mentors clicked with query:', searchQuery);

    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      console.log('📍 Navigating to:', searchUrl);
      navigate(searchUrl);
    } else {
      console.log('📍 Navigating to search page (all mentors)');
      navigate('/search');
    }
  };

  // Handle quick link clicks
  const handleQuickLinkClick = (link) => {
    console.log('⚡ Quick link clicked:', link);
    navigate(`/search?q=${encodeURIComponent(link)}`);
  };

  // Handle category navigation
  const handleCategoryClick = (path) => {
    console.log('📂 Category clicked:', path);
    navigate(path);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindMentors(e);
    }
  };

  return (
    <div className="outer-container">
      {/* Hero Section with Mentorloop Design */}
      <div className="min-h-[85vh] sm:min-h-[90vh] md:min-h-screen bg-[#062117] relative overflow-hidden pt-12 sm:pt-14 md:pt-16 lg:pt-20">
        
        {/* Floating Lines Background */}
        <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <FloatingLines 
            linesGradient={[
              '#4db8a8',  // Teal/Turquoise
              '#5ac8d8',  // Light blue
              '#0098cc',  // Bright blue
              '#4db8a8',  // Teal (repeat for smooth gradient)
            ]}
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={6}
            lineDistance={5}
            bendRadius={8}
            bendStrength={-0.3}
            interactive={true}
            parallax={true}
            parallaxStrength={0.15}
            animationSpeed={0.8}
            mixBlendMode="screen"
          />
        </div>

        {/* Top Navigation - RESPONSIVE with added top padding */}
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6 lg:pt-8 pb-2 sm:pb-3 md:pb-4 relative z-10">
          <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.path)}
                className="whitespace-nowrap text-white/90 hover:text-white font-medium px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md md:rounded-lg hover:bg-white/10 transition-all duration-300 text-[10px] sm:text-xs md:text-sm flex-shrink-0"
              >
                {category.name}
              </button>
            ))}
            <button className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md md:rounded-lg transition-all duration-300 flex-shrink-0">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Hero Content - RESPONSIVE */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading with Animation - RESPONSIVE */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight px-2"
            >
              <span className="text-white">1-on-1 Mentorship in</span>
              <br />
              <span className="text-[#4db8a8] inline-block min-h-[1.2em]">
                {displayedText}
                <span className="animate-pulse ml-1">|</span>
              </span>
            </motion.h1>

            {/* Subtitle - RESPONSIVE */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-4"
            >
              Learn a new skill, launch a project, land your dream career.
            </motion.p>

            {/* Search Bar - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-4"
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by company, skills or role"
                  className="w-full bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
                />
              </div>
              <button
                type="button"
                onClick={handleFindMentors}
                className="w-full sm:w-auto bg-[#0098cc] text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap text-xs sm:text-sm md:text-base"
              >
                Find mentors
              </button>
            </motion.div>

            {/* Quick Links - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4"
            >
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickLinkClick(link)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  {link}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section - RESPONSIVE */}
      <div className="bg-[#062117] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 text-center hover:bg-gradient-to-br hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 group"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#4db8a8] group-hover:text-[#5ac8d8] mx-auto mb-1.5 sm:mb-2 md:mb-3 transition-colors duration-300" />
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-0.5 sm:mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-white/70 text-[10px] sm:text-xs md:text-sm lg:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Components Section - Removed extra spacing for small screens */}
      <div className="space-y-0">
        <MentorMenteeHero />
        <MentorsSection />
        <MentorGrid />
        <HeroSection />
        <TestimonialsSection />
        <FAQAccordion />
        <MentoHero />
        <FindMentor />
      </div>
    </div>
  );
};

export default Home;