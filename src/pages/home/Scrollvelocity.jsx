// import React, { useRef, useEffect, useState } from 'react';
// import gsap from 'gsap';
// // Import the motion object to use motion.div, motion.button, etc.
// import { motion } from "framer-motion";

// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useNavigate } from 'react-router-dom';

// gsap.registerPlugin(ScrollTrigger);

// const MentoHero = () => {
//     const containerRef = useRef(null);
//     const text1Ref = useRef(null);
//     const text2Ref = useRef(null);
//     const text3Ref = useRef(null);
//     const videoRef = useRef(null);
//     const [setVideoLoaded] = useState(false);
//     const navigate = useNavigate()



//     // GSAP Scroll Animations
//     useEffect(() => {
//         const initTimer = setTimeout(() => {
//             const ctx = gsap.context(() => {
//                 if (text1Ref.current && text2Ref.current && text3Ref.current) {
//                     gsap.set(text1Ref.current, { x: "0%" });
//                     gsap.set(text2Ref.current, { x: "-10%" });
//                     gsap.set(text3Ref.current, { x: "0%" });

//                     gsap.to(text1Ref.current, {
//                         x: "-50%",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: containerRef.current,
//                             start: "top bottom",
//                             end: "bottom top",
//                             scrub: 2,
//                             invalidateOnRefresh: true,
//                         },
//                     });

//                     gsap.to(text2Ref.current, {
//                         x: "50%",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: containerRef.current,
//                             start: "top bottom",
//                             end: "bottom top",
//                             scrub: 0.5,
//                             invalidateOnRefresh: true,
//                         },
//                     });

//                     gsap.to(text3Ref.current, {
//                         x: "-45%",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: containerRef.current,
//                             start: "top bottom",
//                             end: "bottom top",
//                             scrub: 1.5,
//                             invalidateOnRefresh: true,
//                         },
//                     });
//                 }
//             }, containerRef);

//             return () => ctx.revert();
//         }, 100);

//         return () => clearTimeout(initTimer);
//     }, []);

//     useEffect(() => {
//         const video = videoRef.current;
//         if (video) {
//             video.addEventListener("loadeddata", () => setVideoLoaded(true));
//         }
//     }, []);

//     return (
//         <section
//             ref={containerRef}
//             className="relative min-h-screen md:min-h-[120vh] overflow-hidden bg-[#062117]"
//         >
//             {/* Background Video */}
//             <div className="absolute inset-0 w-full h-full">
//                 <video
//                     ref={videoRef}
//                     className="absolute inset-0 w-full h-full object-cover opacity-30"
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                     poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23062117' width='1920' height='1080'/%3E%3C/svg%3E"
//                 >
//                     <source
//                         src="https://cdn.pixabay.com/video/2023/05/02/160735-822169526_large.mp4"
//                         type="video/mp4"
//                     />
//                 </video>

//                 {/* Dark overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-[#062117]/95 via-[#062117]/90 to-[#062117]/95"></div>
//             </div>

//             {/* Animated grid overlay */}
//             <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
//                 <div
//                     className="h-full w-full"
//                     style={{
//                         backgroundImage: `linear-gradient(rgba(0, 152, 204, 0.8) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(0, 152, 204, 0.8) 1px, transparent 1px)`,
//                         backgroundSize: "60px 60px",
//                     }}
//                 ></div>
//             </div>

//             <div className="sticky top-0 h-screen w-full overflow-hidden">
//                 <div className="h-full flex flex-col justify-between py-2 md:py-4">
//                     {/* First scrolling text */}
//                     <div className="relative flex-shrink-0">
//                         <div className="overflow-hidden">
//                             <div
//                                 ref={text1Ref}
//                                 className="flex whitespace-nowrap"
//                                 style={{ willChange: "transform" }}
//                             >
//                                 {[...Array(20)].map((_, i) => (
//                                     <div key={i} className="flex items-center">
//                                         <span className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-semibold text-[#0098cc]/15 mx-3 md:mx-6">
//                                             Transform Your Career with Expert Mentorship • Learn from Industry Leaders
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Center content */}
//                     <div className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 my-4 md:my-8">
//                         <div className="text-center max-w-6xl mx-auto w-full">
//                             {/* Platform Badge */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6 }}
//                                 className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#0098cc]/10 backdrop-blur-xl border border-[#0098cc]/40 mb-4 md:mb-6 "
//                             >
//                                 <span className="text-white font-bold text-xs md:text-sm lg:text-base uppercase tracking-wider">
//                                     Professional Mentorship Platform
//                                 </span>
//                             </motion.div>

//                             {/* Main Heading */}
//                             <motion.h1
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 0.2 }}
//                                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight px-2"
//                             >
//                                 <span className="block text-white drop-shadow-2xl mb-2">
//                                     Connect, Learn & Grow
//                                 </span>
//                                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0098cc] to-[#00c4ff] drop-shadow-lg">
//                                     With Expert Mentors
//                                 </span>
//                             </motion.h1>

//                             {/* Subtitle */}
//                             <motion.p
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.4 }}
//                                 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed font-light px-2"
//                             >
//                                 Join India's leading mentorship platform.{" "}
//                                 <span className="text-[#0098cc] font-semibold">Connect</span> with experienced professionals,{" "}
//                                 <span className="text-[#0098cc] font-semibold">learn</span> industry insights, and{" "}
//                                 <span className="text-[#0098cc] font-semibold">accelerate</span> your career growth.
//                             </motion.p>

//                             {/* CTA Buttons */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.6 }}
//                                 className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-2"
//                             >
//                                 <button className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-bold rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-[#0098cc]/30 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
//                                     onClick={() => navigate("/login")}
//                                 >
//                                     Find a Mentor
//                                     <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
//                                 </button>
//                                 <button
//                                     onClick={() => navigate("/mentee/apply")}
//                                     className="px-6 md:px-8 py-3 md:py-4 bg-[#0098cc]/10 backdrop-blur-xl border-2 border-[#0098cc]/40 text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#0098cc]/20 hover:border-[#0098cc]/60 transition-all duration-300 text-sm md:text-base">
//                                     Become a Mentor
//                                 </button>
//                             </motion.div>

//                             {/* Stats Grid */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.8 }}
//                                 className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2"
//                             >

//                             </motion.div>

//                             {/* Additional Info */}
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 0.6, delay: 1 }}
//                                 className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400 px-2"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
//                                     <span>1-on-1 Sessions</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
//                                     <span>Industry Experts</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
//                                     <span>Career Guidance</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
//                                     <span>24/7 Support</span>
//                                 </div>
//                             </motion.div>
//                         </div>
//                     </div>

//                     {/* Third scrolling text */}
//                     <div className="relative flex-shrink-0">
//                         <div className="overflow-hidden">
//                             <div
//                                 ref={text3Ref}
//                                 className="flex whitespace-nowrap"
//                                 style={{ willChange: "transform" }}
//                             >
//                                 {[...Array(20)].map((_, i) => (
//                                     <div key={i} className="flex items-center">
//                                         <span className="text-xs sm:text-base md:text-xl lg:text-3xl font-medium text-[#0098cc]/15 mx-3 md:mx-6">
//                                             Your Success Story Starts Here • Book Your First Session Today
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default MentoHero;



import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MentoHero() {

  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#062117' }}>
      {/* Decorative curved lines */}
      <svg className="absolute top-10 left-20 opacity-40" width="200" height="150" viewBox="0 0 200 150">
        <path
          d="M 10 75 Q 50 25, 100 75 T 190 75"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      <svg className="absolute top-20 right-10 opacity-40" width="300" height="200" viewBox="0 0 300 200">
        <path
          d="M 20 100 Q 80 30, 150 100 T 280 100"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      <svg className="absolute bottom-40 left-1/3 opacity-40" width="250" height="180" viewBox="0 0 250 180">
        <path
          d="M 10 90 Q 70 20, 130 90 T 240 90"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
          
          {/* Left Column - Small intro text */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <p className="text-white text-sm sm:text-base">
                We are <span className="font-semibold">GrowthMentor</span>,
              </p>
              <p className="text-white text-sm sm:text-base">
                a <span style={{ color: '#0098cc' }}>mentorship platform</span>, connecting
              </p>
              <p className="text-white text-sm sm:text-base">
                and empowering professionals
              </p>
              <p className="text-white text-sm sm:text-base">
                worldwide.
              </p>
            </div>
          </div>

          {/* Center Column - Large headline */}
          <div className="lg:col-span-6 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              Growth
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              through
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight relative inline-block">
              mentorship.
              {/* Curved underline */}
              <svg 
                className="absolute -bottom-4 left-0 w-full" 
                height="30" 
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M 10 15 Q 200 5, 390 15"
                  fill="none"
                  stroke="#0098cc"
                  strokeWidth="3"
                />
              </svg>
            </h1>
          </div>

          {/* Right Column - Description text */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We believe no one should navigate their career alone.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                At a software studio, we're only as good as our ability to help others succeed. We offer unlimited mentorship sessions to accelerate your growth.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            className="px-8 py-4 rounded-full border-2 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
            style={{ borderColor: '#0098cc' }}
            onClick={() => navigate("/top")}
          >
            Browse mentors
          </button>
          <button 
            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: '#0098cc', color: 'white' }}
           onClick={() => navigate("/login")}
          >
            Get started free
          </button>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div 
        className="absolute bottom-10 right-20 w-3 h-3 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
      <div 
        className="absolute top-1/3 left-10 w-2 h-2 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
    </div>
  );
}