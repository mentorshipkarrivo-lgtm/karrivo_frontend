// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Search, ArrowRight, Sparkles, ChevronRight, TrendingUp, Users, Award } from 'lucide-react';

// // // Component imports
// // import TestimonialsSection from './Testimonals';
// // import MentorsSection from './mentorsection/MentorSection';
// // import FindMentor from './FindMentor';
// // import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
// // import MentorGrid from './HomeContact';
// // import FAQAccordion from './faqs';
// // import MentoHero from './Scrollvelocity';
// // import HeroSection from './HeroSection ';

// // const TYPING_CONFIG = {
// //   texts: ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'],
// //   typingSpeed: 100,
// //   deletingSpeed: 50,
// //   pauseDuration: 1000,
// // };

// // const MENTOR_PROFILES = [
// //   'https://i.pravatar.cc/400?img=1',
// //   'https://i.pravatar.cc/400?img=2',
// //   'https://i.pravatar.cc/400?img=3',
// //   'https://i.pravatar.cc/400?img=4',
// //   'https://i.pravatar.cc/400?img=5',
// //   'https://i.pravatar.cc/400?img=6',
// //   'https://i.pravatar.cc/400?img=7',
// // ];




// // const CATEGORIES = [
// //   { name: 'All Mentors', path: '/Allmentors' },
// //   { name: 'Engineering', path: '/engineering' },
// //   { name: 'Top Mentors', path: '/top' },
// //   { name: 'Startup', path: '/startup' },
// //   { name: 'Product', path: '/product' },
// //   { name: 'Marketing', path: '/marketing' },
// //   { name: 'Leadership', path: '/leadership' },
// //   { name: 'AI Mentors', path: '/ai-mentors' }
// // ];


// // const QUICK_LINKS = [
// //   'Product Managers',
// //   'Software Engineers',
// //   'Data Scientists',
// //   'UX Designers',
// //   'Career Coaches'
// // ];


// // // ============================================================================
// // // CUSTOM HOOK FOR TYPING ANIMATION
// // // ============================================================================
// // const useTypingAnimation = (texts, config) => {
// //   const [displayedText, setDisplayedText] = useState('');
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isDeleting, setIsDeleting] = useState(false);

// //   useEffect(() => {
// //     const currentText = texts[currentIndex];
// //     const { typingSpeed, deletingSpeed, pauseDuration } = config;

// //     const timer = setTimeout(() => {
// //       if (!isDeleting) {
// //         if (displayedText.length < currentText.length) {
// //           setDisplayedText(currentText.slice(0, displayedText.length + 1));
// //         } else {
// //           setTimeout(() => setIsDeleting(true), pauseDuration);
// //         }
// //       } else {
// //         if (displayedText.length > 0) {
// //           setDisplayedText(displayedText.slice(0, -1));
// //         } else {
// //           setIsDeleting(false);
// //           setCurrentIndex((prev) => (prev + 1) % texts.length);
// //         }
// //       }
// //     }, isDeleting ? deletingSpeed : typingSpeed);

// //     return () => clearTimeout(timer);
// //   }, [displayedText, isDeleting, currentIndex, texts, config]);

// //   return displayedText;
// // };

// // // ============================================================================
// // // HERO SECTION COMPONENT
// // // ============================================================================
// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);

// //   // Check if search query is valid (length > 1)
// //   const isSearchValid = searchQuery.trim().length > 1;

// //   const handleCategoryClick = (path) => {
// //     navigate(path);
// //   };
// //   // ============================================================================
// //   // EVENT HANDLERS
// //   // ============================================================================
// //   const handleFindMentors = (e) => {
// //     e.preventDefault();

// //     // Only proceed if search query length is greater than 1
// //     if (!isSearchValid) {
// //       return;
// //     }

// //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// //   };

// //   const handleQuickLinkClick = (link) => {
// //     navigate(`/search?q=${encodeURIComponent(link)}`);
// //   };

// //   const handleSearchInputChange = (e) => {
// //     setSearchQuery(e.target.value);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && isSearchValid) {
// //       handleFindMentors(e);
// //     }
// //   };

// //   // ============================================================================
// //   // RENDER
// //   // ============================================================================
// //   return (
// //     <>
// //       {/* Google Fonts */}
// //       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

// //       <div className="relative min-h-screen overflow-hidden">
// //         {/* Background Image with Overlay */}
// //         <div className="absolute inset-0">
// //           <div
// //             className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[2px] scale-105"
// //             style={{
// //               backgroundImage:
// //                 "url(https://t4.ftcdn.net/jpg/04/93/39/27/360_F_493392745_TBWKcO8i8dt7YaO7wRQtbk50qjkSHuq4.jpg)",
// //             }}
// //           ></div>
// //           <div className="absolute inset-0 bg-[#062117]/30 backdrop-blur-sm"></div>
// //         </div>

// //         {/* Decorative Elements */}
// //         <div className="absolute top-20 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
// //         <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
// //         <nav className="container mx-auto px-4 sm:px-6 lg:px-8  md:pt-24 pb-8">
// //           <div className="max-w-6xl mx-auto">
// //             <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
// //               {CATEGORIES.map((category) => (
// //                 <button
// //                   key={category.path}
// //                   onClick={() => handleCategoryClick(category.path)}
// //                   className="flex-shrink-0 bg-white/15 backdrop-blur-lg text-white hover:bg-white/25 font-medium px-5 py-2.5 rounded-full transition-all duration-300 text-sm border border-white/20 hover:border-white/40 hover:scale-105"
// //                   aria-label={`Navigate to ${category.name}`}
// //                 >
// //                   {category.name}
// //                 </button>
// //               ))}
// //               <button
// //                 className="flex-shrink-0 bg-white/15 backdrop-blur-lg p-2.5 hover:bg-white/25 rounded-full transition-all duration-300 border border-white/20"
// //                 aria-label="More categories"
// //               >
// //                 <ChevronRight className="w-4 h-4 text-white" />
// //               </button>
// //             </div>
// //           </div>
// //         </nav>
// //         {/* Centered Content */}
// //         <div className="relative z-10 flex flex-col items-center justify-center min-h-screen ">
// //           {/* Trust Badge */}



// //           {/* Main Heading */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //             className="text-center mb-5"
// //           >
// //             <h1
// //               className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3  drop-shadow-lg"
// //               style={{ fontFamily: "'Inter', sans-serif" }}
// //             >
// //               Connect with{" "}
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
// //                 Expert Mentors
// //               </span>
// //             </h1>

// //             <div
// //               className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0098cc]"
// //               style={{ fontFamily: "'Inter', sans-serif" }}
// //             >
// //               Accelerate Your Growth in{" "}
// //               <span className="inline-block min-w-[280px] text-left text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">
// //                 {displayedText || "Tech"}
// //                 <span className="animate-pulse text-white">|</span>
// //               </span>
// //             </div>
// //           </motion.div>


// //           {/* Subtitle */}
// //           <motion.p
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className="text-white/80 text-base md:text-lg max-w-2xl text-center mb-8 leading-relaxed"
// //             style={{ fontFamily: "'Inter', sans-serif" }}
// //           >
// //             Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
// //           </motion.p>

// //           {/* Search Bar */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.3 }}
// //             className="w-full max-w-2xl mb-5"
// //           >
// //             <div className="relative">
// //               <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search for mentors by skill, role, or company..."
// //                 value={searchQuery}
// //                 onChange={handleSearchInputChange}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full pl-14 pr-4 py-3.5 rounded-full bg-white/95 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-xl text-sm"
// //                 style={{ fontFamily: "'Inter', sans-serif" }}
// //               />
// //               <button
// //                 onClick={handleFindMentors}
// //                 disabled={!isSearchValid}
// //                 className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg text-sm font-semibold ${isSearchValid
// //                   ? 'bg-[#0098cc] text-white hover:bg-[#0087b8] cursor-pointer'
// //                   : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
// //                   }`}
// //                 style={{ fontFamily: "'Inter', sans-serif" }}
// //               >
// //                 Find Mentors
// //                 <ArrowRight className="w-4 h-4" />
// //               </button>
// //             </div>
// //             {/* Validation message */}
// //             {searchQuery.length > 0 && !isSearchValid && (
// //               <p className="text-red-400 text-xs mt-2 ml-5" style={{ fontFamily: "'Inter', sans-serif" }}>
// //                 Please enter at least 2 characters to search
// //               </p>
// //             )}
// //           </motion.div>

// //           {/* Quick Links */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.4 }}
// //             className="flex flex-wrap items-center justify-center gap-2 mb-10"
// //           >
// //             <span className="text-white/70 text-xs mr-1" style={{ fontFamily: "'Inter', sans-serif" }}>Popular searches:</span>
// //             {QUICK_LINKS.map((link) => (
// //               <button
// //                 key={link}
// //                 onClick={() => handleQuickLinkClick(link)}
// //                 className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-105"
// //                 style={{ fontFamily: "'Inter', sans-serif" }}
// //               >
// //                 {link}
// //               </button>
// //             ))}
// //           </motion.div>

// //           {/* Mentor Photo Grid */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.6, delay: 0.5 }}
// //             className="relative mb-10"
// //           >
// //             <div className="flex flex-col items-center gap-3">
// //               {/* Top Row - 4 photos */}
// //               <div className="flex gap-3">
// //                 {MENTOR_PROFILES.slice(0, 4).map((profile, index) => (
// //                   <motion.img
// //                     key={`top-${index}`}
// //                     src={profile}
// //                     alt={`Mentor ${index + 1}`}
// //                     className="w-12 h-12 rounded-full border-2 border-white/30 shadow-lg object-cover"
// //                     initial={{ opacity: 0, scale: 0 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
// //                   />
// //                 ))}
// //               </div>
// //               {/* Bottom Row - 3 photos */}
// //               <div className="flex gap-3">
// //                 {MENTOR_PROFILES.slice(4, 7).map((profile, index) => (
// //                   <motion.img
// //                     key={`bottom-${index}`}
// //                     src={profile}
// //                     alt={`Mentor ${index + 5}`}
// //                     className="w-12 h-12 rounded-full border-2 border-white/30 shadow-lg object-cover"
// //                     initial={{ opacity: 0, scale: 0 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //             {/* Glow Effect */}
// //             <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full -z-10"></div>
// //           </motion.div>
// //         </div>
// //       </div>

// // <main className="relative z-20 -mt-8">
// //   <div className="space-y-0">
// //     <MentorsSection />
// //     <HeroSection />
// //     <TestimonialsSection />
// //     <FAQAccordion />
// //     <MentorGrid />
// //     <MentoHero />
// //     <FindMentor />
// //   </div>
// // </main>
// //     </>
// //   );
// // };

// // export default Home;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Search, ArrowRight, ChevronRight } from "lucide-react";

// import TestimonialsSection from './Testimonals';
// import MentorsSection from './mentorsection/MentorSection';
// import FindMentor from './FindMentor';
// import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
// import MentorGrid from './HomeContact';
// import FAQAccordion from './faqs';
// import MentoHero from './Scrollvelocity';
// import HeroSection from './HeroSection ';


// const TYPING_CONFIG = {
//   texts: ["ML & AI", "Data Science", "Web Development", "Mobile Apps", "Cloud Computing"],
//   typingSpeed: 100,
//   deletingSpeed: 50,
//   pauseDuration: 1000,
// };

// const MENTOR_PROFILES = [
//   "https://i.pravatar.cc/400?img=1",
//   "https://i.pravatar.cc/400?img=2",
//   "https://i.pravatar.cc/400?img=3",
//   "https://i.pravatar.cc/400?img=4",
//   "https://i.pravatar.cc/400?img=5",
//   "https://i.pravatar.cc/400?img=6",
//   "https://i.pravatar.cc/400?img=7",
// ];

// const CATEGORIES = [
//   { name: "All Mentors", path: "/Allmentors" },
//   { name: "Engineering", path: "/engineering" },
//   { name: "Top Mentors", path: "/top" },
//   { name: "Startup", path: "/startup" },
//   { name: "Product", path: "/product" },
//   { name: "Marketing", path: "/marketing" },
//   { name: "Leadership", path: "/leadership" },
//   { name: "AI Mentors", path: "/ai-mentors" },
// ];

// const QUICK_LINKS = [
//   "Product Managers",
//   "Software Engineers",
//   "Data Scientists",
//   "UX Designers",
//   "Career Coaches",
// ];

// const useTypingAnimation = (texts, config) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentText = texts[currentIndex];
//     const { typingSpeed, deletingSpeed, pauseDuration } = config;

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
//   }, [displayedText, isDeleting, currentIndex, texts, config]);

//   return displayedText;
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);
//   const isSearchValid = searchQuery.trim().length > 1;

//   const handleCategoryClick = (path) => navigate(path);
//   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);
//   const handleFindMentors = (e) => {
//     e.preventDefault();
//     if (!isSearchValid) return;
//     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//   };

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
//         rel="stylesheet"
//       />

//       <div className="relative min-h-screen bg-[#062117] overflow-hidden px-4 sm:px-6 lg:px-8">
//         {/* Background */}
//         {/* <div className="absolute inset-0">
//           <div
//             className="absolute inset-0 bg-cover bg-center blur-sm md:blur-[2px] md:scale-105"
//             style={{
//               backgroundImage:
//                 "url(https://t4.ftcdn.net/jpg/04/93/39/27/360_F_493392745_TBWKcO8i8dt7YaO7wRQtbk50qjkSHuq4.jpg)",
//             }}
//           />
//           <div className="absolute inset-0 bg-[#062117]/30 backdrop-blur-sm" />
//         </div> */}

//         {/* Decorative circles */}
//         <div className="absolute top-20 left-4 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />

//         {/* Category Nav */}
//         <nav className="relative z-10 pt-24 max-w-5xl mx-auto">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center px-2">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat.path}
//                 onClick={() => handleCategoryClick(cat.path)}
//                 className="flex-shrink-0 bg-white/15 backdrop-blur-lg text-white hover:bg-white/25 font-medium px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm md:text-base border border-white/20 hover:border-white/40 hover:scale-105 transition-all"
//               >
//                 {cat.name}
//               </button>
//             ))}
//             <button className="flex-shrink-0 bg-white/15 backdrop-blur-lg p-2 hover:bg-white/25 rounded-full border border-white/20">
//               <ChevronRight className="w-4 h-4 text-white" />
//             </button>
//           </div>
//         </nav>

//         {/* Hero */}
//         <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold text-white mb-3 drop-shadow-lg"
//           >
//             Connect with{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
//               Expert Mentors
//             </span>
//           </motion.h1>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-[#0098cc]"
//           >
//             Accelerate Your Growth in{" "}
//             <span className="inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[220px] text-left text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">
//               {displayedText || "Tech"}
//               <span className="animate-pulse text-white">|</span>
//             </span>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="text-white/80 text-sm sm:text-base md:text-base max-w-xl mt-3 mb-5 leading-relaxed"
//           >
//             Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
//           </motion.p>

//           {/* Search Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="w-full max-w-xl mb-5 px-2"
//           >
//             <div className="relative">
//               <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search for mentors by skill, role, or company..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && isSearchValid && handleFindMentors(e)}
//                 className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md text-sm sm:text-base transition-all"
//               />
//               <button
//                 onClick={handleFindMentors}
//                 disabled={!isSearchValid}
//                 className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-sm sm:text-base font-semibold shadow-md transition-all ${isSearchValid
//                   ? "bg-[#0098cc] text-white hover:bg-[#0087b8] cursor-pointer"
//                   : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
//                   }`}
//               >
//                 Find Mentors <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//             {searchQuery.length > 0 && !isSearchValid && (
//               <p className="text-red-400 text-xs mt-2 ml-2 sm:ml-3">Please enter at least 2 characters to search</p>
//             )}
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs sm:text-sm">
//             <span className="text-white/70 mr-1">Popular searches:</span>
//             {QUICK_LINKS.map((link) => (
//               <button
//                 key={link}
//                 onClick={() => handleQuickLinkClick(link)}
//                 className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/90 px-3 sm:px-4 py-1 rounded-full font-medium transition-all border border-white/10 hover:border-white/30 hover:scale-105"
//               >
//                 {link}
//               </button>
//             ))}
//           </motion.div>

//           {/* Mentor Grid */}
//           <motion.div className="relative mb-10 flex flex-wrap justify-center gap-3">
//             {MENTOR_PROFILES.map((profile, index) => (
//               <motion.img
//                 key={index}
//                 src={profile}
//                 alt={`Mentor ${index + 1}`}
//                 className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-full border-2 border-white/30 shadow-md object-cover"
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
//               />
//             ))}
//             <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full -z-10" />
//           </motion.div>
//         </div>


//       </div>

//       <main className="relative z-20 -mt-8">
//         <div className="space-y-0">
//           <MentorsSection />
//           <HeroSection />
//           <TestimonialsSection />
//           <FAQAccordion />
//           <MentorGrid />
//           <MentoHero />
//           <FindMentor />
//         </div>
//       </main>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

import TestimonialsSection from './Testimonals';
import MentorsSection from './mentorsection/MentorSection';
import FindMentor from './FindMentor';
import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
import MentorGrid from './HomeContact';
import FAQAccordion from './faqs';
import MentoHero from './Scrollvelocity';
import HeroSection from './HeroSection ';

const TYPING_CONFIG = {
  texts: ["ML & AI", "Data Science", "Web Development", "Mobile Apps", "Cloud Computing"],
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 1000,
};

const MENTOR_PROFILES = [
  "https://i.pravatar.cc/400?img=1",
  "https://i.pravatar.cc/400?img=2",
  "https://i.pravatar.cc/400?img=3",
  "https://i.pravatar.cc/400?img=4",
  "https://i.pravatar.cc/400?img=5",
  "https://i.pravatar.cc/400?img=6",
];

const CATEGORIES = [
  { name: "All Mentors", path: "/Allmentors" },
  { name: "Engineering", path: "/engineering" },
  { name: "Top Mentors", path: "/top" },
  { name: "Startup", path: "/startup" },
  { name: "Product", path: "/product" },
  { name: "Marketing", path: "/marketing" },
  { name: "Leadership", path: "/leadership" },
  { name: "AI Mentors", path: "/ai-mentors" },
];

const QUICK_LINKS = [
  "Product Managers",
  "Software Engineers",
  "Data Scientists",
  "UX Designers",
  "Career Coaches",
];

const useTypingAnimation = (texts, config) => {
  const [displayedText, setDisplayedText] = useState("");
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

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);
  const isSearchValid = searchQuery.trim().length > 1;

  const handleCategoryClick = (path) => navigate(path);
  const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

  const handleFindMentors = (e) => {
    e.preventDefault();
    if (!isSearchValid) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="pt-8 pb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 shadow-sm hover:shadow border border-gray-200 hover:border-indigo-300"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-12 pb-20 text-center">


            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Connect with{" "}
              <span className="bg-[#0098cc] bg-clip-text text-transparent">
                Expert Mentors
              </span>
            </motion.h1>

            {/* Typing Animation Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-600 mb-4"
            >
              Accelerate Your Growth in{" "}
              <span className="font-semibold text-[#0098cc]">
                {displayedText || "Tech"}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <form onSubmit={handleFindMentors} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for mentors by skill, role, or industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg text-base transition-all border-none"
                />
                <button
                  type="submit"
                  disabled={!isSearchValid}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${isSearchValid
                    ? "bg-[#0098cc] text-white hover:bg-[#0098cc] shadow-md border-none"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed border-none"
                    }`}
                >
                  Find Mentors
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

              {searchQuery.length > 0 && !isSearchValid && (
                <p className="text-sm text-red-500 mt-2 text-left ml-4">
                  Please enter at least 2 characters to search
                </p>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-12"
            >
              <span className="text-sm text-gray-500">Popular searches:</span>
              {QUICK_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleQuickLinkClick(link)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 shadow-sm border border-gray-200 hover:border-indigo-300"
                >
                  {link}
                </button>
              ))}
            </motion.div>

            {/* Mentor Avatars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center items-center gap-3"
            >
              <div className="flex -space-x-3">
                {MENTOR_PROFILES.map((profile, index) => (
                  <motion.img
                    key={index}
                    src={profile}
                    alt={`Mentor ${index + 1}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  />
                ))}
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-semibold text-gray-900">10,000+ Expert Mentors</p>
                <p className="text-xs text-gray-500">Ready to guide you</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <HeroSection />

      <MentorsSection />
      <TestimonialsSection />
      <FAQAccordion />
      <MentorGrid />
      <MentoHero />
            <FindMentor />


      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Home;