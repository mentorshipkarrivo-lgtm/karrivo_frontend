import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import DomeGallery from "./DomeGallery";

export default function AboutPage() {
  const sectionRef = useRef(null);

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
      className="relative w-full min-h-[150vh] overflow-hidden bg-black text-white"
    >
      {/* Background DomeGallery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DomeGallery />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <motion.div
          style={{ y, opacity }}
          className="text-center px-6 max-w-3xl"
        >
          <h2 className="text-6xl font-extrabold mb-6">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-200">
            We are an innovative development team crafting digital experiences that
            merge creativity, design, and technology. Our mission is to deliver
            immersive solutions that empower brands and connect ideas with impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}