// import { useRef, useLayoutEffect, useState } from 'react';
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useMotionValue,
//   useVelocity,
//   useAnimationFrame
// } from 'motion/react';

// function useElementWidth(ref) {
//   const [width, setWidth] = useState(0);

//   useLayoutEffect(() => {
//     function updateWidth() {
//       if (ref.current) {
//         setWidth(ref.current.offsetWidth);
//       }
//     }
//     updateWidth();
//     window.addEventListener('resize', updateWidth);
//     return () => window.removeEventListener('resize', updateWidth);
//   }, [ref]);

//   return width;
// }

// export const ScrollVelocity = ({
//   scrollContainerRef,
//   texts = [],
//   velocity = 100,
//   className = '',
//   damping = 50,
//   stiffness = 400,
//   numCopies = 6,
//   velocityMapping = { input: [0, 1000], output: [0, 5] },
//   parallaxClassName,
//   scrollerClassName,
//   parallaxStyle,
//   scrollerStyle
// }) => {
//   function VelocityText({
//     children,
//     baseVelocity = velocity,
//     scrollContainerRef,
//     className = '',
//     damping,
//     stiffness,
//     numCopies,
//     velocityMapping,
//     parallaxClassName,
//     scrollerClassName,
//     parallaxStyle,
//     scrollerStyle
//   }) {
//     const baseX = useMotionValue(0);
//     const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
//     const { scrollY } = useScroll(scrollOptions);
//     const scrollVelocity = useVelocity(scrollY);
//     const smoothVelocity = useSpring(scrollVelocity, {
//       damping: damping ?? 50,
//       stiffness: stiffness ?? 400
//     });
//     const velocityFactor = useTransform(
//       smoothVelocity,
//       velocityMapping?.input || [0, 1000],
//       velocityMapping?.output || [0, 5],
//       { clamp: false }
//     );

//     const copyRef = useRef(null);
//     const copyWidth = useElementWidth(copyRef);

//     function wrap(min, max, v) {
//       const range = max - min;
//       const mod = (((v - min) % range) + range) % range;
//       return mod + min;
//     }

//     const x = useTransform(baseX, v => {
//       if (copyWidth === 0) return '0px';
//       return `${wrap(-copyWidth, 0, v)}px`;
//     });

//     const directionFactor = useRef(1);
//     useAnimationFrame((t, delta) => {
//       let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

//       if (velocityFactor.get() < 0) {
//         directionFactor.current = -1;
//       } else if (velocityFactor.get() > 0) {
//         directionFactor.current = 1;
//       }

//       moveBy += directionFactor.current * moveBy * velocityFactor.get();
//       baseX.set(baseX.get() + moveBy);
//     });

//     const spans = [];
//     for (let i = 0; i < (numCopies ?? 1); i++) {
//       spans.push(
//         <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
//           {children}
//         </span>
//       );
//     }

//     return (
//       <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
//         <motion.div
//           className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
//           style={{ x, ...scrollerStyle }}
//         >
//           {spans}
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <section>
//       {texts.map((text, index) => (
//         <VelocityText
//           key={index}
//           className={className}
//           baseVelocity={index % 2 !== 0 ? -velocity : velocity}
//           scrollContainerRef={scrollContainerRef}
//           damping={damping}
//           stiffness={stiffness}
//           numCopies={numCopies}
//           velocityMapping={velocityMapping}
//           parallaxClassName={parallaxClassName}
//           scrollerClassName={scrollerClassName}
//           parallaxStyle={parallaxStyle}
//           scrollerStyle={scrollerStyle}
//         >
//           {text}&nbsp;
//         </VelocityText>
//       ))}
//     </section>
//   );
// };

// export default ScrollVelocity;

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const MentoHero = () => {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const navigate = useNavigate()

    // Mock mentor stats
    const stats = {
        activeMentors: 2500,
        totalSessions: 45000,
        successRate: 96,
        studentsHelped: 12500
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num?.toLocaleString() || "0";
    };

    // GSAP Scroll Animations
    useEffect(() => {
        const initTimer = setTimeout(() => {
            const ctx = gsap.context(() => {
                if (text1Ref.current && text2Ref.current && text3Ref.current) {
                    gsap.set(text1Ref.current, { x: "0%" });
                    gsap.set(text2Ref.current, { x: "-10%" });
                    gsap.set(text3Ref.current, { x: "0%" });

                    gsap.to(text1Ref.current, {
                        x: "-50%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 2,
                            invalidateOnRefresh: true,
                        },
                    });

                    gsap.to(text2Ref.current, {
                        x: "50%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.5,
                            invalidateOnRefresh: true,
                        },
                    });

                    gsap.to(text3Ref.current, {
                        x: "-45%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                            invalidateOnRefresh: true,
                        },
                    });
                }
            }, containerRef);

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(initTimer);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener("loadeddata", () => setVideoLoaded(true));
        }
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen md:min-h-[120vh] overflow-hidden bg-[#062117]"
        >
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23062117' width='1920' height='1080'/%3E%3C/svg%3E"
                >
                    <source
                        src="https://cdn.pixabay.com/video/2023/05/02/160735-822169526_large.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#062117]/95 via-[#062117]/90 to-[#062117]/95"></div>
            </div>

            {/* Animated grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 152, 204, 0.8) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 152, 204, 0.8) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                ></div>
            </div>

            {/* Gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-[#0098cc] rounded-full filter blur-[120px] md:blur-[180px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] md:w-[650px] md:h-[650px] bg-[#0098cc] rounded-full filter blur-[100px] md:blur-[160px] opacity-15"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#0098cc] rounded-full filter blur-[100px] md:blur-[150px] opacity-10"></div>
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="h-full flex flex-col justify-between py-2 md:py-4">
                    {/* First scrolling text */}
                    <div className="relative flex-shrink-0">
                        <div className="overflow-hidden">
                            <div
                                ref={text1Ref}
                                className="flex whitespace-nowrap"
                                style={{ willChange: "transform" }}
                            >
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <span className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-semibold text-[#0098cc]/15 mx-3 md:mx-6">
                                            Transform Your Career with Expert Mentorship • Learn from Industry Leaders
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center content */}
                    <div className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 my-4 md:my-8">
                        <div className="text-center max-w-6xl mx-auto w-full">
                            {/* Platform Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#0098cc]/10 backdrop-blur-xl border border-[#0098cc]/40 mb-4 md:mb-6 shadow-lg shadow-[#0098cc]/10"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#0098cc] animate-pulse shadow-lg shadow-[#0098cc]/50"></div>
                                <span className="text-white font-bold text-xs md:text-sm lg:text-base uppercase tracking-wider">
                                    Professional Mentorship Platform
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[#0098cc] animate-pulse shadow-lg shadow-[#0098cc]/50"></div>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight px-2"
                            >
                                <span className="block text-white drop-shadow-2xl mb-2">
                                    Connect, Learn & Grow
                                </span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0098cc] to-[#00c4ff] drop-shadow-lg">
                                    With Expert Mentors
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed font-light px-2"
                            >
                                Join India's leading mentorship platform.{" "}
                                <span className="text-[#0098cc] font-semibold">Connect</span> with experienced professionals,{" "}
                                <span className="text-[#0098cc] font-semibold">learn</span> industry insights, and{" "}
                                <span className="text-[#0098cc] font-semibold">accelerate</span> your career growth.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-2"
                            >
                                <button className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#0098cc] to-[#00b4e6] text-white font-bold rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-[#0098cc]/30 transition-all duration-300 transform hover:scale-105 text-sm md:text-base" 
                                 onClick={() => navigate("/login")}
                                >
                                    Find a Mentor
                                    <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                                </button>
                                <button
                                onClick={() => navigate("/mentee/apply")}
                                className="px-6 md:px-8 py-3 md:py-4 bg-[#0098cc]/10 backdrop-blur-xl border-2 border-[#0098cc]/40 text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#0098cc]/20 hover:border-[#0098cc]/60 transition-all duration-300 text-sm md:text-base">
                                    Become a Mentor
                                </button>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2"
                            >
                                {/* Active Mentors */}
                                <div className="group bg-[#0098cc]/5 backdrop-blur-xl border border-[#0098cc]/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#0098cc]/60 hover:bg-[#0098cc]/10 transition-all duration-300 shadow-lg">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                                        {formatNumber(stats.activeMentors)}+
                                    </div>
                                    <div className="text-[10px] md:text-xs text-[#0098cc] uppercase tracking-wider font-semibold">
                                        Expert Mentors
                                    </div>
                                </div>

                                {/* Total Sessions */}
                                <div className="group bg-[#0098cc]/5 backdrop-blur-xl border border-[#0098cc]/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#0098cc]/60 hover:bg-[#0098cc]/10 transition-all duration-300 shadow-lg">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                                        {formatNumber(stats.totalSessions)}+
                                    </div>
                                    <div className="text-[10px] md:text-xs text-[#0098cc] uppercase tracking-wider font-semibold">
                                        Sessions Completed
                                    </div>
                                </div>

                                {/* Success Rate */}
                                <div className="group bg-[#0098cc]/5 backdrop-blur-xl border border-[#0098cc]/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#0098cc]/60 hover:bg-[#0098cc]/10 transition-all duration-300 shadow-lg">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                                        {stats.successRate}%
                                    </div>
                                    <div className="text-[10px] md:text-xs text-[#0098cc] uppercase tracking-wider font-semibold">
                                        Success Rate
                                    </div>
                                </div>

                                {/* Students Helped */}
                                <div className="group bg-[#0098cc]/5 backdrop-blur-xl border border-[#0098cc]/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#0098cc]/60 hover:bg-[#0098cc]/10 transition-all duration-300 shadow-lg">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                                        {formatNumber(stats.studentsHelped)}+
                                    </div>
                                    <div className="text-[10px] md:text-xs text-[#0098cc] uppercase tracking-wider font-semibold">
                                        Students Helped
                                    </div>
                                </div>
                            </motion.div>

                            {/* Additional Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400 px-2"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
                                    <span>1-on-1 Sessions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
                                    <span>Industry Experts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
                                    <span>Career Guidance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0098cc]"></div>
                                    <span>24/7 Support</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Third scrolling text */}
                    <div className="relative flex-shrink-0">
                        <div className="overflow-hidden">
                            <div
                                ref={text3Ref}
                                className="flex whitespace-nowrap"
                                style={{ willChange: "transform" }}
                            >
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <span className="text-xs sm:text-base md:text-xl lg:text-3xl font-medium text-[#0098cc]/15 mx-3 md:mx-6">
                                            Your Success Story Starts Here • Book Your First Session Today
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentoHero;


