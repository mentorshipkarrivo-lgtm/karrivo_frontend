

import React from 'react';
import { ArrowRight, Lightbulb, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MentorMenteeHero() {
    const navigate = useNavigate()
    return (
        <div className="min-h-[100vh]  relative overflow-hidden flex items-center" style={{ backgroundColor: '#062117' }}>
            {/* Decorative Lightbulb - Top Left */}
            <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 left-3 sm:left-6 md:left-10 lg:left-16 xl:left-24">
                <div className="relative">
                    <Lightbulb className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-white/30" strokeWidth={1.5} />
                    <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse delay-75"></div>
                </div>
            </div>

            {/* Rotating Circle Text - Top Right */}
            <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 right-3 sm:right-6 md:right-10 lg:right-16 xl:right-24">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40">
                    <div className="absolute inset-0 animate-spin-slow">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                />
                            </defs>
                            <text className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] fill-white/50 uppercase tracking-widest font-bold">
                                <textPath href="#circlePath" startOffset="0%">
                                    GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 xl:w-6 xl:h-6 text-white -rotate-45" strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                {/* Top Section - Heading and Buttons */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 leading-tight">
                        GROW UP YOUR
                        <br />
                        SKILL IN MINUTES
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
                        <button
                            className="px-7 sm:px-8 md:px-9 lg:px-10 xl:px-12 py-3 sm:py-3.5 md:py-4 lg:py-4.5 rounded-full text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-all hover:opacity-90 hover:scale-105 shadow-lg"
                            style={{ backgroundColor: '#0098cc' }}
                            onClick={() => navigate("/login")}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Center Section - Image with Surrounding Cards */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Happy Students - Top Left */}
                    <div className="absolute -top-4 sm:-top-2 md:top-0 lg:top-2 left-0 sm:left-4 md:left-6 lg:left-8 xl:left-0 flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 z-20">
                        <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-16 xl:h-16 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: '#0098cc' }}>
                            <span className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">😊</span>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white leading-none">600</p>
                            <p className="text-white/70 text-xs sm:text-xs md:text-sm lg:text-sm">Happy Student</p>
                        </div>
                    </div>

                    {/* Course Info Card - Left */}
                    <div className="absolute top-1/4 sm:top-1/3 -left-2 sm:-left-4 md:-left-6 lg:-left-12 xl:-left-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] shadow-2xl z-20 hidden md:block">
                        <p className="text-white/90 text-xs sm:text-sm md:text-sm lg:text-base mb-3 sm:mb-3 md:mb-3.5 lg:mb-4 leading-relaxed">
                            "Explore Unlimited Courses That Fit Your The Process of Skill Development."
                        </p>
                        <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all text-xs sm:text-sm md:text-sm lg:text-sm">
                            LET'S GO
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4" />
                        </button>
                    </div>

                    {/* Grid Background Behind Image */}
                    <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] md:w-[360px] md:h-[480px] lg:w-[420px] lg:h-[560px] xl:w-[500px] xl:h-[640px] grid grid-cols-8 grid-rows-8 gap-1.5 sm:gap-2 opacity-10 pointer-events-none">
                        {[...Array(64)].map((_, i) => (
                            <div key={i} className="border border-white/30 rounded"></div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="relative mx-auto w-[240px] h-[340px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[440px] lg:w-[380px] lg:h-[520px] xl:w-[440px] xl:h-[600px] rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl shadow-2xl z-10">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop"
                            alt="Student"
                            className="w-full h-full rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl object-cover"
                        />

                        {/* Name Badge at Bottom */}
                        <div className="absolute -bottom-5 sm:-bottom-6 md:-bottom-7 lg:-bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-3.5 md:px-4 lg:px-4 py-2 sm:py-2 md:py-2.5 shadow-2xl">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-full overflow-hidden border-2 border-white/30">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                                    alt="Mentor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm sm:text-sm md:text-base lg:text-base leading-tight">Marvin</p>
                                <p className="text-white/60 text-xs sm:text-xs md:text-sm lg:text-sm leading-tight">McKinney</p>
                            </div>
                        </div>
                    </div>

                    {/* 5 Star Rating - Top Right */}
                    <div className="absolute -top-2 sm:top-0 md:top-4 lg:top-8 xl:top-12 right-0 sm:right-4 md:right-6 lg:right-8 xl:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl p-3 sm:p-3.5 md:p-4 lg:p-5 shadow-2xl z-20 w-[160px] sm:w-[170px] md:w-[180px] lg:w-[190px] xl:w-[200px]">
                        <p className="text-white font-bold text-sm sm:text-sm md:text-base lg:text-base mb-1 sm:mb-1.5 md:mb-2 text-center leading-tight">5 Star Rating</p>
                        <p className="text-white/60 text-[10px] sm:text-[10px] md:text-xs lg:text-xs mb-2 sm:mb-2.5 md:mb-3 text-center leading-tight">Avg rating 4.8 makes us world best</p>
                        <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>

                    {/* 2.5M+ Students - Right Middle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:right-0 md:right-2 lg:right-4 xl:-right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-2xl z-20 text-center w-[120px] sm:w-[130px] md:w-[140px] lg:w-[150px] xl:w-[160px]">
                        <p className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 leading-none">2.5M+</p>
                        <p className="text-white/60 text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm leading-tight">Total active student</p>
                    </div>

                    {/* 137 Courses - Bottom Right */}
                    <div className="absolute bottom-0 sm:bottom-2 md:bottom-4 lg:bottom-6 xl:bottom-8 right-0 sm:right-2 md:right-4 lg:right-6 xl:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-2xl z-20 text-center w-[110px] sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[140px]">
                        <p className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 leading-none">137</p>
                        <p className="text-white/60 text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-sm leading-tight">Total Course</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </div>
    );
}
