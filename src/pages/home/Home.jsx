import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

import TestimonialsSection from './Testimonals';
import MentorsSection from './mentorsection/MentorSection';
import FindMentor from './FindMentor';
import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
import MentorGrid from './HomeContact';
import FAQAccordion from './faqs';
import MentoHero from './Scrollvelocity';
import HeroSection from './HeroSection ';
import StepsSection from "./Stepsections";
import MentorUI from "./mentorsections";
import MentorHero from "./mentorsections";
import MentorConnect from "./Subsectoin";

const TYPING_CONFIG = {
  texts: ["ML & AI", "Data Science", "Web Development", "Mobile Apps", "Cloud Computing"],
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 1000,
};

const MENTOR_PROFILES = [
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/75.jpg",
  "https://randomuser.me/api/portraits/men/78.jpg",
  "https://randomuser.me/api/portraits/women/78.jpg",
  "https://randomuser.me/api/portraits/men/79.jpg",
  "https://randomuser.me/api/portraits/women/79.jpg",
];


const CATEGORIES = [
  { name: "All Mentors", path: "/Allmentors" },
  { name: "Engineering", path: "/engineering" },
  { name: "Top Mentors", path: "/top" },
  { name: "Startup", path: "/startup" },
  { name: "Product", path: "/product" },
  { name: "Marketing", path: "/marketing" },
  { name: "Leadership", path: "/leadership" },
  { name: "AI Mentors", path: "/ai-mentors" },
];

const QUICK_LINKS = [
  "Engineering",
  "Startup",
  "Product",
  "Leadership",
  "AI Mentors",
];

const useTypingAnimation = (texts, config) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const { typingSpeed, deletingSpeed, pauseDuration } = config;

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
  }, [displayedText, isDeleting, currentIndex, texts, config]);

  return displayedText;
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const displayedText = useTypingAnimation(TYPING_CONFIG.texts, TYPING_CONFIG);
  const isSearchValid = searchQuery.trim().length > 1;

  // ✅ Fixed: now properly called from onClick
  const handleCategoryClick = (path) => navigate(path);
  const handleQuickLinkClick = (link) => navigate(`/search?q=${encodeURIComponent(link)}`);

  const handleFindMentors = (e) => {
    e.preventDefault();
    if (!isSearchValid) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          {/* <div className="pt-8 pb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.path)} // ✅ FIXED
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 shadow-sm hover:shadow border border-gray-200 hover:border-indigo-300"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div> */}

          {/* Main Content */}
          <div className="pt-20 pb-20 text-center">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight"
            >
              Connect with{" "}
              <span className="bg-[#0098cc] bg-clip-text text-transparent">
                Expert Mentors
              </span>
            </motion.h1>

            {/* Typing Animation Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-600 mb-4"
            >
              Accelerate Your Growth in{" "}
              <span className="font-semibold text-[#0098cc]">
                {displayedText || "Tech"}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Get personalized 1-on-1 guidance from industry leaders. Learn new skills, launch projects, and land your dream career.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <form onSubmit={handleFindMentors} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for mentors by skill, role, or industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg text-base transition-all border-none"
                />
                <button
                  type="submit"
                  disabled={!isSearchValid}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${isSearchValid
                    ? "bg-[#0098cc] text-white hover:bg-[#0098cc] shadow-md border-none"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed border-none"
                    }`}
                >
                  Find Mentors
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {searchQuery.length > 0 && !isSearchValid && (
                <p className="text-sm text-red-500 mt-2 text-left ml-4">
                  Please enter at least 2 characters to search
                </p>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-12"
            >
              <span className="text-sm text-gray-500">Popular searches:</span>
              {QUICK_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleQuickLinkClick(link)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 shadow-sm border border-gray-200 hover:border-indigo-300"
                >
                  {link}
                </button>
              ))}
            </motion.div>

            {/* Mentor Avatars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center items-center gap-3"
            >
              <div className="flex -space-x-3">
                {MENTOR_PROFILES.map((profile, index) => (
                  <motion.img
                    key={index}
                    src={profile}
                    alt={`Mentor ${index + 1}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  />
                ))}
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-semibold text-gray-900">10,000+ Expert Mentors</p>
                <p className="text-xs text-gray-500">Ready to guide you</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <HeroSection />
      {/* <MentorsSection /> */}
      <StepsSection />
      <TestimonialsSection />
      <FAQAccordion />
        <MentorConnect/>
      {/* <MentoHero /> */}
      {/* <FindMentor /> */}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Home;




