

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { motion } from "framer-motion";
// // // import { Search, ArrowRight } from "lucide-react";

// // // import TestimonialsSection from './Testimonals';
// // // import FAQAccordion from './faqs';
// // // import HeroSection from './HeroSection ';
// // // import StepsSection from "./Stepsections";
// // // import Preloader from "./Preloader";
// // // import Testimonials from "./Testimonials";

// // // const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// // // const fadeUp = {
// // //   hidden: { opacity: 0, y: 24 },
// // //   visible: (delay = 0) => ({
// // //     opacity: 1,
// // //     y: 0,
// // //     transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
// // //   }),
// // // };

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const isSearchValid = searchQuery.trim().length > 1;

// // //   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

// // //   const handleFindMentors = (e) => {
// // //     e.preventDefault();
// // //     if (!isSearchValid) return;
// // //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// // //   };

// // //   return (
// // //     <>
// // //       <Preloader />
// // //       {/* Hero Section — natural height on mobile, fills viewport on larger screens */}
// // //       <div className="bg-[#faf9f5] w-full lg:h-screen flex items-center overflow-hidden">
// // //         <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-16 sm:py-10 lg:py-0 text-center">

// // //           {/* Badge */}
// // //           <motion.div
// // //             initial="hidden"
// // //             animate="visible"
// // //             custom={0}
// // //             variants={fadeUp}
// // //             className="flex items-center justify-center gap-2 mb-5"
// // //           >
// // //             <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a1a22] text-[#ffffff] text-[10px]">
// // //               ↳
// // //             </span>
// // //             <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0a1a22] uppercase">
// // //               Welcome to Karrivo
// // //             </span>
// // //           </motion.div>

// // //           {/* Heading — bigger and clearer */}
// // //           <motion.h1
// // //             initial="hidden"
// // //             animate="visible"
// // //             custom={0.1}
// // //             variants={fadeUp}
// // //             className="text-[clamp(2.4rem,7vw,5.8rem)] font-extrabold leading-[1.08] tracking-tight mb-5"
// // //           >
// // //             <span className="text-[#0a1a22]">Your Next Best</span>
// // //             <br className="hidden sm:block" />{" "}
// // //             <span className="text-[#0a1a22]">Mentor</span>{" "}
// // //             <span className="inline-flex items-center justify-center align-middle w-[0.85em] h-[0.85em] rounded-2xl bg-[#0098cc] mx-1">
// // //               <span className="text-[#ffffff] text-[0.45em]">↳</span>
// // //             </span>{" "}
// // //             <span className="text-[#0a1a22]/40">Decision</span>
// // //             <br />
// // //             <span className="text-[#0a1a22]/40">Starts Here</span>
// // //           </motion.h1>

// // //           {/* Subtitle */}
// // //           <motion.p
// // //             initial="hidden"
// // //             animate="visible"
// // //             custom={0.2}
// // //             variants={fadeUp}
// // //             className="text-[clamp(0.9rem,1.3vw,1.1rem)] text-gray-500 mb-7 max-w-[90%] sm:max-w-lg md:max-w-xl mx-auto leading-relaxed"
// // //           >
// // //             Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
// // //           </motion.p>

// // //           {/* Search Bar */}
// // //           <motion.div
// // //             initial="hidden"
// // //             animate="visible"
// // //             custom={0.3}
// // //             variants={fadeUp}
// // //             className="w-full max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-5"
// // //           >
// // //             <form onSubmit={handleFindMentors} className="relative">
// // //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search by skill, role, or industry..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-full pl-11 pr-[110px] sm:pr-[130px] py-3 sm:py-3.5 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a1a22] border border-gray-200 text-sm sm:text-base transition-colors"
// // //               />
// // //               <button
// // //                 type="submit"
// // //                 disabled={!isSearchValid}
// // //                 className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium  duration-200 flex items-center gap-1.5 text-xs sm:text-sm border-none bg-[#0a1a22] text-[#ffffff]   whitespace-nowrap"
// // //               >
// // //                 Find Mentors
// // //                 <ArrowRight className="w-3.5 h-3.5" />
// // //               </button>
// // //             </form>

// // //             {searchQuery.length > 0 && !isSearchValid && (
// // //               <p className="text-xs text-red-500 mt-2 text-left ml-4">
// // //                 Please enter at least 2 characters to search
// // //               </p>
// // //             )}
// // //           </motion.div>

// // //           {/* Quick Links */}
// // //           <motion.div
// // //             initial="hidden"
// // //             animate="visible"
// // //             custom={0.4}
// // //             variants={fadeUp}
// // //             className="flex flex-wrap items-center justify-center gap-2"
// // //           >
// // //             <span className="text-xs sm:text-sm text-gray-500">Popular searches:</span>
// // //             {QUICK_LINKS.map((link) => (
// // //               <button
// // //                 key={link}
// // //                 onClick={() => handleQuickLinkClick(link)}
// // //                 className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200"
// // //               >
// // //                 {link}
// // //               </button>
// // //             ))}
// // //           </motion.div>

// // //         </div>
// // //       </div>

// // //       {/* Other Sections */}
// // //       <HeroSection />
// // //       <StepsSection />
// // //       <Testimonials />
// // //       <TestimonialsSection />
// // //       <FAQAccordion />
// // //     </>
// // //   );
// // // };

// // // export default Home;


// // import React, { useId, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion, useReducedMotion } from "framer-motion";
// // import { Search, ArrowRight, Star } from "lucide-react";

// // import TestimonialsSection from './Testimonals';
// // import FAQAccordion from './faqs';
// // import HeroSection from './HeroSection ';
// // import StepsSection from "./Stepsections";
// // import Preloader from "./Preloader";
// // import Testimonials from "./Testimonials";

// // const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// // const MENTOR_PHOTO = {
// //   src: "https://images.unsplash.com/photo-1561346745-5db62ae43861?fm=jpg&q=80&w=900&auto=format&fit=crop",
// //   alt: "A mentor sitting beside a student, pointing at a laptop screen while explaining a concept",
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
// //   const prefersReducedMotion = useReducedMotion();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const isSearchValid = searchQuery.trim().length > 1;
// //   const showError = searchQuery.length > 0 && !isSearchValid;
// //   const searchInputId = useId();
// //   const searchErrorId = useId();

// //   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

// //   const handleFindMentors = (e) => {
// //     e.preventDefault();
// //     if (!isSearchValid) return;
// //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// //   };

// //   // Respect prefers-reduced-motion: swap animated variants for a static, already-visible state.
// //   const motionProps = (delay) =>
// //     prefersReducedMotion
// //       ? { initial: "visible", animate: "visible", custom: delay, variants: fadeUp }
// //       : { initial: "hidden", animate: "visible", custom: delay, variants: fadeUp };

// //   return (
// //     <>
// //       <Preloader />

// //       <header className="bg-[#faf9f5] w-full overflow-hidden">
// //         <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 lg:py-16">
// //           <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

// //             {/* Left column — copy, search, quick links */}
// //             <div className="text-center lg:text-left">
// //               <motion.div
// //                 {...motionProps(0)}
// //                 className="flex items-center justify-center lg:justify-start gap-2 mb-4"
// //               >
// //                 <span
// //                   aria-hidden="true"
// //                   className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a1a22] text-white text-[10px]"
// //                 >
// //                   ↳
// //                 </span>
// //                 <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0a1a22] uppercase">
// //                   Welcome to Karrivo
// //                 </span>
// //               </motion.div>

// //               <motion.h1
// //                 {...motionProps(0.1)}
// //                 className="text-[clamp(1.9rem,4.6vw,3.4rem)] font-extrabold leading-[1.1] tracking-tight mb-4"
// //               >
// //                 <span className="text-[#0a1a22]">You Are the</span>{" "}
// //                 <span className="relative inline-block text-[#0a1a22]">
// //                   Next Big Thing
// //                   <svg
// //                     aria-hidden="true"
// //                     viewBox="0 0 300 24"
// //                     className="absolute left-0 -bottom-1 w-full h-3 text-[#0098cc]"
// //                     preserveAspectRatio="none"
// //                   >
// //                     <path d="M2 18 Q150 2 298 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
// //                   </svg>
// //                 </span>
// //                 <br className="hidden sm:block" />
// //                 <span className="text-[#0a1a22]/40">Your Mentor Is Right Here</span>
// //               </motion.h1>

// //               <motion.p
// //                 {...motionProps(0.2)}
// //                 className="text-[clamp(0.9rem,1.1vw,1.05rem)] text-gray-600 mb-6 max-w-[95%] sm:max-w-lg lg:max-w-none mx-auto lg:mx-0 leading-relaxed"
// //               >
// //                 Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
// //               </motion.p>

// //               <motion.div {...motionProps(0.3)} className="w-full max-w-[95%] sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0 mb-5">
// //                 <form onSubmit={handleFindMentors} className="relative" role="search">
// //                   <label htmlFor={searchInputId} className="sr-only">
// //                     Search by skill, role, or industry
// //                   </label>
// //                   <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
// //                   <input
// //                     id={searchInputId}
// //                     type="search"
// //                     placeholder="Search by skill, role, or industry..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     aria-invalid={showError}
// //                     aria-describedby={showError ? searchErrorId : undefined}
// //                     className="w-full pl-10 pr-[104px] sm:pr-[128px] py-3 sm:py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
// //                   />
// //                   <button
// //                     type="submit"
// //                     disabled={!isSearchValid}
// //                     className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-medium flex items-center gap-1.5 text-xs sm:text-sm border-none bg-[#0a1a22] text-white whitespace-nowrap transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2"
// //                   >
// //                     <span className="hidden xs:inline">Find Mentors</span>
// //                     <span className="xs:hidden">Search</span>
// //                     <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
// //                   </button>
// //                 </form>

// //                 <p
// //                   id={searchErrorId}
// //                   role="status"
// //                   aria-live="polite"
// //                   className={`text-xs text-red-600 mt-2 text-left ml-4 ${showError ? "" : "sr-only"}`}
// //                 >
// //                   Please enter at least 2 characters to search.
// //                 </p>
// //               </motion.div>

// //               <motion.div {...motionProps(0.4)} className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
// //                 <span className="text-xs sm:text-sm text-gray-500">Popular searches:</span>
// //                 {QUICK_LINKS.map((link) => (
// //                   <button
// //                     key={link}
// //                     type="button"
// //                     onClick={() => handleQuickLinkClick(link)}
// //                     className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
// //                   >
// //                     {link}
// //                   </button>
// //                 ))}
// //               </motion.div>
// //             </div>

// //             {/* Right column — mentor photo */}
// //             <motion.div {...motionProps(0.25)} className="relative mx-auto w-full max-w-[320px] lg:max-w-[380px]">
// //               <div
// //                 aria-hidden="true"
// //                 className="absolute -inset-3 sm:-inset-4 rounded-[2rem] bg-[#0098cc]/15 -rotate-3"
// //               />
// //               <div className="relative rounded-[1.5rem] overflow-hidden shadow-lg aspect-[4/5]">
// //                 <img
// //                   src={MENTOR_PHOTO.src}
// //                   alt={MENTOR_PHOTO.alt}
// //                   width="900"
// //                   height="1125"
// //                   loading="eager"
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>

// //               <div className="absolute -bottom-4 left-3 right-3 sm:left-4 sm:right-auto sm:w-52 bg-white rounded-xl shadow-md px-3 py-2.5 flex items-center gap-2.5">
// //                 <div aria-hidden="true" className="flex items-center gap-0.5 text-[#0098cc] shrink-0">
// //                   <Star className="w-3.5 h-3.5 fill-current" />
// //                   <Star className="w-3.5 h-3.5 fill-current" />
// //                   <Star className="w-3.5 h-3.5 fill-current" />
// //                   <Star className="w-3.5 h-3.5 fill-current" />
// //                   <Star className="w-3.5 h-3.5 fill-current" />
// //                 </div>
// //                 <p className="text-[11px] sm:text-xs text-gray-700 leading-snug">
// //                   <span className="font-semibold text-[#0a1a22]">4.9/5</span> from over 2,000 mentees
// //                 </p>
// //               </div>
// //             </motion.div>

// //           </div>
// //         </div>
// //       </header>

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




// // import React, { useId, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion, useReducedMotion } from "framer-motion";
// // import { Search, ArrowRight, Sparkles } from "lucide-react";

// // import TestimonialsSection from './Testimonals';
// // import FAQAccordion from './faqs';
// // import HeroSection from './HeroSection ';
// // import StepsSection from "./Stepsections";
// // import Preloader from "./Preloader";
// // import Testimonials from "./Testimonials";

// // const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// // // Collage photos, arranged clockwise from top-left to match the mosaic layout below.
// // const COLLAGE_PHOTOS = [
// //   {
// //     src: "https://images.unsplash.com/photo-1561346745-5db62ae43861?fm=jpg&q=80&w=700&auto=format&fit=crop",
// //     alt: "A mentor pointing at a laptop screen while explaining a concept to a student",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1758691737246-95bf8f09a997?fm=jpg&q=80&w=700&auto=format&fit=crop",
// //     alt: "Two colleagues talking and reviewing work together at a desk",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?fm=jpg&q=80&w=700&auto=format&fit=crop",
// //     alt: "A small group pointing at a laptop screen while collaborating in an office",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1758599543148-95379e3fcf18?fm=jpg&q=80&w=700&auto=format&fit=crop",
// //     alt: "Coworkers discussing notes on a tablet outside an office building",
// //   },
// // ];

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
// //   const prefersReducedMotion = useReducedMotion();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const isSearchValid = searchQuery.trim().length > 1;
// //   const showError = searchQuery.length > 0 && !isSearchValid;
// //   const searchInputId = useId();
// //   const searchErrorId = useId();

// //   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

// //   const handleFindMentors = (e) => {
// //     e.preventDefault();
// //     if (!isSearchValid) return;
// //     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// //   };

// //   // Respect prefers-reduced-motion: swap animated variants for a static, already-visible state.
// //   const motionProps = (delay) =>
// //     prefersReducedMotion
// //       ? { initial: "visible", animate: "visible", custom: delay, variants: fadeUp }
// //       : { initial: "hidden", animate: "visible", custom: delay, variants: fadeUp };

// //   return (
// //     <>
// //       <Preloader />

// //       <header className="bg-[#faf9f5] w-full overflow-hidden relative mt-[40px] md:h-screen md:flex md:items-center">
// //         {/* Decorative dot clusters */}
// //         <svg aria-hidden="true" className="hidden md:block absolute top-8 right-10 w-28 h-20 text-[#0a1a22]/10" viewBox="0 0 100 60">
// //           {Array.from({ length: 24 }).map((_, i) => (
// //             <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
// //           ))}
// //         </svg>
// //         <svg aria-hidden="true" className="hidden md:block absolute bottom-6 left-10 w-24 h-16 text-[#0a1a22]/10" viewBox="0 0 100 60">
// //           {Array.from({ length: 18 }).map((_, i) => (
// //             <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
// //           ))}
// //         </svg>

// //         <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-8 relative">
// //           <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 sm:gap-8 lg:gap-14 items-center w-full">

// //             {/* Left column — photo collage */}
// //             <motion.div {...motionProps(0.15)} className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px]">
// //               <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
// //                 <div className="flex flex-col gap-2.5 sm:gap-3 pt-6 sm:pt-7">
// //                   <div className="rounded-tl-[24px] rounded-br-[24px] overflow-hidden shadow-md aspect-[4/5]">
// //                     <img
// //                       src={COLLAGE_PHOTOS[0].src}
// //                       alt={COLLAGE_PHOTOS[0].alt}
// //                       loading="eager"
// //                       className="w-full h-full object-cover grayscale"
// //                     />
// //                   </div>
// //                   <div className="rounded-bl-[24px] rounded-tr-[24px] overflow-hidden shadow-md aspect-square">
// //                     <img
// //                       src={COLLAGE_PHOTOS[1].src}
// //                       alt={COLLAGE_PHOTOS[1].alt}
// //                       loading="lazy"
// //                       className="w-full h-full object-cover grayscale"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="flex flex-col gap-2.5 sm:gap-3">
// //                   <div className="rounded-tr-[24px] rounded-bl-[24px] overflow-hidden shadow-md aspect-square">
// //                     <img
// //                       src={COLLAGE_PHOTOS[2].src}
// //                       alt={COLLAGE_PHOTOS[2].alt}
// //                       loading="lazy"
// //                       className="w-full h-full object-cover grayscale"
// //                     />
// //                   </div>
// //                   <div className="rounded-br-[24px] rounded-tl-[24px] overflow-hidden shadow-md aspect-[4/5]">
// //                     <img
// //                       src={COLLAGE_PHOTOS[3].src}
// //                       alt={COLLAGE_PHOTOS[3].alt}
// //                       loading="lazy"
// //                       className="w-full h-full object-cover grayscale"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Rotating circular badge */}
// //               <div className="absolute -bottom-6 -left-3 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 z-10">
// //                 <svg
// //                   viewBox="0 0 100 100"
// //                   aria-hidden="true"
// //                   className="w-full h-full animate-spin"
// //                   style={{
// //                     animationDuration: "16s",
// //                     animationPlayState: prefersReducedMotion ? "paused" : "running",
// //                   }}
// //                 >
// //                   <defs>
// //                     <path id="badgeCirclePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
// //                   </defs>
// //                   <circle cx="50" cy="50" r="49" fill="#0a1a22" />
// //                   <text fill="#ffffff" fontSize="8" letterSpacing="2" fontWeight="600">
// //                     <textPath href="#badgeCirclePath" startOffset="0%">
// //                       TOP RATED MENTORS • VERIFIED EXPERTS •
// //                     </textPath>
// //                   </text>
// //                 </svg>
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0098cc] flex items-center justify-center" aria-hidden="true">
// //                     <ArrowRight className="w-3.5 h-3.5 text-white" />
// //                   </span>
// //                 </div>
// //                 <span className="sr-only">Top rated, verified mentors</span>
// //               </div>

// //               <Sparkles aria-hidden="true" className="absolute -bottom-2 -right-2 sm:-right-3 w-7 h-7 sm:w-8 sm:h-8 text-[#0098cc]" />
// //               <Sparkles aria-hidden="true" className="absolute top-1/3 -right-2.5 sm:-right-4 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0098cc]/60" />
// //             </motion.div>

// //             {/* Right column — copy, search, quick links */}
// //             <div className="text-center lg:text-left">
// //               <motion.div
// //                 {...motionProps(0)}
// //                 className="flex items-center justify-center lg:justify-start gap-2 mb-3"
// //               >
// //                 <span
// //                   aria-hidden="true"
// //                   className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a1a22] text-white text-[10px]"
// //                 >
// //                   ↳
// //                 </span>
// //                 <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0a1a22] uppercase">
// //                   Welcome to Karrivo
// //                 </span>
// //               </motion.div>

// //               <motion.h1
// //                 {...motionProps(0.1)}
// //                 className="text-[clamp(1.7rem,4vw,3rem)] font-extrabold leading-[1.12] tracking-tight mb-4"
// //               >
// //                 <span className="text-[#0a1a22]">You Are the</span>{" "}
// //                 <span className="relative inline-block text-[#0a1a22]">
// //                   Next Big Thing
// //                   <svg
// //                     aria-hidden="true"
// //                     viewBox="0 0 300 24"
// //                     className="absolute left-0 -bottom-1 w-full h-3 text-[#0098cc]"
// //                     preserveAspectRatio="none"
// //                   >
// //                     <path d="M2 18 Q150 2 298 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
// //                   </svg>
// //                 </span>
// //                 <br className="hidden sm:block" />
// //                 <span className="text-[#0a1a22]/40">Your Mentor Is Right Here</span>
// //               </motion.h1>

// //               <motion.p
// //                 {...motionProps(0.2)}
// //                 className="text-[clamp(0.85rem,1.05vw,1rem)] text-gray-600 mb-5 max-w-[95%] sm:max-w-lg lg:max-w-none mx-auto lg:mx-0 leading-relaxed"
// //               >
// //                 Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
// //               </motion.p>

// //               <motion.div {...motionProps(0.3)} className="w-full max-w-[95%] sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0 mb-5">
// //                 <form onSubmit={handleFindMentors} className="relative" role="search">
// //                   <label htmlFor={searchInputId} className="sr-only">
// //                     Search by skill, role, or industry
// //                   </label>
// //                   <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
// //                   <input
// //                     id={searchInputId}
// //                     type="search"
// //                     placeholder="Search by skill, role, or industry..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     aria-invalid={showError}
// //                     aria-describedby={showError ? searchErrorId : undefined}
// //                     className="w-full pl-10 pr-[104px] sm:pr-[124px] py-3 sm:py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
// //                   />
// //                   <button
// //                     type="submit"
// //                     disabled={!isSearchValid}
// //                     className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-medium flex items-center gap-1.5 text-xs sm:text-sm border-none bg-[#0a1a22] text-white whitespace-nowrap transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2"
// //                   >
// //                     <span className="hidden xs:inline">Find Mentors</span>
// //                     <span className="xs:hidden">Search</span>
// //                     <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
// //                   </button>
// //                 </form>

// //                 <p
// //                   id={searchErrorId}
// //                   role="status"
// //                   aria-live="polite"
// //                   className={`text-xs text-red-600 mt-2 text-left ml-4 ${showError ? "" : "sr-only"}`}
// //                 >
// //                   Please enter at least 2 characters to search.
// //                 </p>
// //               </motion.div>

// //               <motion.div {...motionProps(0.4)} className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
// //                 <span className="text-xs sm:text-sm text-gray-500">Popular searches:</span>
// //                 {QUICK_LINKS.map((link) => (
// //                   <button
// //                     key={link}
// //                     type="button"
// //                     onClick={() => handleQuickLinkClick(link)}
// //                     className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
// //                   >
// //                     {link}
// //                   </button>
// //                 ))}
// //               </motion.div>
// //             </div>

// //           </div>
// //         </div>
// //       </header>

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

// import React, { useId, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, useReducedMotion } from "framer-motion";
// import { Search, ArrowRight, Sparkles } from "lucide-react";

// import TestimonialsSection from './Testimonals';
// import FAQAccordion from './faqs';
// import HeroSection from './HeroSection ';
// import StepsSection from "./Stepsections";
// import Preloader from "./Preloader";
// import Testimonials from "./Testimonials";

// const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// // Collage photos, arranged clockwise from top-left to match the mosaic layout below.
// const COLLAGE_PHOTOS = [
//   {
//     src: "https://images.unsplash.com/photo-1561346745-5db62ae43861?fm=jpg&q=80&w=700&auto=format&fit=crop",
//     alt: "A mentor pointing at a laptop screen while explaining a concept to a student",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1758691737246-95bf8f09a997?fm=jpg&q=80&w=700&auto=format&fit=crop",
//     alt: "Two colleagues talking and reviewing work together at a desk",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?fm=jpg&q=80&w=700&auto=format&fit=crop",
//     alt: "A small group pointing at a laptop screen while collaborating in an office",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1758599543148-95379e3fcf18?fm=jpg&q=80&w=700&auto=format&fit=crop",
//     alt: "Coworkers discussing notes on a tablet outside an office building",
//   },
// ];

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
//   const prefersReducedMotion = useReducedMotion();
//   const [searchQuery, setSearchQuery] = useState("");
//   const isSearchValid = searchQuery.trim().length > 1;
//   const showError = searchQuery.length > 0 && !isSearchValid;
//   const searchInputId = useId();
//   const searchErrorId = useId();

//   const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

//   const handleFindMentors = (e) => {
//     e.preventDefault();
//     if (!isSearchValid) return;
//     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//   };

//   // Respect prefers-reduced-motion: swap animated variants for a static, already-visible state.
//   const motionProps = (delay) =>
//     prefersReducedMotion
//       ? { initial: "visible", animate: "visible", custom: delay, variants: fadeUp }
//       : { initial: "hidden", animate: "visible", custom: delay, variants: fadeUp };

//   return (
//     <>
//       <Preloader />

//       <header className="bg-[#faf9f5] w-full overflow-hidden relative mt-[40px] md:min-h-screen md:flex md:items-center">
//         {/* Decorative dot clusters */}
//         <svg aria-hidden="true" className="hidden md:block absolute top-8 right-10 w-32 h-24 text-[#0a1a22]/10" viewBox="0 0 100 60">
//           {Array.from({ length: 24 }).map((_, i) => (
//             <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
//           ))}
//         </svg>
//         <svg aria-hidden="true" className="hidden md:block absolute bottom-6 left-10 w-28 h-20 text-[#0a1a22]/10" viewBox="0 0 100 60">
//           {Array.from({ length: 18 }).map((_, i) => (
//             <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
//           ))}
//         </svg>

//         <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-36 py-10 md:py-14 relative">
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 lg:gap-20 items-center w-full">

//             {/* Left column — photo collage */}
//             <motion.div {...motionProps(0.15)} className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px]">
//               <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                 <div className="flex flex-col gap-3 sm:gap-4 pt-8 sm:pt-9">
//                   <div className="rounded-tl-[28px] rounded-br-[28px] overflow-hidden shadow-md aspect-[4/5]">
//                     <img
//                       src={COLLAGE_PHOTOS[0].src}
//                       alt={COLLAGE_PHOTOS[0].alt}
//                       loading="eager"
//                       className="w-full h-full object-cover grayscale"
//                     />
//                   </div>
//                   <div className="rounded-bl-[28px] rounded-tr-[28px] overflow-hidden shadow-md aspect-square">
//                     <img
//                       src={COLLAGE_PHOTOS[1].src}
//                       alt={COLLAGE_PHOTOS[1].alt}
//                       loading="lazy"
//                       className="w-full h-full object-cover grayscale"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-3 sm:gap-4">
//                   <div className="rounded-tr-[28px] rounded-bl-[28px] overflow-hidden shadow-md aspect-square">
//                     <img
//                       src={COLLAGE_PHOTOS[2].src}
//                       alt={COLLAGE_PHOTOS[2].alt}
//                       loading="lazy"
//                       className="w-full h-full object-cover grayscale"
//                     />
//                   </div>
//                   <div className="rounded-br-[28px] rounded-tl-[28px] overflow-hidden shadow-md aspect-[4/5]">
//                     <img
//                       src={COLLAGE_PHOTOS[3].src}
//                       alt={COLLAGE_PHOTOS[3].alt}
//                       loading="lazy"
//                       className="w-full h-full object-cover grayscale"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Rotating circular badge */}
//               <div className="absolute -bottom-7 -left-4 sm:-left-8 w-24 h-24 sm:w-28 sm:h-28 z-10">
//                 <svg
//                   viewBox="0 0 100 100"
//                   aria-hidden="true"
//                   className="w-full h-full animate-spin"
//                   style={{
//                     animationDuration: "16s",
//                     animationPlayState: prefersReducedMotion ? "paused" : "running",
//                   }}
//                 >
//                   <defs>
//                     <path id="badgeCirclePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
//                   </defs>
//                   <circle cx="50" cy="50" r="49" fill="#0a1a22" />
//                   <text fill="#ffffff" fontSize="8" letterSpacing="2" fontWeight="600">
//                     <textPath href="#badgeCirclePath" startOffset="0%">
//                       TOP RATED MENTORS • VERIFIED EXPERTS •
//                     </textPath>
//                   </text>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0098cc] flex items-center justify-center" aria-hidden="true">
//                     <ArrowRight className="w-4 h-4 text-white" />
//                   </span>
//                 </div>
//                 <span className="sr-only">Top rated, verified mentors</span>
//               </div>

//               <Sparkles aria-hidden="true" className="absolute -bottom-2 -right-2 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 text-[#0098cc]" />
//               <Sparkles aria-hidden="true" className="absolute top-1/3 -right-3 sm:-right-5 w-4 h-4 sm:w-5 sm:h-5 text-[#0098cc]/60" />
//             </motion.div>

//             {/* Right column — copy, search, quick links */}
//             <div className="text-center lg:text-left">
//               <motion.div
//                 {...motionProps(0)}
//                 className="flex items-center justify-center lg:justify-start gap-2 mb-4"
//               >
//                 <span
//                   aria-hidden="true"
//                   className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0a1a22] text-white text-xs"
//                 >
//                   ↳
//                 </span>
//                 <span className="text-sm sm:text-base font-semibold tracking-wide text-[#0a1a22] uppercase">
//                   Welcome to Karrivo
//                 </span>
//               </motion.div>

//               <motion.h1
//                 {...motionProps(0.1)}
//                 className="text-[clamp(2.1rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight mb-5"
//               >
//                 <span className="text-[#0a1a22]">You Are the</span>{" "}
//                 <span className="relative inline-block text-[#0a1a22]">
//                   Next Big Thing
//                   <svg
//                     aria-hidden="true"
//                     viewBox="0 0 300 24"
//                     className="absolute left-0 -bottom-1 w-full h-3.5 text-[#0098cc]"
//                     preserveAspectRatio="none"
//                   >
//                     <path d="M2 18 Q150 2 298 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
//                   </svg>
//                 </span>
//                 <br className="hidden sm:block" />
//                 <span className="text-[#0a1a22]/40">Your Mentor Is Right Here</span>
//               </motion.h1>

//               <motion.p
//                 {...motionProps(0.2)}
//                 className="text-[clamp(1rem,1.3vw,1.2rem)] text-gray-600 mb-6 max-w-[95%] sm:max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed"
//               >
//                 Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
//               </motion.p>

//               <motion.div {...motionProps(0.3)} className="w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mb-6">
//                 <form onSubmit={handleFindMentors} className="relative" role="search">
//                   <label htmlFor={searchInputId} className="sr-only">
//                     Search by skill, role, or industry
//                   </label>
//                   <Search aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                   <input
//                     id={searchInputId}
//                     type="search"
//                     placeholder="Search by skill, role, or industry..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     aria-invalid={showError}
//                     aria-describedby={showError ? searchErrorId : undefined}
//                     className="w-full pl-12 pr-[120px] sm:pr-[144px] py-4 sm:py-4.5 rounded-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!isSearchValid}
//                     className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-medium flex items-center gap-2 text-sm sm:text-base border-none bg-[#0a1a22] text-white whitespace-nowrap transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2"
//                   >
//                     <span className="hidden xs:inline">Find Mentors</span>
//                     <span className="xs:hidden">Search</span>
//                     <ArrowRight aria-hidden="true" className="w-4 h-4" />
//                   </button>
//                 </form>

//                 <p
//                   id={searchErrorId}
//                   role="status"
//                   aria-live="polite"
//                   className={`text-xs text-red-600 mt-2 text-left ml-4 ${showError ? "" : "sr-only"}`}
//                 >
//                   Please enter at least 2 characters to search.
//                 </p>
//               </motion.div>

//               <motion.div {...motionProps(0.4)} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
//                 <span className="text-sm sm:text-base text-gray-500">Popular searches:</span>
//                 {QUICK_LINKS.map((link) => (
//                   <button
//                     key={link}
//                     type="button"
//                     onClick={() => handleQuickLinkClick(link)}
//                     className="px-4 py-2 rounded-full text-sm sm:text-base font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
//                   >
//                     {link}
//                   </button>
//                 ))}
//               </motion.div>
//             </div>

//           </div>
//         </div>
//       </header>

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






import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";

import TestimonialsSection from './Testimonals';
import FAQAccordion from './faqs';
import HeroSection from './HeroSection ';
import StepsSection from "./Stepsections";
import Preloader from "./Preloader";
import Testimonials from "./Testimonials";

const QUICK_LINKS = ["Engineering", "Startup", "Product", "Leadership", "AI Mentors"];

// Collage photos, arranged clockwise from top-left to match the mosaic layout below.
const COLLAGE_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1561346745-5db62ae43861?fm=jpg&q=80&w=700&auto=format&fit=crop",
    alt: "A mentor pointing at a laptop screen while explaining a concept to a student",
  },
  {
    src: "https://images.unsplash.com/photo-1758691737246-95bf8f09a997?fm=jpg&q=80&w=700&auto=format&fit=crop",
    alt: "Two colleagues talking and reviewing work together at a desk",
  },
  {
    src: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?fm=jpg&q=80&w=700&auto=format&fit=crop",
    alt: "A small group pointing at a laptop screen while collaborating in an office",
  },
  {
    src: "https://images.unsplash.com/photo-1758599543148-95379e3fcf18?fm=jpg&q=80&w=700&auto=format&fit=crop",
    alt: "Coworkers discussing notes on a tablet outside an office building",
  },
];

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
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchValid = searchQuery.trim().length > 1;
  const showError = searchQuery.length > 0 && !isSearchValid;
  const searchInputId = useId();
  const searchErrorId = useId();

  const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

  const handleFindMentors = (e) => {
    e.preventDefault();
    if (!isSearchValid) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Respect prefers-reduced-motion: swap animated variants for a static, already-visible state.
  const motionProps = (delay) =>
    prefersReducedMotion
      ? { initial: "visible", animate: "visible", custom: delay, variants: fadeUp }
      : { initial: "hidden", animate: "visible", custom: delay, variants: fadeUp };

  return (
    <>
      <Preloader />

      <header className="bg-[#faf9f5] w-full overflow-hidden relative mt-[40px] md:min-h-screen md:flex md:items-center">
        {/* Decorative dot clusters */}
        <svg aria-hidden="true" className="hidden md:block absolute top-8 right-10 w-32 h-24 text-[#0a1a22]/10" viewBox="0 0 100 60">
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
          ))}
        </svg>
        <svg aria-hidden="true" className="hidden md:block absolute bottom-6 left-10 w-28 h-20 text-[#0a1a22]/10" viewBox="0 0 100 60">
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 16 + 6} r="2" fill="currentColor" />
          ))}
        </svg>

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-36 py-10 md:py-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-10 lg:gap-20 items-center w-full">

            {/* Right column on desktop — photo collage */}
            <motion.div {...motionProps(0.15)} className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-3 sm:gap-4 pt-8 sm:pt-9">
                  <div className="rounded-tl-[28px] rounded-br-[28px] overflow-hidden shadow-md aspect-[4/5]">
                    <img
                      src={COLLAGE_PHOTOS[0].src}
                      alt={COLLAGE_PHOTOS[0].alt}
                      loading="eager"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="rounded-bl-[28px] rounded-tr-[28px] overflow-hidden shadow-md aspect-square">
                    <img
                      src={COLLAGE_PHOTOS[1].src}
                      alt={COLLAGE_PHOTOS[1].alt}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="rounded-tr-[28px] rounded-bl-[28px] overflow-hidden shadow-md aspect-square">
                    <img
                      src={COLLAGE_PHOTOS[2].src}
                      alt={COLLAGE_PHOTOS[2].alt}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="rounded-br-[28px] rounded-tl-[28px] overflow-hidden shadow-md aspect-[4/5]">
                    <img
                      src={COLLAGE_PHOTOS[3].src}
                      alt={COLLAGE_PHOTOS[3].alt}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
              </div>

              {/* Rotating circular badge */}
              <div className="absolute -bottom-7 -left-4 sm:-left-8 w-24 h-24 sm:w-28 sm:h-28 z-10">
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="w-full h-full animate-spin"
                  style={{
                    animationDuration: "16s",
                    animationPlayState: prefersReducedMotion ? "paused" : "running",
                  }}
                >
                  <defs>
                    <path id="badgeCirclePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <circle cx="50" cy="50" r="49" fill="#0a1a22" />
                  <text fill="#ffffff" fontSize="8" letterSpacing="2" fontWeight="600">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      TOP RATED MENTORS • VERIFIED EXPERTS •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0098cc] flex items-center justify-center" aria-hidden="true">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </div>
                <span className="sr-only">Top rated, verified mentors</span>
              </div>

              <Sparkles aria-hidden="true" className="absolute -bottom-2 -right-2 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 text-[#0098cc]" />
              <Sparkles aria-hidden="true" className="absolute top-1/3 -right-3 sm:-right-5 w-4 h-4 sm:w-5 sm:h-5 text-[#0098cc]/60" />
            </motion.div>

            {/* Left column on desktop — copy, search, quick links */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                {...motionProps(0)}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0a1a22] text-white text-xs"
                >
                  ↳
                </span>
                <span className="text-sm sm:text-base font-semibold tracking-wide text-[#0a1a22] uppercase">
                  Welcome to Karrivo
                </span>
              </motion.div>

              <motion.h1
                {...motionProps(0.1)}
                className="text-[clamp(2.1rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight mb-5"
              >
                <span className="text-[#0a1a22]">You Are the</span>{" "}
                <span className="relative inline-block text-[#0a1a22]">
                  Next Big Thing
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 24"
                    className="absolute left-0 -bottom-1 w-full h-3.5 text-[#0098cc]"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 18 Q150 2 298 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                <br className="hidden sm:block" />
                <span className="text-[#0a1a22]/40">Your Mentor Is Right Here</span>
              </motion.h1>

              <motion.p
                {...motionProps(0.2)}
                className="text-[clamp(1rem,1.3vw,1.2rem)] text-gray-600 mb-6 max-w-[95%] sm:max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed"
              >
                Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
              </motion.p>

              <motion.div {...motionProps(0.3)} className="w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 mb-6">
                <form onSubmit={handleFindMentors} className="relative" role="search">
                  <label htmlFor={searchInputId} className="sr-only">
                    Search by skill, role, or industry
                  </label>
                  <Search aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id={searchInputId}
                    type="search"
                    placeholder="Search by skill, role, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-invalid={showError}
                    aria-describedby={showError ? searchErrorId : undefined}
                    className="w-full pl-12 pr-[120px] sm:pr-[144px] py-4 sm:py-4.5 rounded-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
                  />
                  <button
                    type="submit"
                    disabled={!isSearchValid}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-medium flex items-center gap-2 text-sm sm:text-base border-none bg-[#0a1a22] text-white whitespace-nowrap transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2"
                  >
                    <span className="hidden xs:inline">Find Mentors</span>
                    <span className="xs:hidden">Search</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </button>
                </form>

                <p
                  id={searchErrorId}
                  role="status"
                  aria-live="polite"
                  className={`text-xs text-red-600 mt-2 text-left ml-4 ${showError ? "" : "sr-only"}`}
                >
                  Please enter at least 2 characters to search.
                </p>
              </motion.div>

              <motion.div {...motionProps(0.4)} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="text-sm sm:text-base text-gray-500">Popular searches:</span>
                {QUICK_LINKS.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleQuickLinkClick(link)}
                    className="px-4 py-2 rounded-full text-sm sm:text-base font-medium bg-white text-gray-700 hover:bg-[#fffbe6] hover:text-[#0a1a22] transition-colors duration-200 border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0098cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5]"
                  >
                    {link}
                  </button>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </header>

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




