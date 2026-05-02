import React from 'react';
import { Phone, ArrowRight, Users, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MentorMenteePlatform() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 px-5" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top Section - For Mentees */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold mb-3" style={{ color: '#0098cc' }}>
              For Mentees - Career Growth & Development
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: '#062117' }}>
              Find Your Perfect Mentor & Accelerate Your Growth
            </h1>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Connect with experienced mentors who understand your goals. Get personalized guidance,
              industry insights, and professional support to fast-track your career success.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
              alt="Mentee learning"
              className="w-full h-[360px] object-cover rounded-2xl shadow-xl"
            />

            {/* Help Card */}
            <div className="absolute bottom-5 right-5 bg-white p-4 rounded-xl shadow-lg max-w-[220px]">
              <h3 className="text-sm font-bold mb-1" style={{ color: '#062117' }}>
                Ready To Get Started?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Join thousands of mentees already learning from the best.
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0098cc' }}
                >
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Us</p>
                  <p className="text-sm font-bold" style={{ color: '#062117' }}>123-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - For Mentors */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Image with Stats */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
              alt="Mentor teaching"
              className="w-full h-[300px] object-cover rounded-2xl shadow-xl"
            />

            {/* Stats Card */}
            <div className="absolute -bottom-6 left-5 right-5 bg-white p-4 rounded-xl shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Users className="w-5 h-5" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#0098cc' }}>5000+</div>
                  <p className="text-xs text-gray-500">Active Mentees</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <div className="flex justify-center mb-1">
                    <Target className="w-5 h-5" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#0098cc' }}>95%</div>
                  <p className="text-xs text-gray-500">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <TrendingUp className="w-5 h-5" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#0098cc' }}>$150+</div>
                  <p className="text-xs text-gray-500">Avg. Hourly Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center mt-10 md:mt-0">
            <p className="text-xs font-semibold mb-3" style={{ color: '#0098cc' }}>
              For Mentors - Share Your Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: '#062117' }}>
              Become a Mentor & Make an Impact
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Share your knowledge and experience with the next generation of professionals.
              Set your own schedule, earn extra income, and make a meaningful difference.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Flexible scheduling - mentor on your own time',
                'Set your own rates and availability',
                'Build your personal brand and network',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#0098cc' }}
                  >
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <button
                className="px-6 py-3 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                style={{ backgroundColor: '#0098cc' }}
                onClick={() => navigate('/mentee/apply')}
              >
                Apply as Mentor
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}