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

  // Triple for seamless infinite loop
  const loopedProfiles = [...profiles, ...profiles, ...profiles];

  const goals = ['CAREER GROWTH', 'LEADERSHIP', 'NETWORKING', 'SKILL-BUILDING'];

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">

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
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Left */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0a1a22]">
              THE WORLD'S LEADING<br />
              MENTORSHIP PLATFORM FOR<br />
              TOMORROW'S <span className="text-[#0098cc]">‹ GROWTH ›</span>
            </h1>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <img
                  src="https://i.pravatar.cc/150?img=10"
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 rounded-full bg-[#e0f4fc] overflow-hidden">
                  <div className="h-full w-[75%] bg-[#0098cc] rounded-full" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#0098cc] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0098cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-mono text-gray-500 mb-2">
                4 PERSONAL DEVELOPMENT GOALS
              </p>
              <div className="flex flex-wrap justify-end gap-2">
                {goals.map((goal, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-[#f0faff] text-[#0098cc] border border-[#0098cc]/20"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-12 bg-[#0098cc]/30" />

        {/* ── Infinite Scroll Marquee ── */}
        <div className="overflow-hidden mb-10 cursor-default">
          <div className="marquee-track">
            {loopedProfiles.map((profile, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 rounded-3xl overflow-hidden shadow-lg
                           transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  width: '160px',
                  height: '210px',
                  marginRight: '20px',
                }}
              >
                <img
                  src={profile.image}
                  alt={`Mentor ${profile.id}`}
                  className="w-full h-full object-cover object-top"
                />
                {/* gradient: stronger at bottom so faces stay clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-8">
          <p className="text-sm sm:text-base leading-relaxed text-gray-600">
            Connect with experienced mentors for personalized career guidance and professional development.
            Get unlimited access to expert mentors, unlock valuable opportunities, and accelerate your
            growth in a supportive, skills-driven community.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#f0faff] transition"
            onClick={() => navigate("/top")}
          >
            Browse mentors
          </button>
          <button
            className="px-6 py-3 rounded-full bg-[#0098cc] text-white hover:opacity-90 transition"
            onClick={() => navigate("/login")}
          >
            Get started free
          </button>
        </div>

      </div>
    </div>
  );
}