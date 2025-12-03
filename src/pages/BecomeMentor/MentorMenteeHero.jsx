// import React from 'react';
// import { ArrowRight, Lightbulb, Star } from 'lucide-react';

// export default function MentorMenteeHero() {
//   return (
//     <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#1a1d2e' }}>
//       {/* Decorative Lightbulb - Top Left */}
//       <div className="absolute top-16 sm:top-24 left-4 sm:left-12 lg:left-20">
//         <div className="relative">
//           <Lightbulb className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/30" strokeWidth={1.5} />
//           <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
//           <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-75"></div>
//         </div>
//       </div>

//       {/* Rotating Circle Text - Top Right */}
//       <div className="absolute top-20 sm:top-32 right-4 sm:right-12 lg:right-20">
//         <div className="relative w-32 h-32 sm:w-40 sm:h-40">
//           <div className="absolute inset-0 animate-spin-slow">
//             <svg viewBox="0 0 200 200" className="w-full h-full">
//               <defs>
//                 <path
//                   id="circlePath"
//                   d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
//                 />
//               </defs>
//               <text className="text-[9px] fill-white/50 uppercase tracking-widest font-bold">
//                 <textPath href="#circlePath" startOffset="0%">
//                   GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •
//                 </textPath>
//               </text>
//             </svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
//               <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-45" strokeWidth={2} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
//         {/* Top Section - Heading and Buttons */}
//         <div className="text-center mb-12 sm:mb-16">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12 leading-tight">
//             GROW UP YOUR
//             <br />
//             SKILL IN MINUTES
//           </h1>

//           <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
//             <button 
//               className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-black font-bold text-base sm:text-lg transition-all hover:opacity-90 hover:scale-105"
//               style={{ backgroundColor: '#a3e635' }}
//             >
//               Get Started
//             </button>
//             <button className="text-white font-semibold text-base sm:text-lg hover:underline">
//               Try for free
//             </button>
//           </div>
//         </div>

//         {/* Center Section - Image with Surrounding Cards */}
//         <div className="relative max-w-5xl mx-auto">
//           {/* Happy Students - Top Left */}
//           <div className="absolute top-0 left-0 sm:left-8 lg:left-0 flex items-center gap-3 sm:gap-4 z-20">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
//               <span className="text-2xl sm:text-3xl">😊</span>
//             </div>
//             <div>
//               <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">600</p>
//               <p className="text-white/70 text-xs sm:text-sm">Happy Student</p>
//             </div>
//           </div>

//           {/* Course Info Card - Left */}
//           <div className="absolute top-1/3 left-0 sm:-left-8 lg:-left-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 max-w-[240px] sm:max-w-[280px] shadow-xl z-20 hidden md:block">
//             <p className="text-white/90 text-sm sm:text-base mb-4 leading-relaxed">
//               "Explore Unlimited Courses That Fit Your The Process of Skill Development."
//             </p>
//             <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all text-sm">
//               LET'S GO
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Grid Background Behind Image */}
//           <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] lg:w-[500px] lg:h-[600px] grid grid-cols-8 grid-rows-8 gap-2 opacity-10 pointer-events-none">
//             {[...Array(64)].map((_, i) => (
//               <div key={i} className="border border-white/30 rounded"></div>
//             ))}
//           </div>

//           {/* Center Image */}
//           <div className="relative mx-auto w-[280px] h-[380px] sm:w-[350px] sm:h-[480px] lg:w-[420px] lg:h-[580px] z-10">
//             <img 
//               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop" 
//               alt="Student"
//               className="w-full h-full object-cover"
//             />

//             {/* Name Badge at Bottom */}
//             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-xl">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30">
//                 <img 
//                   src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
//                   alt="Mentor"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <p className="text-white font-bold text-sm sm:text-base">Marvin</p>
//                 <p className="text-white/60 text-xs sm:text-sm">McKinney</p>
//               </div>
//             </div>
//           </div>

//           {/* 5 Star Rating - Top Right */}
//           <div className="absolute top-8 sm:top-12 right-0 sm:right-8 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shadow-xl z-20 max-w-[180px] sm:max-w-[200px]">
//             <p className="text-white font-bold text-sm sm:text-base mb-2 text-center">5 Star Rating</p>
//             <p className="text-white/60 text-xs mb-3 text-center leading-tight">Avg rating 4.8 makes us world best</p>
//             <div className="flex gap-1 justify-center">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
//               ))}
//             </div>
//           </div>

//           {/* 2.5M+ Students - Right Middle */}
//           <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 lg:-right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl z-20 text-center min-w-[140px] sm:min-w-[160px]">
//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">2.5M+</p>
//             <p className="text-white/60 text-xs sm:text-sm">Total active student</p>
//           </div>

//           {/* 137 Courses - Bottom Right */}
//           <div className="absolute bottom-8 right-0 sm:right-4 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl z-20 text-center min-w-[120px] sm:min-w-[140px]">
//             <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">137</p>
//             <p className="text-white/60 text-xs sm:text-sm">Total Course</p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



import React from 'react';
import { ArrowRight, Lightbulb, Star } from 'lucide-react';

export default function MentorMenteeHero() {
    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#062117' }}>
            {/* Decorative Lightbulb - Top Left */}
            <div className="absolute top-16 sm:top-24 left-4 sm:left-12 lg:left-20">
                <div className="relative">
                    <Lightbulb className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/30" strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-75"></div>
                </div>
            </div>

            {/* Rotating Circle Text - Top Right */}
            <div className="absolute top-20 sm:top-32 right-4 sm:right-12 lg:right-20">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <div className="absolute inset-0 animate-spin-slow">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                />
                            </defs>
                            <text className="text-[14px] fill-white/50 uppercase tracking-widest font-bold">
                                <textPath href="#circlePath" startOffset="0%">
                                    GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-45" strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Top Section - Heading and Buttons */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12 leading-tight">
                        GROW UP YOUR
                        <br />
                        SKILL IN MINUTES
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <button
                            className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-white font-bold text-base sm:text-lg transition-all hover:opacity-90 hover:scale-105"
                            style={{ backgroundColor: '#0098cc' }}
                        >
                            Get Started
                        </button>
                        <button className="text-white font-semibold text-base sm:text-lg hover:underline">
                            Try for free
                        </button>
                    </div>
                </div>

                {/* Center Section - Image with Surrounding Cards */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Happy Students - Top Left */}
                    <div className="absolute top-0 left-0 sm:left-8 lg:left-0 flex items-center gap-3 sm:gap-4 z-20">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#0098cc' }}>
                            <span className="text-2xl sm:text-3xl">😊</span>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">600</p>
                            <p className="text-white/70 text-xs sm:text-sm">Happy Student</p>
                        </div>
                    </div>

                    {/* Course Info Card - Left */}
                    <div className="absolute top-1/3 left-0 sm:-left-8 lg:-left-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 max-w-[240px] sm:max-w-[280px] shadow-xl z-20 hidden md:block">
                        <p className="text-white/90 text-sm sm:text-base mb-4 leading-relaxed">
                            "Explore Unlimited Courses That Fit Your The Process of Skill Development."
                        </p>
                        <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all text-sm">
                            LET'S GO
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Grid Background Behind Image */}
                    <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] lg:w-[500px] lg:h-[600px] grid grid-cols-8 grid-rows-8 gap-2 opacity-10 pointer-events-none">
                        {[...Array(64)].map((_, i) => (
                            <div key={i} className="border border-white/30 rounded"></div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="relative mx-auto w-[280px] h-[380px] sm:w-[350px] sm:h-[480px] lg:w-[420px] lg:h-[520px]     rounded-3xl    z-10">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop"
                            alt="Student"
                            className="w-full h-full rounded-3xl object-cover"
                        />

                        {/* Name Badge at Bottom */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                                    alt="Mentor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm sm:text-base">Marvin</p>
                                <p className="text-white/60 text-xs sm:text-sm">McKinney</p>
                            </div>
                        </div>
                    </div>

                    {/* 5 Star Rating - Top Right */}
                    <div className="absolute top-8 sm:top-12 right-0 sm:right-8 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shadow-xl z-20 max-w-[180px] sm:max-w-[200px]">
                        <p className="text-white font-bold text-sm sm:text-base mb-2 text-center">5 Star Rating</p>
                        <p className="text-white/60 text-xs mb-3 text-center leading-tight">Avg rating 4.8 makes us world best</p>
                        <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>

                    {/* 2.5M+ Students - Right Middle */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 lg:-right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl z-20 text-center min-w-[140px] sm:min-w-[160px]">
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">2.5M+</p>
                        <p className="text-white/60 text-xs sm:text-sm">Total active student</p>
                    </div>

                    {/* 137 Courses - Bottom Right */}
                    <div className="absolute bottom-8 right-0 sm:right-4 lg:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl z-20 text-center min-w-[120px] sm:min-w-[140px]">
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">137</p>
                        <p className="text-white/60 text-xs sm:text-sm">Total Course</p>
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



