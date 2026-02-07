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
// import FloatingLines from "./floatingsection"


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

//   const handleFindMentors = (e) => {
//     e.preventDefault();
//     console.log('🔍 Find Mentors clicked with query:', searchQuery);

//     if (searchQuery.trim()) {
//       const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
//       navigate(searchUrl);
//     } else {
//       navigate('/search');
//     }
//   };

//   // Handle quick link clicks
//   const handleQuickLinkClick = (link) => {
//     navigate(`/search?q=${encodeURIComponent(link)}`);
//   };

//   // Handle category navigation
//   const handleCategoryClick = (path) => {
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
//       <div className="min-h-[85vh] sm:min-h-[90vh] md:min-h-screen  relative overflow-hidden pt-12 sm:pt-14 md:pt-16 ">

//         {/* Background Image */}
//         <div className="absolute inset-0 w-full h-full">
//           <img
//             src="https://www.pldmentoring.com/static/images/blog/reverse-mentoring.jpg?ver=1768572751"
//             alt="Mentoring background"
//             className="w-full h-full object-cover"
//           />
//           {/* Dark overlay */}
//         </div>

//         {/* Floating Lines Background */}
//         {/* <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
//           <FloatingLines 
//             linesGradient={[
//               '#4db8a8',  // Teal/Turquoise
//               '#5ac8d8',  // Light blue
//               '#0098cc',  // Bright blue
//               '#4db8a8',  // Teal (repeat for smooth gradient)
//             ]}
//             enabledWaves={["top", "middle", "bottom"]}
//             lineCount={6}
//             lineDistance={5}
//             bendRadius={8}
//             bendStrength={-0.3}
//             interactive={true}
//             parallax={true}
//             parallaxStrength={0.15}
//             animationSpeed={0.8}
//             mixBlendMode="screen"
//           />
//         </div> */}

//         {/* Top Navigation - RESPONSIVE with added top padding */}
//         <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6 lg:pt-8 pb-2 sm:pb-3 md:pb-4 relative z-10">
//           <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleCategoryClick(category.path)}
//                 className="whitespace-nowrap text-white/90 hover:text-white font-medium px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md md:rounded-lg hover:bg-white/10 transition-all duration-300 text-[10px] sm:text-xs md:text-sm flex-shrink-0"
//               >
//                 {category.name}
//               </button>
//             ))}
//             <button className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md md:rounded-lg transition-all duration-300 flex-shrink-0">
//               <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* Hero Content - RESPONSIVE */}
//         <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             {/* Main Heading with Animation - RESPONSIVE */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, ease: 'easeOut' }}
//               className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight px-2"
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
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-4"
//             >
//               Learn a new skill, launch a project, land your dream career.
//             </motion.p>

//             {/* Search Bar - RESPONSIVE */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-4"
//             >
//               <div className="relative flex-1 w-full">
//                 <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search by company, skills or role"
//                   className="w-full bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={handleFindMentors}
//                 className="w-full sm:w-auto bg-[#0098cc] text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap text-xs sm:text-sm md:text-base"
//               >
//                 Find mentors
//               </button>
//             </motion.div>

//             {/* Quick Links - RESPONSIVE */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4"
//             >
//               {quickLinks.map((link, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleQuickLinkClick(link)}
//                   className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
//                 >
//                   {link}
//                 </button>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section - RESPONSIVE */}
//       {/* <div className="bg-[#062117] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
//         <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 text-center hover:bg-gradient-to-br hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 group"
//                 >
//                   <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#4db8a8] group-hover:text-[#5ac8d8] mx-auto mb-1.5 sm:mb-2 md:mb-3 transition-colors duration-300" />
//                   <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-0.5 sm:mb-1 md:mb-2">{stat.value}</div>
//                   <div className="text-white/70 text-[10px] sm:text-xs md:text-sm lg:text-base">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Components Section - Removed extra spacing for small screens */}
//       <div className="space-y-0">
//         <MentorMenteeHero />
//         <MentorsSection />
//         <MentorGrid />
//         <HeroSection />
//         <TestimonialsSection />
//         <FAQAccordion />
//         <MentoHero />
//         <FindMentor />
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';

// Component imports
import TestimonialsSection from './Testimonals';
import MentorsSection from './mentorsection/MentorSection';
import FindMentor from './FindMentor';
import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
import MentorGrid from './HomeContact';
import FAQAccordion from './faqs';
import MentoHero from './Scrollvelocity';
import HeroSection from './HeroSection ';

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const TYPING_CONFIG = {
  texts: ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'],
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 1000,
};

const CATEGORIES = [
  { name: 'All Mentors', path: '/Allmentors' },
  { name: 'Engineering', path: '/engineering' },
  { name: 'Top Mentors', path: '/top' },
  { name: 'Startup', path: '/startup' },
  { name: 'Product', path: '/product' },
  { name: 'Marketing', path: '/marketing' },
  { name: 'Leadership', path: '/leadership' },
  { name: 'AI Mentors', path: '/ai-mentors' }
];

const QUICK_LINKS = [
  'Product Managers',
  'Career Coaches',
  'Software Engineers',
  'Leadership Mentors',
  'UX Designers',
  'Data Scientists',
  'Startup Founders'
];

// ============================================================================
// CUSTOM HOOK FOR TYPING ANIMATION
// ============================================================================

const useTypingAnimation = (texts, config) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const { typingSpeed, deletingSpeed, pauseDuration } = config;

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
  }, [displayedText, isDeleting, currentIndex, texts, config]);

  return displayedText;
};

// ============================================================================
// MAIN HOME COMPONENT
// ============================================================================

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleFindMentors = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      navigate(searchUrl);
    } else {
      navigate('/search');
    }
  };

  const handleQuickLinkClick = (link) => {
    navigate(`/search?q=${encodeURIComponent(link)}`);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindMentors(e);
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="outer-container">
      {/* ====================================================================== */}
      {/* HERO SECTION - MODERN CARD DESIGN */}
      {/* ====================================================================== */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://www.pldmentoring.com/static/images/blog/reverse-mentoring.jpg?ver=1768572751"
            alt="Mentoring background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Category Pills Navigation */}
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.path}
                    onClick={() => handleCategoryClick(category.path)}
                    className="flex-shrink-0 bg-white/15 backdrop-blur-lg text-white hover:bg-white/25 font-medium px-5 py-2.5 rounded-full transition-all duration-300 text-sm border border-white/20 hover:border-white/40 hover:scale-105"
                    aria-label={`Navigate to ${category.name}`}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  className="flex-shrink-0 bg-white/15 backdrop-blur-lg p-2.5 hover:bg-white/25 rounded-full transition-all duration-300 border border-white/20"
                  aria-label="More categories"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Content Card */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className=" rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16  shadow-2xl"
              >
                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-8 md:mb-10"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                    <span className="text-white block mb-2">1-on-1 Mentorship in</span>
                    <span className="text-[#4db8a8] inline-block min-h-[1.2em]">
                      {displayedText}
                      <span className="animate-pulse ml-1">|</span>
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                    Learn a new skill, launch a project, land your dream career.
                  </p>
                </motion.div>

                {/* Search Bar Card */}
                <motion.form
                  onSubmit={handleFindMentors}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search by company, skills or role"
                        className="w-full pl-14 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent rounded-xl"
                        aria-label="Search for mentors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0098cc] hover:bg-[#0098cc]/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-base whitespace-nowrap"
                      aria-label="Find mentors"
                    >
                      Find mentors
                    </button>
                  </div>
                </motion.form>

                {/* Quick Links - Improved Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-3"
                >
                  <p className="text-white/70 text-sm text-center">Popular searches:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {QUICK_LINKS.map((link) => (
                      <button
                        key={link}
                        onClick={() => handleQuickLinkClick(link)}
                        className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
                        aria-label={`Search for ${link}`}
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#4db8a8]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#5ac8d8]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#0098cc]/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* ====================================================================== */}
      {/* MAIN CONTENT SECTIONS */}
      {/* ====================================================================== */}
      <main className="relative z-20 -mt-8">
        {/* Sections with proper spacing */}
        <div className="space-y-0">
          {/* <MentorMenteeHero /> */}
          <MentorsSection />
          <MentorGrid />
          <HeroSection />
          <TestimonialsSection />
          <FAQAccordion />
          <MentoHero />
          <FindMentor />
        </div>
      </main>
    </div>
  );
};

export default Home;










