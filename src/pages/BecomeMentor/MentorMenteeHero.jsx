import React from 'react';
import { ArrowRight, Lightbulb, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MentorMenteeHero() {
    const navigate = useNavigate()
    return (
        <div className="h-screen relative overflow-hidden flex items-center" style={{ backgroundColor: '#062117' }}>
            {/* Decorative Lightbulb - Top Left */}
            <div className="absolute top-4 sm:top-5 md:top-6 lg:top-8 left-3 sm:left-4 md:left-6 lg:left-8">
                <div className="relative">
                    <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white/30" strokeWidth={1.5} />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full animate-pulse delay-75"></div>
                </div>
            </div>

            {/* Rotating Circle Text - Top Right */}
            <div className="absolute top-4 sm:top-5 md:top-6 lg:top-8 right-3 sm:right-4 md:right-6 lg:right-8">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <div className="absolute inset-0 animate-spin-slow">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                />
                            </defs>
                            <text className="text-[8px] sm:text-[9px] md:text-[10px] fill-white/50 uppercase tracking-widest font-bold">
                                <textPath href="#circlePath" startOffset="0%">
                                    GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white -rotate-45" strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
                {/* Top Section - Heading and Buttons */}
                <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight">
                        GROW UP YOUR
                        <br />
                        SKILL IN MINUTES
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <button
                            className="px-5 sm:px-6 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full text-white font-bold text-xs sm:text-sm md:text-base transition-all hover:opacity-90 hover:scale-105 shadow-lg"
                            style={{ backgroundColor: '#0098cc' }}
                            onClick={() => navigate("/login")}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Center Section - Image with Surrounding Cards */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Happy Students - Top Left */}
                    <div className="absolute top-0 sm:top-1 md:top-2 lg:top-3 left-0 sm:left-1 md:left-2 lg:left-0 flex items-center gap-1.5 sm:gap-2 z-20">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 shadow-xl">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-none mb-0.5">600+</p>
                            <p className="text-white/70 text-[8px] sm:text-[9px] md:text-[10px]">Happy Students</p>
                        </div>
                    </div>

                    {/* Course Info Card - Left */}
                    <div className="absolute top-1/4 sm:top-1/3 -left-2 sm:-left-3 md:-left-6 lg:-left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4 w-[120px] sm:w-[140px] md:w-[170px] lg:w-[200px] shadow-2xl z-20 hidden md:block">
                        <p className="text-white/90 text-[9px] sm:text-[10px] md:text-xs mb-1.5 sm:mb-2 leading-relaxed">
                            "Explore Unlimited Courses That Fit Your The Process of Skill Development."
                        </p>
                        <button className="flex items-center gap-1.5 text-white font-bold hover:gap-2 transition-all text-[9px] sm:text-[10px]">
                            LET'S GO
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                    </div>

                    {/* Grid Background Behind Image */}
                    <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[180px] sm:w-[160px] sm:h-[220px] md:w-[200px] md:h-[280px] lg:w-[250px] lg:h-[350px] xl:w-[300px] xl:h-[420px] grid grid-cols-8 grid-rows-8 gap-0.5 sm:gap-1 opacity-10 pointer-events-none">
                        {[...Array(64)].map((_, i) => (
                            <div key={i} className="border border-white/30 rounded"></div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="relative mx-auto w-[110px] h-[160px] sm:w-[140px] sm:h-[200px] md:w-[180px] md:h-[260px] lg:w-[230px] lg:h-[330px] xl:w-[280px] xl:h-[400px] rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl z-10">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop"
                            alt="Student"
                            className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-cover"
                        />

                        {/* Name Badge at Bottom */}
                        <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 lg:-bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 md:py-1.5 shadow-2xl">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden border-2 border-white/30">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                                    alt="Mentor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-bold text-[9px] sm:text-[10px] md:text-xs leading-tight">Marvin</p>
                                <p className="text-white/60 text-[7px] sm:text-[8px] md:text-[9px] leading-tight">McKinney</p>
                            </div>
                        </div>
                    </div>

                    {/* 5 Star Rating - Top Right */}
                    <div className="absolute top-1 sm:top-2 md:top-3 lg:top-4 right-0 sm:right-1 md:right-2 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-2.5 md:py-2 lg:px-3 lg:py-2.5 shadow-2xl z-20 w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px]">
                        <p className="text-white font-bold text-[9px] sm:text-[10px] md:text-xs mb-0.5 text-center leading-tight">5 Star Rating</p>
                        <p className="text-white/60 text-[7px] sm:text-[8px] md:text-[9px] text-center leading-tight">Avg rating 4.8 makes us world best</p>
                    </div>

                    {/* 2.5M+ Students - Right Middle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 sm:right-0 md:right-1 lg:right-2 xl:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-2.5 md:py-2 lg:px-3 lg:py-2.5 shadow-2xl z-20 text-center w-[65px] sm:w-[75px] md:w-[90px] lg:w-[110px]">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-0.5 leading-none">2.5M+</p>
                        <p className="text-white/60 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-tight">Total active student</p>
                    </div>

                    {/* 137 Courses - Bottom Right */}
                    <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 right-0 sm:right-1 md:right-2 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-2.5 md:py-2 lg:px-3 lg:py-2.5 shadow-2xl z-20 text-center w-[60px] sm:w-[70px] md:w-[85px] lg:w-[100px]">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-0.5 leading-none">137</p>
                        <p className="text-white/60 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-tight">Total Course</p>
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