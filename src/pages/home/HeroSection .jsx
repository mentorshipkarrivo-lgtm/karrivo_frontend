

import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function HeroSection() {

  const navigate = useNavigate()
 

  
const profiles = [
  { id: 1, highlight: 'lime',   image: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: 2, highlight: null,     image: 'https://randomuser.me/api/portraits/women/75.jpg' },
  { id: 3, highlight: null,     image: 'https://randomuser.me/api/portraits/men/78.jpg' },
  { id: 4, highlight: null,     image: 'https://randomuser.me/api/portraits/women/78.jpg' },
  { id: 5, highlight: 'orange', image: 'https://randomuser.me/api/portraits/men/79.jpg' },
  { id: 6, highlight: null,     image: 'https://randomuser.me/api/portraits/women/79.jpg' },
];







  const goals = ['CAREER GROWTH', 'LEADERSHIP', 'NETWORKING', 'SKILL-BUILDING'];

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#062117' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Main Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              THE WORLD'S LEADING<br />
              MENTORSHIP PLATFORM FOR<br />
              TOMORROW'S <span style={{ color: '#0098cc' }}>‹ GROWTH ›</span>
            </h1>
          </div>

          {/* Right: User Info & Goals */}
          <div className="flex flex-col items-end space-y-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: '#0098cc' }}>
                <img
                  src="https://i.pravatar.cc/150?img=10"
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: '#0098cc' }}></div>
                </div>
                <svg className="w-6 h-6" style={{ color: '#0098cc' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6" />
                </svg>
              </div>

              {/* Target Icon */}
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#0098cc' }}>
                <svg className="w-5 h-5" style={{ color: '#0098cc' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Development Goals */}
            <div className="text-right">
              <p className="text-gray-400 text-sm font-mono mb-2">4 PERSONAL DEVELOPMENT GOALS</p>
              <div className="flex flex-wrap justify-end gap-2">
                {goals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-mono border rounded-full text-gray-300"
                    style={{ borderColor: '#0098cc' }}
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px mb-12" style={{ backgroundColor: '#0098cc', opacity: 0.3 }}></div>

        {/* Mentor Profile Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex justify-center">
              <div
                className="w-32 h-40 rounded-2xl overflow-hidden border-4 transition-transform hover:scale-105 cursor-pointer"
                style={{
                  borderColor: profile.highlight === 'lime' ? '#0098cc' :
                    profile.highlight === 'orange' ? '#0098cc' : '#1a3a32',
                  backgroundColor: profile.highlight === 'lime' ? '#0098cc' :
                    profile.highlight === 'orange' ? '#0098cc' : '#0d2620'
                }}
              >
                <img
                  src={profile.image}
                  alt={`Mentor ${profile.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Description Text */}
        <div className="max-w-2xl mb-8">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Connect with experienced mentors for personalized career guidance and professional development.
            Get unlimited access to expert mentors, unlock valuable opportunities, and accelerate your
            growth in a supportive, skills-driven community.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-full border-2 text-white font-medium hover:bg-gray-800 transition-colors"
            style={{ borderColor: '#0098cc' }}
            onClick={() => navigate("/top")}

          >
            Browse mentors
          </button>
          <button
            className="px-6 py-3 rounded-full font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#0098cc', color: '#ffffff' }}
            onClick={() => navigate("/login")}
          >
            Get started free
          </button>
        </div>
      </div>
    </div>
  );
}