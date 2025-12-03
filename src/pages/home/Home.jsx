// import React, { useState, useEffect, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Search, ChevronRight, Star, Users, Award, TrendingUp } from 'lucide-react';
// import TestimonialsSection from './Testimonals';
// import MentorsSection from './MentorSection';
// import FooterLinks from './HomeFoot';
// import FindMentor from './FindMentor';
// import Navbar from '../../global/Navbar';
// import AboutPage from '../aboutUs/About';
// import MentorBlogGrid from '../topMentors/mentors';
// import FindTopMentors from '../topMentors/mentors';
// // Lazy loaded
// const Threads = React.lazy(() => import('../../global/Threads'));

// const Home = () => {
//   const navigate = useNavigate();
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const texts = ['ML & AI', 'Data Science', 'Web Development', 'Mobile Apps', 'Cloud Computing'];
//   const typingSpeed = 150;
//   const deletingSpeed = 100;
//   const pauseDuration = 2000;

//   // Typing animation effect
//   useEffect(() => {
//     const currentText = texts[currentIndex];

//     const timer = setTimeout(() => {
//       if (!isDeleting) {
//         if (displayedText.length < currentText.length) {
//           setDisplayedText(currentText.slice(0, displayedText.length + 1));
//         } else {
//           setTimeout(() => setIsDeleting(true), pauseDuration);
//         }
//       } else {
//         if (displayedText.length > 0) {
//           setDisplayedText(displayedText.slice(0, -1));
//         } else {
//           setIsDeleting(false);
//           setCurrentIndex((prev) => (prev + 1) % texts.length);
//         }
//       }
//     }, isDeleting ? deletingSpeed : typingSpeed);

//     return () => clearTimeout(timer);
//   }, [displayedText, isDeleting, currentIndex]);

//   const categories = [
//     'Engineering',
//     'Design',
//     'Startup',
//     'AI Mentors',
//     'Product',
//     'Marketing',
//     'Leadership',
//     'Career'
//   ];

//   const quickLinks = [
//     'Product Managers',
//     'Career Coaches',
//     'Software Engineers',
//     'Leadership Mentors',
//     'UX Designers',
//     'Data Scientists',
//     'Startup Founders'
//   ];

//   const mentors = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Senior ML Engineer',
//       company: 'Google',
//       rating: 4.9,
//       sessions: 150,
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
//       skills: ['Machine Learning', 'Python', 'TensorFlow']
//     },
//     {
//       name: 'Michael Chen',
//       role: 'AI Research Scientist',
//       company: 'OpenAI',
//       rating: 5.0,
//       sessions: 200,
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
//       skills: ['Deep Learning', 'NLP', 'Research']
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Data Science Lead',
//       company: 'Meta',
//       rating: 4.8,
//       sessions: 180,
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
//       skills: ['Data Analysis', 'ML', 'Statistics']
//     },
//     {
//       name: 'David Kim',
//       role: 'ML Platform Engineer',
//       company: 'Amazon',
//       rating: 4.9,
//       sessions: 120,
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
//       skills: ['MLOps', 'Cloud', 'Kubernetes']
//     }
//   ];

//   const stats = [
//     { icon: Users, value: '10,000+', label: 'Active Mentors' },
//     { icon: Star, value: '4.9/5', label: 'Average Rating' },
//     { icon: Award, value: '50,000+', label: 'Sessions Completed' },
//     { icon: TrendingUp, value: '95%', label: 'Success Rate' }
//   ];

//   const handleJoinRevolution = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="outer-container">
//       {/* Hero Section with Mentorloop Design */}
//       <div className="min-h-screen bg-[#062117] relative overflow-hidden">

//         <Navbar />
//         {/* Top Navigation */}
//         <div className="container mx-auto px-4 py-4 relative z-10">
//           <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 className="whitespace-nowrap text-white/90 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
//               >
//                 {category}
//               </button>
//             ))}
//             <button className="p-1.5 hover:bg-white/10 rounded-lg transition-all duration-300 flex-shrink-0">
//               <ChevronRight className="w-4 h-4 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* Hero Content */}
//         <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             {/* Main Heading with Animation */}
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1.2, ease: 'easeOut' }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
//             >
//               <span className="text-white">1-on-1 Mentorship in</span>
//               <br />
//               <span className="text-[#4db8a8] inline-block min-h-[1.2em]">
//                 {displayedText}
//                 <span className="animate-pulse ml-1">|</span>
//               </span>
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.3 }}
//               className="text-sm sm:text-base md:text-lg text-white/80 mb-8 md:mb-10 px-4"
//             >
//               Learn a new skill, launch a project, land your dream career.
//             </motion.p>

//             {/* Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto mb-8 md:mb-10 px-4"
//             >
//               <div className="relative flex-1 w-full">
//                 <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 md:w-5 md:h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by company, skills or role"
//                   className="w-full bg-transparent border-2 border-white/30 rounded-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
//                 />
//               </div>
//               <button
//                 onClick={handleJoinRevolution}
//                 className="w-full sm:w-auto bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] hover:from-[#5ac8d8] hover:to-[#4db8a8] text-white font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap text-sm md:text-base"
//               >
//                 Find mentors
//               </button>
//             </motion.div>

//             {/* Quick Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.7 }}
//               className="flex flex-wrap items-center justify-center gap-2 px-4"
//             >
//               {quickLinks.map((link, index) => (
//                 <button
//                   key={index}
//                   className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
//                 >
//                   {link}
//                 </button>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Threads Animation */}
//         <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[500px] pointer-events-none">
//           <div className="w-full h-full relative opacity-40">
//             <Suspense fallback={<div>Loading...</div>}>
//               <Threads
//                 amplitude={1.5}
//                 distance={0}
//                 enableMouseInteraction={true}
//               />
//             </Suspense>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-[#062117] py-12 md:py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-gradient-to-br hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 group"
//                 >
//                   <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#4db8a8] group-hover:text-[#5ac8d8] mx-auto mb-2 md:mb-3 transition-colors duration-300" />
//                   <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-1 md:mb-2">{stat.value}</div>
//                   <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <TestimonialsSection />
//    {/* <FindTopMentors /> */}

//       <MentorsSection />
//       <AboutPage />
//       <FindMentor />
//       <FooterLinks />


//     </div >
//   );
// };

// export default Home;



import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import TestimonialsSection from './Testimonals'
import ScrollVelocity from './Scrollvelocity';

import MentorsSection from './MentorSection';
import FooterLinks from './HomeFoot';
import FindMentor from './FindMentor';
import Navbar from '../../global/Navbar';
import AboutPage from '../aboutUs/About';
import MentorBlogGrid from '../topMentors/mentors';
import FindTopMentors from '../topMentors/mentors';
import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';
import ContactSection from './HomeContact';
import MentorGrid from './HomeContact';
import FAQAccordion from './faqs';
import MentoHero from './Scrollvelocity';
import MentorDiscovery from './mentorCategory';
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

  const velocity = 12;

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

  // Updated categories with routes
  const categories = [
    { name: 'Engineering Mentors', path: '/engineering' },
    { name: 'Top Mentors', path: '/top' },
    { name: 'Startup Mentors', path: '/startup' },
    { name: 'Product Mentors', path: '/product' },
    { name: 'Marketing Mentors', path: '/marketing' },
    { name: 'Leadership Mentors', path: '/leadership' },
    { name: 'Career Mentors ', path: '/career' },
    { name: 'AI Mentors', path: '/ai-mentors' }
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

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="outer-container">
      {/* Hero Section with Mentorloop Design */}
      <div className="min-h-screen bg-[#062117] relative overflow-hidden pt-14 md:pt-20">

        {/* <Navbar /> */}
        {/* Top Navigation */}
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.path)}
                className="whitespace-nowrap text-white/90 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
              >
                {category.name}
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
      <div className="bg-[#062117] py-12 md:py-16">
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
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-gradient-to-br hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 group"
                >
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#4db8a8] group-hover:text-[#5ac8d8] mx-auto mb-2 md:mb-3 transition-colors duration-300" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MentorMenteeHero />

      <MentorsSection />
      <AboutPage />
      <MentorGrid />
      <TestimonialsSection />
      <FAQAccordion />
      <MentoHero />
      <MentorDiscovery/>

      <FindMentor />






    </div >
  );
};

export default Home;









