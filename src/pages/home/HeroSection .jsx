

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function HeroSection() {
//   const navigate = useNavigate();

//   const profiles = [
//     { id: 1, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face' },
//     { id: 2, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face' },
//     { id: 3, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face' },
//     { id: 4, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face' },
//     { id: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face' },
//     { id: 6, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face' },
//     { id: 7, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face' },
//     { id: 8, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face' },
//   ];

//   const loopedProfiles = [...profiles, ...profiles, ...profiles];
//   const goals = ['CAREER GROWTH', 'LEADERSHIP', 'NETWORKING', 'SKILL-BUILDING'];

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col overflow-hidden">

//       <style>{`
//         @keyframes scroll-left {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-33.333%); }
//         }
//         .marquee-track {
//           display: flex;
//           width: max-content;
//           animation: scroll-left 10s linear infinite;
//         }
//         .marquee-track:hover {
//           animation-play-state: paused;
//         }

//         /* Responsive card sizes */
//         .mentor-card {
//           width: 100px;
//           height: 135px;
//           margin-right: 10px;
//           flex-shrink: 0;
//         }
//         @media (min-width: 480px) {
//           .mentor-card {
//             width: 130px;
//             height: 170px;
//             margin-right: 12px;
//           }
//         }
//         @media (min-width: 768px) {
//           .mentor-card {
//             width: 155px;
//             height: 205px;
//             margin-right: 14px;
//           }
//         }
//         @media (min-width: 1024px) {
//           .mentor-card {
//             width: 180px;
//             height: 240px;
//             margin-right: 16px;
//           }
//         }

//         /* Marquee bleed matches padding at each breakpoint */
//         .marquee-bleed {
//           margin-left: -1rem;
//           margin-right: -1rem;
//         }
//         @media (min-width: 640px) {
//           .marquee-bleed {
//             margin-left: -2rem;
//             margin-right: -2rem;
//           }
//         }
//         @media (min-width: 1024px) {
//           .marquee-bleed {
//             margin-left: -3.5rem;
//             margin-right: -3.5rem;
//           }
//         }
//         @media (min-width: 1280px) {
//           .marquee-bleed {
//             margin-left: -5rem;
//             margin-right: -5rem;
//           }
//         }
//       `}</style>

//       <div className="flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 lg:py-8">

//         {/* ── Header ── */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

//           {/* Left — Headline */}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#0a1a22]">
//               THE WORLD'S LEADING<br />
//               MENTORSHIP PLATFORM FOR<br />
//               TOMORROW'S{' '}
//               <span className="text-[#0098cc]">‹ GROWTH ›</span>
//             </h1>
//           </div>

//           {/* Right — Profile + Goals */}
//           <div className="flex flex-col justify-center items-start lg:items-end gap-4">

//             {/* Profile progress row */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full overflow-hidden shadow-md shrink-0">
//                 <img
//                   src="https://i.pravatar.cc/150?img=10"
//                   alt="User profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-24 sm:w-28 h-2 rounded-full bg-[#e0f4fc] overflow-hidden">
//                 <div className="h-full w-[75%] bg-[#0098cc] rounded-full" />
//               </div>
//               <div className="w-8 h-8 rounded-full border border-[#0098cc] flex items-center justify-center shrink-0">
//                 <svg className="w-3.5 h-3.5 text-[#0098cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <circle cx="12" cy="12" r="10" strokeWidth="2" />
//                   <circle cx="12" cy="12" r="6" strokeWidth="2" />
//                   <circle cx="12" cy="12" r="2" strokeWidth="2" />
//                 </svg>
//               </div>
//             </div>

//             {/* Goals */}
//             <div className="text-left lg:text-right">
//               <p className="text-xs font-mono text-gray-400 mb-2 tracking-wide">
//                 4 PERSONAL DEVELOPMENT GOALS
//               </p>
//               <div className="flex flex-wrap justify-start lg:justify-end gap-2">
//                 {goals.map((goal, i) => (
//                   <span
//                     key={i}
//                     className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#f0faff] text-[#0098cc] border border-[#0098cc]/20"
//                   >
//                     {goal}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Divider ── */}
//         <div className="w-full h-px bg-[#0098cc]/20 mb-5" />

//         {/* ── Marquee — bleeds edge to edge at every breakpoint ── */}
//         <div className="overflow-hidden mb-5 marquee-bleed">
//           <div className="marquee-track">
//             {loopedProfiles.map((profile, idx) => (
//               <div
//                 key={idx}
//                 className="mentor-card relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md
//                            transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <img
//                   src={profile.image}
//                   alt={`Mentor ${profile.id}`}
//                   className="w-full h-full object-cover object-top"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── Bottom row ── */}
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

//           <p className="text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl">
//             Connect with experienced mentors for personalized career guidance and professional development.
//             Get unlimited access to expert mentors, unlock valuable opportunities, and accelerate your
//             growth in a supportive, skills-driven community.
//           </p>

//           <div className="flex flex-wrap gap-3 shrink-0">
//             <button
//               onClick={() => navigate('/top')}
//               className="px-5 py-2.5 rounded-full border-2 border-[#0098cc] text-[#0098cc] text-sm font-medium hover:bg-[#f0faff] transition-colors"
//             >
//               Browse mentors
//             </button>
//             <button
//               onClick={() => navigate('/login')}
//               className="px-5 py-2.5 rounded-full bg-[#0098cc] text-white text-sm font-medium hover:opacity-90 transition-opacity"
//             >
//               Get started free
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-hidden">

      <div className="flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 lg:py-8">

        {/* ── Top section: Hero headline + CTA ── */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0a1a22] mb-4">
            Start Working.<br />
            Do <span className="text-[#0098cc]">Mentorships</span>.
          </h1>

          {/* Accent underline */}
          <div className="w-32 sm:w-40 h-1 rounded-full bg-[#0098cc] mb-6" />

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-500 max-w-2xl mb-8">
            MentorMind offers virtual, mentored work experiences that are co-created with
            top companies to help you build real skills in careers of your choice.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/top')}
              className="px-6 py-3 rounded-full bg-[#0098cc] text-white text-sm sm:text-base font-medium  transition-opacity"
            >
              Explore Top Mentor
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-full border-2 border-[#0098cc] text-[#0098cc] text-sm sm:text-base font-medium hover:bg-[#f0faff] transition-colors"
            >
              Get started free
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-[#0098cc]/20 mb-10 lg:mb-14" />

        {/* ── Bottom section: Mentorship Principle ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Heading + description + link */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1a22]">
                Mentor <span className="relative inline-block">
                  your
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#0098cc] text-sm">^</span>
                </span> Mind
              </h2>
              <span className="hidden sm:block w-px h-8 bg-[#0098cc]/30" />
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0098cc]">
                The Mentorship Principle
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-gray-500 max-w-md">
              MentorMind practices the new-age experiential skilling method of learning by
              doing — which means you mentor your mind using the Explore-Apply-Create
              principle &amp; gain real job skills.
            </p>

            {/* <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 text-sm font-medium text-[#0a1a22] hover:text-[#0098cc] transition-colors self-start mt-2"
            >
              Tell me more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button> */}
          </div>

          {/* Right — Explore / Apply / Create diagram */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80">

              {/* Explore label */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <span className="text-[#0098cc] font-semibold text-sm sm:text-base">Explore</span>
                <svg className="w-4 h-4 text-[#0098cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Create label */}
              <div className="absolute bottom-2 left-2 sm:left-4 flex items-center gap-1">
                <span className="text-[#1a1a2e] font-semibold text-sm sm:text-base">Create</span>
                <svg className="w-4 h-4 text-[#1a1a2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                </svg>
              </div>

              {/* Apply label */}
              <div className="absolute bottom-6 right-0 flex items-center gap-1">
                <svg className="w-4 h-4 text-[#0098cc] rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <span className="text-[#0098cc] font-semibold text-sm sm:text-base">Apply</span>
              </div>

              {/* Faceted shape */}
              <svg viewBox="0 0 320 320" className="w-full h-full">
                {/* top facet - Explore */}
                <polygon points="80,150 240,150 200,60 120,60" fill="#0098cc" />
                {/* left facet - Create */}
                <polygon points="80,150 200,150 150,260 60,230" fill="#1a1a2e" />
                {/* right facet - Apply */}
                <polygon points="200,150 240,150 230,250 150,260" fill="#7fd4f0" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

