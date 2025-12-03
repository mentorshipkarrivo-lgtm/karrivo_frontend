import React from 'react';
import { Users, Star, Award } from 'lucide-react';

export default function BecomeMentorHero() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#062117' }}>
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black leading-none">mentors</h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto">
                        <button className="text-gray-700 hover:text-black font-normal text-sm whitespace-nowrap">Find mentors</button>
                        <button className="text-gray-700 hover:text-black font-normal text-sm whitespace-nowrap">Become a mentor</button>
                        <button className="text-gray-700 hover:text-black font-normal text-sm whitespace-nowrap">Community</button>
                        <button className="text-gray-700 hover:text-black font-normal text-sm whitespace-nowrap">Blog</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                            Apply as a mentor
                            <br />
                            & guide
                        </h2>

                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <span
                                className="px-4 py-2 rounded-full text-white font-bold text-base sm:text-lg"
                                style={{ backgroundColor: '#0098cc' }}
                            >
                                5000+
                            </span>
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">mentees</span>
                        </div>

                        <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed max-w-lg">
                            Share your expertise and make a lasting impact by becoming a mentor in our global community.
                        </p>

                        <button
                            className="px-8 sm:px-10 py-3 sm:py-4 text-white text-base sm:text-lg font-bold transition-all hover:opacity-90 hover:scale-105 rounded"
                            style={{ backgroundColor: '#0098cc' }}
                        >
                            APPLY AS MENTOR
                        </button>

                        {/* Stats Section */}
                        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0098cc' }} />
                                    <span className="text-2xl sm:text-3xl font-bold text-white">4.9</span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/60">Mentor Rating</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0098cc' }} />
                                    <span className="text-2xl sm:text-3xl font-bold text-white">15k+</span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/60">Mentees Guided</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0098cc' }} />
                                    <span className="text-2xl sm:text-3xl font-bold text-white">$150+</span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/60">Avg. Hourly Rate</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative order-1 lg:order-2">
                        <div
                            className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                            style={{ backgroundColor: '#e8b4a8' }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=900&fit=crop"
                                alt="Professional mentor"
                                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                            <span className="text-xl sm:text-2xl">👋</span>
                            <div>
                                <p className="text-xs sm:text-sm font-bold text-black">MIRACLE GOUSE 🇺🇸</p>
                            </div>
                        </div>

                        {/* Bottom Badge */}
                        <div
                            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-xl"
                            style={{ backgroundColor: '#0098cc' }}
                        >
                            <p className="text-white font-bold text-xs sm:text-sm">EXPERIENCED MENTOR</p>
                            <p className="text-white font-bold text-xs sm:text-sm">GUIDING 200+ MENTEES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


