import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  { 
    id: 1, 
    text: "I'd been applying blindly for eight months with zero callbacks. My mentor overhauled my resume, coached my PM case studies, and I had three offers within six weeks.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=5",
    name: "Neha R.",
    role: "APM → PM · Bengaluru"
  },
  { 
    id: 2, 
    text: "Six months ago I couldn't reverse a linked list. My mentor gave me a weekly plan, reviewed my code every session, and I signed with a product company at 2.4× my last CTC.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=15",
    name: "Arjun K.",
    role: "SDE I → SDE II · Hyderabad"
  },
  { 
    id: 3, 
    text: "My mentor didn't just teach — she helped me find a problem worth solving, turned it into a portfolio project, and connected me to her network. That's how I landed my first DS role.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=9",
    name: "Sana P.",
    role: "Analyst → Data Scientist · Mumbai"
  },
  { 
    id: 4, 
    text: "I was switching from mechanical engineering to frontend dev. My mentor gave me a structured 90-day roadmap, reviewed my projects weekly, and helped me crack my first React role at a funded startup.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=21",
    name: "Rahul M.",
    role: "Mech Eng → Frontend Dev · Pune"
  },
  { 
    id: 5, 
    text: "The mock interviews my mentor ran were tougher than the real ones. I walked into every interview confident. Placed at a Series B startup within 2 months of joining Karrivo.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=32",
    name: "Divya S.",
    role: "Fresher → SDE · Chennai"
  },
  { 
    id: 6, 
    text: "My mentor helped me go from zero to deploying my first ML model in production. The guidance on system design and model serving was something no course ever taught me.", 
    rating: 4, 
    image: "https://i.pravatar.cc/100?img=44",
    name: "Karan T.",
    role: "ML Intern → ML Engineer · Delhi"
  },
  { 
    id: 7, 
    text: "I'd been a backend dev for 3 years but always avoided system design. My mentor broke it down session by session. I cleared the Flipkart SDE-3 round I had failed twice before.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=53",
    name: "Priya V.",
    role: "SDE II → SDE III · Bengaluru"
  },
  { 
    id: 8, 
    text: "Karrivo matched me with a mentor who had the exact career path I wanted. Three months of focused sessions and I had an offer from the company I had dreamed of joining for two years.", 
    rating: 5, 
    image: "https://i.pravatar.cc/100?img=60",
    name: "Aditya N.",
    role: "Junior Dev → Product Engineer · Hyderabad"
  },
];

const CARDS_PER_PAGE = 3;

const Testimonials = () => {
  const containerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(REVIEWS.length / CARDS_PER_PAGE);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const transforms = [y1, y2, y3];

  const visibleReviews = REVIEWS.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage(p => p + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(p => p - 1);
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto py-20 px-6">
      
      <motion.div 
        style={{ y: y1 }}
        className="text-center mb-16"
      >
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">
          What mentees say about their mentors
        </h2>
      </motion.div>

      <div className="flex items-center justify-between gap-4 md:gap-8 relative">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          disabled={page === 0}
          className="hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{
            borderColor: page === 0 ? '#e5e7eb' : '#1a1a2e',
            color: page === 0 ? '#d1d5db' : '#1a1a2e',
            cursor: page === 0 ? 'not-allowed' : 'pointer',
            background: page === 0 ? 'transparent' : '#1a1a2e',
            color: page === 0 ? '#d1d5db' : '#ffffff',
          }}
        >
          ←
        </button>

        {/* Cards */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  style={{ y: transforms[index] }}
                  className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg flex flex-col items-center text-center relative mt-8 hover:-translate-y-2 transition-transform duration-300"
                >
                  <p className="text-sm text-gray-600 font-medium leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>

                  <div className="flex gap-1 text-[#facc15] text-lg mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>

                  {/* Name & Role above avatar */}
                  <div className="mb-8">
                    <p className="text-xs font-bold text-[#1a1a2e]">{review.name}</p>
                    <p className="text-xs text-[#0098cc] mt-0.5">{review.role}</p>
                  </div>

                  {/* User Avatar - Overlapping bottom */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#f0f9f1] overflow-hidden shadow-sm">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          disabled={page === totalPages - 1}
          className="hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{
            borderColor: page === totalPages - 1 ? '#e5e7eb' : '#1a1a2e',
            background: page === totalPages - 1 ? 'transparent' : '#1a1a2e',
            color: page === totalPages - 1 ? '#d1d5db' : '#ffffff',
            cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-14">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
            style={{
              width: i === page ? '24px' : '8px',
              height: '8px',
              borderRadius: i === page ? '4px' : '50%',
              background: i === page ? '#0098cc' : '#cde8f4',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Testimonials;