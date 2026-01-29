
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import DomeGallery from "./domeGallery"
import { Navigate, useNavigate } from "react-router-dom";

export default function AboutPage() {
    const sectionRef = useRef(null);
    const usenavigate = useNavigate()

    // motion values
    const yRaw = useMotionValue(150);
    const opacityRaw = useMotionValue(0);

    // smooth spring animations
    const y = useSpring(yRaw, { stiffness: 120, damping: 20 });
    const opacity = useSpring(opacityRaw, { stiffness: 120, damping: 24 });

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

        const update = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            // Compute progress when section enters the viewport
            const distanceFromEnter = vh - rect.top;
            let progress = distanceFromEnter / (vh + rect.height / 2);
            progress = clamp(progress, 0, 1);

            // Map progress to y and opacity
            const yValue = 150 * (1 - progress); // move up as we scroll
            const opacityValue = progress < 0.2 ? progress / 0.2 : 1; // fade in smoothly
            yRaw.set(yValue);
            opacityRaw.set(opacityValue);
        };

        const onScroll = () => requestAnimationFrame(update);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [yRaw, opacityRaw]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[150vh] overflow-hidden text-white"
            style={{ backgroundColor: '#062117' }}
        >
            {/* Background DomeGallery */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DomeGallery />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(6, 33, 23, 0.7)' }} />
            </div>

            {/* Centered content */}
            <div className="relative z-10 flex items-center justify-center h-screen">
                <motion.div
                    style={{ y, opacity }}
                    className="text-center px-6 max-w-4xl"
                >
                    {/* New Badge */}
                    <div className="mb-8 flex justify-center">
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: '#0098cc' }}>
                            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-semibold">New!</span>
                            <span>Fresh mentors joined this month</span>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight mx-auto">
                        Successful Mentors Are Here For You
                    </h2>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mb-10 mx-auto max-w-3xl">
                        Connect with world-class mentors who have walked the path you're on.
                        Get personalized guidance, accelerate your growth, and achieve your goals
                        with experts dedicated to your success.
                    </p>

                    <button
                        className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl"
                        style={{ backgroundColor: '#0098cc' }}
                        onClick={() => usenavigate("/Allmentors")}
                    >
                        Browse all mentors
                    </button>
                </motion.div>
            </div>
        </section>
    );
}



