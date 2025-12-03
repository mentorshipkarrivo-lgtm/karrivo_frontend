import React from 'react';
import { Phone, ArrowRight, Users, Target, TrendingUp } from 'lucide-react';

export default function MentorMenteePlatform() {
  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section - For Mentees */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold mb-4" style={{ color: '#0098cc' }}>
              For Mentees - Career Growth & Development
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#062117' }}>
              Find Your Perfect Mentor & Accelerate Your Growth
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Connect with experienced mentors who understand your goals. Get personalized guidance, 
              industry insights, and professional support to fast-track your career success.
            </p>
            <div className="flex gap-4">
              <button 
                className="px-8 py-4 rounded-lg text-white font-semibold transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#0098cc' }}
              >
                Browse Mentors
              </button>
              <button 
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:bg-gray-200 border-2"
                style={{ borderColor: '#062117', color: '#062117' }}
              >
                How It Works
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
              alt="Mentee learning"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
            
            {/* Help Card */}
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
              <h3 className="text-lg font-bold mb-2" style={{ color: '#062117' }}>
                Ready To Get Started?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Join thousands of mentees who are already learning from the best in the industry.
              </p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#0098cc' }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Contact Us</p>
                  <p className="text-lg font-bold" style={{ color: '#062117' }}>123-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - For Mentors */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image with Stats */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
              alt="Mentor teaching"
              className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
            />
            
            {/* Stats Card */}
            <div className="absolute -bottom-8 left-8 right-8 bg-white p-6 rounded-2xl shadow-xl">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="w-8 h-8" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#0098cc' }}>5000+</div>
                  <p className="text-xs text-gray-600">Active Mentees</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <div className="flex justify-center mb-2">
                    <Target className="w-8 h-8" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#0098cc' }}>95%</div>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="w-8 h-8" style={{ color: '#0098cc' }} />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#0098cc' }}>$150+</div>
                  <p className="text-xs text-gray-600">Avg. Hourly Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center mt-12 md:mt-0">
            <p className="text-sm font-semibold mb-4" style={{ color: '#0098cc' }}>
              For Mentors - Share Your Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#062117' }}>
              Become a Mentor & Make an Impact
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Share your knowledge and experience with the next generation of professionals. 
              Set your own schedule, earn extra income, and make a meaningful difference in someone's career journey.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0098cc' }}>
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Flexible scheduling - mentor on your own time</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0098cc' }}>
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Set your own rates and availability</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0098cc' }}>
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Build your personal brand and network</span>
              </li>
            </ul>
            <div>
              <button 
                className="px-8 py-4 rounded-lg text-white font-semibold transition-all hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                style={{ backgroundColor: '#0098cc' }}
              >
                Apply as Mentor
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}