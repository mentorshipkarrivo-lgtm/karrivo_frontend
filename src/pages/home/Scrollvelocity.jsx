


import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MentoHero() {

  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#062117' }}>
      {/* Decorative curved lines */}
      <svg className="absolute top-10 left-20 opacity-40" width="200" height="150" viewBox="0 0 200 150">
        <path
          d="M 10 75 Q 50 25, 100 75 T 190 75"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      <svg className="absolute top-20 right-10 opacity-40" width="300" height="200" viewBox="0 0 300 200">
        <path
          d="M 20 100 Q 80 30, 150 100 T 280 100"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      <svg className="absolute bottom-40 left-1/3 opacity-40" width="250" height="180" viewBox="0 0 250 180">
        <path
          d="M 10 90 Q 70 20, 130 90 T 240 90"
          fill="none"
          stroke="#0098cc"
          strokeWidth="2"
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">

          {/* Left Column - Small intro text */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <p className="text-white text-sm sm:text-base">
                We are <span className="font-semibold">GrowthMentor</span>,
              </p>
              <p className="text-white text-sm sm:text-base">
                a <span style={{ color: '#0098cc' }}>Karrivo mentorship platform</span>, connecting
              </p>
              <p className="text-white text-sm sm:text-base">
                and empowering professionals
              </p>
              <p className="text-white text-sm sm:text-base">
                worldwide.
              </p>
            </div>
          </div>

          {/* Center Column - Large headline */}
          <div className="lg:col-span-6 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              Growth
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              through
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight relative inline-block">
              mentorship.
              {/* Curved underline */}
              <svg
                className="absolute -bottom-4 left-0 w-full"
                height="30"
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M 10 15 Q 200 5, 390 15"
                  fill="none"
                  stroke="#0098cc"
                  strokeWidth="3"
                />
              </svg>
            </h1>
          </div>

          {/* Right Column - Description text */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We believe no one should navigate their career alone.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                At a software studio, we're only as good as our ability to help others succeed. We offer unlimited mentorship sessions to accelerate your growth.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            className="px-8 py-4 rounded-full border-2 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
            style={{ borderColor: '#0098cc' }}
            onClick={() => navigate("/top")}
          >
            Browse mentors
          </button>
          <button
            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: '#0098cc', color: 'white' }}
            onClick={() => navigate("/login")}
          >
            Get started free
          </button>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div
        className="absolute bottom-10 right-20 w-3 h-3 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
      <div
        className="absolute top-1/3 left-10 w-2 h-2 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full opacity-60"
        style={{ backgroundColor: '#0098cc' }}
      ></div>
    </div>
  );
}