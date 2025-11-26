import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Star, Users, Award, TrendingUp } from 'lucide-react';

// Lazy loaded
const Threads = React.lazy(() => import('../../global/Threads'));

const Home = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 2000;

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIndex]);

  const categories = [
    'Engineering',
    'Design',
    'Startup',
    'AI Mentors',
    'Product',
    'Marketing',
    'Leadership',
    'Career'
  ];

  const quickLinks = [
    'Product Managers',
    'Career Coaches',
    'Software Engineers',
    'Leadership Mentors',
    'UX Designers',
    'Data Scientists',
    'Startup Founders'
  ];

  const mentors = [
    {
      name: 'Sarah Johnson',
      role: 'Senior ML Engineer',
      company: 'Google',
      rating: 4.9,
      sessions: 150,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      skills: ['Machine Learning', 'Python', 'TensorFlow']
    },
    {
      name: 'Michael Chen',
      role: 'AI Research Scientist',
      company: 'OpenAI',
      rating: 5.0,
      sessions: 200,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      skills: ['Deep Learning', 'NLP', 'Research']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Science Lead',
      company: 'Meta',
      rating: 4.8,
      sessions: 180,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      skills: ['Data Analysis', 'ML', 'Statistics']
    },
    {
      name: 'David Kim',
      role: 'ML Platform Engineer',
      company: 'Amazon',
      rating: 4.9,
      sessions: 120,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      skills: ['MLOps', 'Cloud', 'Kubernetes']
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Mentors' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Award, value: '50,000+', label: 'Sessions Completed' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  const handleJoinRevolution = () => {
    navigate('/login');
  };

  return (
    <div className="outer-container">
      {/* Hero Section with Mentorloop Design */}
      <div className="min-h-screen bg-[#062117] relative overflow-hidden">
        {/* Top Navigation */}
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className="whitespace-nowrap text-white/90 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
              >
                {category}
              </button>
            ))}
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition-all duration-300 flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading with Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            >
              <span className="text-white">1-on-1 Mentorship in</span>
              <br />
              <span className="text-[#4db8a8] inline-block min-h-[1.2em]">
                {displayedText}
                <span className="animate-pulse ml-1">|</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white/80 mb-8 md:mb-10 px-4"
            >
              Learn a new skill, launch a project, land your dream career.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto mb-8 md:mb-10 px-4"
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by company, skills or role"
                  className="w-full bg-transparent border-2 border-white/30 rounded-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
                />
              </div>
              <button
                onClick={handleJoinRevolution}
                className="w-full sm:w-auto bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] hover:from-[#5ac8d8] hover:to-[#4db8a8] text-white font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap text-sm md:text-base"
              >
                Find mentors
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-2 px-4"
            >
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  {link}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Threads Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[500px] pointer-events-none">
          <div className="w-full h-full relative opacity-40">
            <Suspense fallback={<div>Loading...</div>}>
              <Threads
                amplitude={1.5}
                distance={0}
                enableMouseInteraction={true}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-[#0a2f2f] to-[#0d3d3d] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#4db8a8] mx-auto mb-2 md:mb-3" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Mentors Section */}
      <div className="bg-gradient-to-b from-[#0d3d3d] to-[#0a2f2f] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Meet Our Top Mentors
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg">
                Learn from industry experts at leading tech companies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-40 md:h-48 object-cover"
                    />
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-0.5 md:py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs md:text-sm font-semibold text-gray-800">{mentor.rating}</span>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{mentor.name}</h3>
                    <p className="text-[#4db8a8] font-medium text-sm md:text-base mb-1">{mentor.role}</p>
                    <p className="text-white/60 text-xs md:text-sm mb-3">{mentor.company}</p>

                    <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm mb-3 md:mb-4">
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{mentor.sessions} sessions</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                      {mentor.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-[#4db8a8]/20 text-[#4db8a8] text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-[#4db8a8]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] hover:from-[#5ac8d8] hover:to-[#4db8a8] text-white font-semibold py-2 md:py-2.5 rounded-full transition-all duration-300 hover:shadow-lg text-xs md:text-sm">
                      Book Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-8 md:mt-12"
            >
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base">
                View All Mentors
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-[#0a2f2f] to-[#0d3d3d] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Ready to accelerate your career?
            </h2>
            <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8">
              Join thousands of professionals learning from the best mentors in the industry
            </p>
            <button
              onClick={handleJoinRevolution}
              className="bg-white hover:bg-gray-100 text-[#0d3d3d] font-bold px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base lg:text-lg"
            >
              Get Started Today
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;