

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const profiles = [
    { id: 1, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face' },
    { id: 2, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face' },
    { id: 3, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face' },
    { id: 4, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face' },
    { id: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face' },
    { id: 6, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face' },
    { id: 7, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face' },
    { id: 8, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face' },
  ];

  const loopedProfiles = [...profiles, ...profiles, ...profiles];
  const goals = ['CAREER GROWTH', 'LEADERSHIP', 'NETWORKING', 'SKILL-BUILDING'];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-hidden">

      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-left 10s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Responsive card sizes */
        .mentor-card {
          width: 100px;
          height: 135px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .mentor-card {
            width: 130px;
            height: 170px;
            margin-right: 12px;
          }
        }
        @media (min-width: 768px) {
          .mentor-card {
            width: 155px;
            height: 205px;
            margin-right: 14px;
          }
        }
        @media (min-width: 1024px) {
          .mentor-card {
            width: 180px;
            height: 240px;
            margin-right: 16px;
          }
        }

        /* Marquee bleed matches padding at each breakpoint */
        .marquee-bleed {
          margin-left: -1rem;
          margin-right: -1rem;
        }
        @media (min-width: 640px) {
          .marquee-bleed {
            margin-left: -2rem;
            margin-right: -2rem;
          }
        }
        @media (min-width: 1024px) {
          .marquee-bleed {
            margin-left: -3.5rem;
            margin-right: -3.5rem;
          }
        }
        @media (min-width: 1280px) {
          .marquee-bleed {
            margin-left: -5rem;
            margin-right: -5rem;
          }
        }
      `}</style>

      <div className="flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-10 lg:py-8">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* Left — Headline */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#0a1a22]">
              THE WORLD'S LEADING<br />
              MENTORSHIP PLATFORM FOR<br />
              TOMORROW'S{' '}
              <span className="text-[#0098cc]">‹ GROWTH ›</span>
            </h1>
          </div>

          {/* Right — Profile + Goals */}
          <div className="flex flex-col justify-center items-start lg:items-end gap-4">

            {/* Profile progress row */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=10"
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-24 sm:w-28 h-2 rounded-full bg-[#e0f4fc] overflow-hidden">
                <div className="h-full w-[75%] bg-[#0098cc] rounded-full" />
              </div>
              <div className="w-8 h-8 rounded-full border border-[#0098cc] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0098cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Goals */}
            <div className="text-left lg:text-right">
              <p className="text-xs font-mono text-gray-400 mb-2 tracking-wide">
                4 PERSONAL DEVELOPMENT GOALS
              </p>
              <div className="flex flex-wrap justify-start lg:justify-end gap-2">
                {goals.map((goal, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#f0faff] text-[#0098cc] border border-[#0098cc]/20"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-[#0098cc]/20 mb-5" />

        {/* ── Marquee — bleeds edge to edge at every breakpoint ── */}
        <div className="overflow-hidden mb-5 marquee-bleed">
          <div className="marquee-track">
            {loopedProfiles.map((profile, idx) => (
              <div
                key={idx}
                className="mentor-card relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md
                           transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={profile.image}
                  alt={`Mentor ${profile.id}`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

          <p className="text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl">
            Connect with experienced mentors for personalized career guidance and professional development.
            Get unlimited access to expert mentors, unlock valuable opportunities, and accelerate your
            growth in a supportive, skills-driven community.
          </p>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => navigate('/top')}
              className="px-5 py-2.5 rounded-full border-2 border-[#0098cc] text-[#0098cc] text-sm font-medium hover:bg-[#f0faff] transition-colors"
            >
              Browse mentors
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-full bg-[#0098cc] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get started free
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


