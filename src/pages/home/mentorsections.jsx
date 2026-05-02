'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Reusable Avatar Component
const Avatar = ({ src, alt, size = 'md', initials = 'AV' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center font-bold text-white overflow-hidden`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ text, icon }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
    {icon && <span className="text-sm">{icon}</span>}
    {text}
  </div>
);

// Button Component
const MentorButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Animated background glow */}
      <motion.div
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full blur-xl"
        style={{ zIndex: -1 }}
      />

      <span className="relative z-10">Become a Mentor</span>

      {/* Arrow icon in circle */}
      <motion.div
        className="relative z-10 w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold group-hover:translate-x-1 transition-transform"
        animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
      >
        →
      </motion.div>
    </motion.button>
  );
};

// Glassmorphic Card Component
const GlassmorphicCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={`backdrop-blur-md bg-white/80 border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating Animation Wrapper
const FloatingCard = ({ children, delay = 0, offset = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, offset, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// Sessions Card Component
const SessionsCard = () => (
  <FloatingCard offset={-8} delay={0}>
    <GlassmorphicCard className="p-4 w-max" delay={0.2}>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex -space-x-2">
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" alt="User 1" size="sm" />
          <Avatar initials="JD" size="sm" />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">3 Sessions</p>
          <p className="text-gray-500 text-xs">Upcoming</p>
        </div>
      </div>
    </GlassmorphicCard>
  </FloatingCard>
);

// Mentor Profile Card Component
const MentorProfileCard = () => (
  <FloatingCard offset={12} delay={0.3}>
    <GlassmorphicCard className="p-5 w-max" delay={0.4}>
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" alt="Anaya Verma" size="lg" />
          <Badge text="Mentor" icon="✓" className="absolute -top-2 -right-2" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">Anaya Verma</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 text-sm font-semibold">4.3 (23 Reviews)</span>
          </div>
        </div>
      </div>
    </GlassmorphicCard>
  </FloatingCard>
);

// Withdrawal Card Component
const WithdrawalCard = () => (
  <FloatingCard offset={8} delay={0.1}>
    <GlassmorphicCard className="p-4 w-max" delay={0.3}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">💵</div>
        <div>
          <p className="font-bold text-gray-900 text-base">₹2,359</p>
          <p className="text-gray-500 text-xs">Last Withdrawn</p>
        </div>
      </div>
    </GlassmorphicCard>
  </FloatingCard>
);

// Decorative Sparkle Component
const Sparkle = ({ delay = 0, top = '20%', right = '15%' }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      delay,
    }}
    className="absolute text-blue-400 text-3xl pointer-events-none"
    style={{ top, right }}
  >
    ✨
  </motion.div>
);

// Main Hero Component
export default function MentorHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl"
      >
        {/* Main Hero Card */}
        <div className="relative">
          {/* Background Card with Gradient */}
          <div className="relative bg-gradient-to-r from-blue-100 via-blue-50 to-cyan-100 rounded-3xl overflow-hidden shadow-2xl">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-16 items-center min-h-[500px]">
              {/* Left Section - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col justify-center z-20"
              >
                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Become a Mentor
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
                >
                  & Guide Unstoppable Talent!
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-700 text-lg mb-8 leading-relaxed max-w-md font-medium"
                >
                  Join the clan of 2000+ Mentors & guide talent to help them create a difference.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <MentorButton />
                </motion.div>
              </motion.div>

              {/* Right Section - Image & Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative h-full min-h-[500px] flex items-center justify-end"
              >
                {/* Decorative Sparkles */}
                <Sparkle delay={0} top="10%" right="20%" />
                <Sparkle delay={0.5} top="60%" right="5%" />

                {/* Floating Cards Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Sessions Card - Top Left */}
                  <div className="absolute top-12 left-0 z-30">
                    <SessionsCard />
                  </div>

                  {/* Mentor Image - Center Right with Overflow */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                    className="relative z-40 -mt-12"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-blue-300 rounded-2xl blur-2xl opacity-40 -z-10"></div>

                    {/* Image Container - Overflows */}
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
                      alt="Mentor"
                      className="relative h-96 w-auto object-cover rounded-3xl shadow-2xl border-4 border-white/50"
                    />
                  </motion.div>

                  {/* Mentor Profile Card - Top Right */}
                  <div className="absolute top-8 right-0 z-50">
                    <MentorProfileCard />
                  </div>

                  {/* Withdrawal Card - Bottom Left */}
                  <div className="absolute bottom-12 left-0 z-30">
                    <WithdrawalCard />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Global Styles for Animations */}
        <style jsx>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(20px, -50px) scale(1.1);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            75% {
              transform: translate(50px, 50px) scale(1.05);
            }
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
        `}</style>
      </motion.div>
    </div>
  );
}