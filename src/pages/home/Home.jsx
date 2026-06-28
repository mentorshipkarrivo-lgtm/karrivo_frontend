
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { Search, ArrowRight } from "lucide-react";

// // import TestimonialsSection from './Testimonals';
// // import FAQAccordion from './faqs';
// // import HeroSection from './HeroSection ';
// // import StepsSection from "./Stepsections";
// // import Preloader from "./Preloader";
// // import Testimonials from "./Testimonials";

// // const TYPING_CONFIG = {
// //   texts: ["ML & AI", "Data Science", "Web Development", "Mobile Apps", "Cloud Computing"],
// //   typingSpeed: 100,
// //   deletingSpeed: 50,
// //   pauseDuration: 1000,
// // };

// // const MENTOR_PROFILES = [
// //   "https://randomuser.me/api/portraits/men/75.jpg",
// //   "https://randomuser.me/api/portraits/women/75.jpg",
// //   "https://randomuser.me/api/portraits/men/78.jpg",
// //   "https://randomuser.me/api/portraits/women/78.jpg",
// //   "https://randomuser.me/api/portraits/men/79.jpg",
// //   "https://randomuser.me/api/portraits/women/79.jpg",
// // ];

// // const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// // const useTypingAnimation = (texts, config) => {
// //   const [displayedText, setDisplayedText] = useState("");
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

// // const fadeUp = {
// //   hidden: { opacity: 0, y: 24 },
// //   visible: (delay = 0) => ({
// //     opacity: 1,
// //     y: 0,
// //     transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
// //   }),
// // };

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);
// //   const isSearchValid = searchQuery.trim().length > 1;

// //   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

// //   const handleFindMentors = (e) => {
// //     e.preventDefault();
// //     if (!isSearchValid) return;
// //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// //   };

// //   return (
// //     <>
// //       <Preloader />
// //       {/* Hero Section — fills width, padding scales with screen */}
// //       <div className="bg-[#f6fafc] w-full">
// //         <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-20 sm:pt-14 md:pt-18 lg:pt-20 pb-10 sm:pb-14 lg:pb-18 text-center">

// //           {/* Heading — scales from mobile to 4K */}
// //           <motion.h1
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.1}
// //             variants={fadeUp}
// //             className="text-[clamp(2rem,6vw,6rem)] font-bold text-[#0a1a22] mb-4 md:mb-6 leading-tight tracking-tight"
// //           >
// //             Connect with{" "}
// //             <span className="text-[#0098cc]">Expert Mentors</span>
// //           </motion.h1>

// //           {/* Subtitle */}
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.2}
// //             variants={fadeUp}
// //             className="text-[clamp(1rem,2.2vw,2rem)] text-gray-600 mb-3 sm:mb-4"
// //           >
// //             Accelerate Your Growth in{" "}
// //             <span className="font-semibold text-[#0098cc] inline-flex items-center">
// //               <span className="min-w-[100px] sm:min-w-[160px] xl:min-w-[220px] text-left">
// //                 {displayedText || "Tech"}
// //               </span>
// //               <span className="animate-pulse ml-0.5">|</span>
// //             </span>
// //           </motion.div>

// //           {/* Description */}
// //           <motion.p
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.3}
// //             variants={fadeUp}
// //             className="text-[clamp(0.85rem,1.4vw,1.2rem)] text-gray-500 mb-8 md:mb-10 max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed"
// //           >
// //             Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
// //           </motion.p>

// //           {/* Search Bar — width scales with container */}
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.4}
// //             variants={fadeUp}
// //             className="w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-5 sm:mb-6"
// //           >
// //             <form onSubmit={handleFindMentors} className="relative">
// //               <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by skill, role, or industry..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-9 sm:pl-12 pr-[116px] sm:pr-[152px] lg:pr-[168px] py-3 sm:py-4 lg:py-5 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0098cc] border border-[#0098cc]/20 text-sm sm:text-base lg:text-lg transition-colors"
// //               />
// //               <button
// //                 type="submit"
// //                 disabled={!isSearchValid}
// //                 className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base border-none bg-[#2d2d4e] text-white hover:bg-[#2d2d4e]/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
// //               >
// //                 Find Mentors
// //                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
// //               </button>
// //             </form>

// //             {searchQuery.length > 0 && !isSearchValid && (
// //               <p className="text-xs sm:text-sm text-red-500 mt-2 text-left ml-3 sm:ml-5">
// //                 Please enter at least 2 characters to search
// //               </p>
// //             )}
// //           </motion.div>

// //           {/* Quick Links */}
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.5}
// //             variants={fadeUp}
// //             className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10"
// //           >
// //             <span className="text-xs sm:text-sm lg:text-base text-gray-500">Popular searches:</span>
// //             {QUICK_LINKS.map((link) => (
// //               <button
// //                 key={link}
// //                 onClick={() => handleQuickLinkClick(link)}
// //                 className="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-medium bg-white text-gray-700 hover:bg-[#f0faff] hover:text-[#0098cc] transition-colors duration-200 border border-[#0098cc]/20"
// //               >
// //                 {link}
// //               </button>
// //             ))}
// //           </motion.div>

// //           {/* Mentor Avatars */}
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             custom={0.6}
// //             variants={fadeUp}
// //             className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
// //           >
// //             <div className="flex -space-x-2 sm:-space-x-3 lg:-space-x-4">
// //               {MENTOR_PROFILES.map((profile, index) => (
// //                 <div key={index} className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14">
// //                   <motion.span
// //                     className="absolute inset-0 rounded-full bg-[#0098cc]/30"
// //                     animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
// //                     transition={{
// //                       duration: 2.4,
// //                       repeat: Infinity,
// //                       ease: "easeInOut",
// //                       delay: index * 0.3,
// //                     }}
// //                   />
// //                   <img
// //                     src={profile}
// //                     alt={`Mentor ${index + 1}`}
// //                     className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full border-2 sm:border-[3px] lg:border-4 border-[#f6fafc] hover:scale-110 transition-transform cursor-pointer object-cover"
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="text-center sm:text-left mt-1 sm:mt-0">
// //               <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#0a1a22]">10,000+ Expert Mentors</p>
// //               <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Ready to guide you</p>
// //             </div>
// //           </motion.div>

// //         </div>
// //       </div>

// //       {/* Other Sections */}
// //       <HeroSection />
// //       <StepsSection />
// //       <Testimonials />
// //       <TestimonialsSection />
// //       <FAQAccordion />
// //     </>
// //   );
// // };

// // export default Home;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Search, ArrowRight } from "lucide-react";

// import TestimonialsSection from './Testimonals';
// import FAQAccordion from './faqs';
// import HeroSection from './HeroSection ';
// import StepsSection from "./Stepsections";
// import Preloader from "./Preloader";
// import Testimonials from "./Testimonials";

// const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const isSearchValid = searchQuery.trim().length > 1;

//   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

//   const handleFindMentors = (e) => {
//     e.preventDefault();
//     if (!isSearchValid) return;
//     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//   };

//   return (
//     <>
//       <Preloader />
//       {/* Hero Section */}
//       <div className="bg-[#faf9f5] w-full">
//         <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 text-center">

//           {/* Badge */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             custom={0}
//             variants={fadeUp}
//             className="flex items-center justify-center gap-2 mb-6"
//           >
//             <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a1a22] text-[#ffffff] text-[10px]">
//               ↳
//             </span>
//             <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0a1a22] uppercase">
//               Welcome to Karrivo
//             </span>
//           </motion.div>

//           {/* Heading — matches reference image layout */}
//           <motion.h1
//             initial="hidden"
//             animate="visible"
//             custom={0.1}
//             variants={fadeUp}
//             className="text-[clamp(2.2rem,6.5vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight mb-6"
//           >
//             <span className="text-[#0a1a22]">Your Next Best</span>
//             <br className="hidden sm:block" />{" "}
//             <span className="text-[#0a1a22]">Mentor</span>{" "}
//             <span className="inline-flex items-center justify-center align-middle w-[0.85em] h-[0.85em] rounded-2xl bg-[#0098cc] mx-1">
//               <span className="text-[#ffffff] text-[0.45em]">↳</span>
//             </span>{" "}
//             <span className="text-gray-300">Decision</span>
//             <br />
//             <span className="text-gray-300">Starts Here</span>
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial="hidden"
//             animate="visible"
//             custom={0.2}
//             variants={fadeUp}
//             className="text-[clamp(0.85rem,1.4vw,1.15rem)] text-gray-500 mb-8 sm:mb-10 max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
//           >
//             Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
//           </motion.p>

//           {/* Search Bar */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             custom={0.3}
//             variants={fadeUp}
//             className="w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-5 sm:mb-6"
//           >
//             <form onSubmit={handleFindMentors} className="relative">
//               <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search by skill, role, or industry..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 sm:pl-12 pr-[116px] sm:pr-[152px] lg:pr-[168px] py-3 sm:py-4 lg:py-5 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffdf20] border border-gray-200 text-sm sm:text-base lg:text-lg transition-colors"
//               />
//               <button
//                 type="submit"
//                 disabled={!isSearchValid}
//                 className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base border-none bg-[#0a1a22] text-[#ffdf20] hover:bg-[#0a1a22]/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//               >
//                 Find Mentors
//                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
//               </button>
//             </form>

//             {searchQuery.length > 0 && !isSearchValid && (
//               <p className="text-xs sm:text-sm text-red-500 mt-2 text-left ml-3 sm:ml-5">
//                 Please enter at least 2 characters to search
//               </p>
//             )}
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             custom={0.4}
//             variants={fadeUp}
//             className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
//           >
//             <span className="text-xs sm:text-sm lg:text-base text-gray-500">Popular searches:</span>
//             {QUICK_LINKS.map((link) => (
//               <button
//                 key={link}
//                 onClick={() => handleQuickLinkClick(link)}
//                 className="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200"
//               >
//                 {link}
//               </button>
//             ))}
//           </motion.div>

//         </div>
//       </div>

//       {/* Other Sections */}
//       <HeroSection />
//       <StepsSection />
//       <Testimonials />
//       <TestimonialsSection />
//       <FAQAccordion />
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

import TestimonialsSection from './Testimonals';
import FAQAccordion from './faqs';
import HeroSection from './HeroSection ';
import StepsSection from "./Stepsections";
import Preloader from "./Preloader";
import Testimonials from "./Testimonials";

const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchValid = searchQuery.trim().length > 1;

  const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

  const handleFindMentors = (e) => {
    e.preventDefault();
    if (!isSearchValid) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <Preloader />
      {/* Hero Section — natural height on mobile, fills viewport on larger screens */}
      <div className="bg-[#faf9f5] w-full lg:h-screen flex items-center overflow-hidden">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-16 sm:py-10 lg:py-0 text-center">

          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a1a22] text-[#ffffff] text-[10px]">
              ↳
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0a1a22] uppercase">
              Welcome to Karrivo
            </span>
          </motion.div>

          {/* Heading — bigger and clearer */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="text-[clamp(2.4rem,7vw,5.8rem)] font-extrabold leading-[1.08] tracking-tight mb-5"
          >
            <span className="text-[#0a1a22]">Your Next Best</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-[#0a1a22]">Mentor</span>{" "}
            <span className="inline-flex items-center justify-center align-middle w-[0.85em] h-[0.85em] rounded-2xl bg-[#0098cc] mx-1">
              <span className="text-[#ffffff] text-[0.45em]">↳</span>
            </span>{" "}
            <span className="text-[#0a1a22]/40">Decision</span>
            <br />
            <span className="text-[#0a1a22]/40">Starts Here</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="text-[clamp(0.9rem,1.3vw,1.1rem)] text-gray-500 mb-7 max-w-[90%] sm:max-w-lg md:max-w-xl mx-auto leading-relaxed"
          >
            Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="w-full max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-5"
          >
            <form onSubmit={handleFindMentors} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by skill, role, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-[110px] sm:pr-[130px] py-3 sm:py-3.5 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a1a22] border border-gray-200 text-sm sm:text-base transition-colors"
              />
              <button
                type="submit"
                disabled={!isSearchValid}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium  duration-200 flex items-center gap-1.5 text-xs sm:text-sm border-none bg-[#0a1a22] text-[#ffffff]   whitespace-nowrap"
              >
                Find Mentors
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {searchQuery.length > 0 && !isSearchValid && (
              <p className="text-xs text-red-500 mt-2 text-left ml-4">
                Please enter at least 2 characters to search
              </p>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs sm:text-sm text-gray-500">Popular searches:</span>
            {QUICK_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleQuickLinkClick(link)}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200"
              >
                {link}
              </button>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Other Sections */}
      <HeroSection />
      <StepsSection />
      <Testimonials />
      <TestimonialsSection />
      <FAQAccordion />
    </>
  );
};

export default Home;

