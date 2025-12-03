import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    date: "15 January, 2025",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    text: "This mentorship program completely transformed my career trajectory. My mentor provided invaluable guidance that helped me navigate complex challenges and develop skills I never thought possible. The personalized approach made all the difference in my professional growth.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    date: "12 January, 2025",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    text: "I gained so much confidence through this mentorship experience. My mentor's expertise and encouragement helped me land my dream job. The practical advice and real-world insights were exactly what I needed to take the next step in my career.",
  },
  {
    id: 3,
    name: "Michael Chen",
    date: "10 January, 2025",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    text: "Working with my mentor was an incredible journey of self-discovery and professional development. The structured guidance and thoughtful feedback helped me identify my strengths and work on areas that needed improvement. Highly recommend this program!",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    date: "8 January, 2025",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    text: "The mentorship I received was beyond my expectations. My mentor took genuine interest in my goals and provided actionable strategies that led to tangible results. This experience has been instrumental in shaping my professional path forward.",
  },
  {
    id: 5,
    name: "David Kumar",
    date: "5 January, 2025",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    text: "As someone new to the industry, having a mentor made all the difference. The knowledge transfer, networking opportunities, and constant support helped me overcome imposter syndrome and build genuine confidence in my abilities.",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    date: "3 January, 2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    text: "This mentorship program exceeded all my expectations. The personalized attention and industry insights I gained were invaluable. My mentor helped me develop a clear career roadmap and provided the tools to achieve my professional goals.",
  },
  {
    id: 7,
    name: "Robert Williams",
    date: "1 January, 2025",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    text: "I'm grateful for the wisdom and guidance my mentor shared throughout this journey. The practical advice on leadership, technical skills, and career advancement has been transformative. This program is worth every moment invested.",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    date: "28 December, 2024",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    text: "The mentorship experience helped me transition into a new field with confidence. My mentor's patient guidance and industry connections opened doors I didn't know existed. This program truly invested in my success.",
  },
  {
    id: 9,
    name: "James Taylor",
    date: "25 December, 2024",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    text: "Having a dedicated mentor who genuinely cared about my growth was life-changing. The regular check-ins, constructive feedback, and encouragement kept me motivated and focused on achieving my career aspirations.",
  },
  {
    id: 10,
    name: "Maria Garcia",
    date: "22 December, 2024",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    text: "This mentorship program provided exactly what I needed at a crucial point in my career. The combination of technical guidance, soft skills development, and moral support helped me become a more well-rounded professional.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-0 bg-[#062117] relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(77, 184, 168, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(77, 184, 168, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <motion.div className="text-center mb-12 md:mb-16">
            {/* Badge */}
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
              <span className="w-2 h-2 bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">
                Success Stories
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent leading-tight">
              What Our Mentees Say
            </motion.h2>

            {/* Description */}
            <motion.p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Join thousands of mentees who have transformed their careers through our program.{" "}
              <span className="bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent font-semibold">
                Real experiences
              </span>{" "}
              from real professionals who achieved their goals with expert guidance.
            </motion.p>
          </motion.div>

          {/* Carousel Section */}
          <div className="relative">
            <div className="relative" style={{ overflow: "visible" }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                speed={600}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 80,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: ".owl-next",
                  prevEl: ".owl-prev",
                }}
                pagination={{
                  el: ".owl-dots",
                  clickable: true,
                  dynamicBullets: false,
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                onSwiper={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                className="!overflow-visible !py-8"
                style={{
                  paddingBottom: "80px",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 0,
                      modifier: 1,
                    },
                  },
                  768: {
                    slidesPerView: 2,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 50,
                      depth: 100,
                      modifier: 1,
                    },
                  },
                  1024: {
                    slidesPerView: 3,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 80,
                      depth: 200,
                      modifier: 1,
                    },
                  },
                }}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide
                    key={testimonial.id}
                    style={{ width: "100%", maxWidth: "600px" }}
                  >
                    {({ isActive, isPrev, isNext }) => (
                      <motion.div
                        className={`
                          transition-all duration-500
                          ${!isActive && !isPrev && !isNext
                            ? "invisible opacity-0"
                            : "visible opacity-100"
                          }
                        `}
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                          isActive={isActive}
                        />
                      </motion.div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 pointer-events-none z-[100]">
              <motion.button
                type="button"
                role="presentation"
                className="owl-prev pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                role="presentation"
                className="owl-next pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl 
        transition-all duration-500 ease-out
        group
        ${isActive
          ? "bg-white/90 backdrop-blur-xl border-2 border-transparent bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] p-[2px] scale-100 opacity-100"
          : "bg-white/55 backdrop-blur-md border border-white/40 shadow-lg scale-95 opacity-75"
        }
        w-full max-w-[500px] sm:max-w-[420px] md:max-w-[460px] lg:min-w-[500px]
        min-h-[120px] sm:min-h-[100px] md:min-h-[110px]
      `}
    >
      <div className={`${isActive ? 'bg-white rounded-2xl' : ''} w-full h-full`}>
        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-7">
          {/* Header Section */}
          <div className="flex items-start gap-4 mb-5">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <img
                src={testimonial.image}
                className={`
                  relative w-24 h-24 md:w-16 md:h-16
                  rounded-full object-cover
                  transition-all duration-500
                  border-2
                  ${isActive
                    ? "border-transparent bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] p-[2px]"
                    : "border-gray-200"
                  }
                `}
                alt={testimonial.name}
              />
            </div>

            {/* User Info */}
            <div className="flex-grow min-w-0">
              <h4
                className={`
                  text-base md:text-lg font-bold
                  transition-colors duration-500
                  truncate
                  ${isActive ? "bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent" : "text-gray-700"}
                `}
              >
                {testimonial.name}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">{testimonial.date}</p>
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="relative mb-5">
            {/* Quote Icon */}
            <div
              className={`
                absolute -left-2 -top-2 w-8 h-8
                transition-all duration-500
                ${isActive ? "text-[#4db8a8]/30" : "text-gray-200"}
              `}
            >
              <svg fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>

            <p
              className={`
                text-xs md:text-sm
                leading-relaxed
                pl-8
                transition-all duration-500
                ${isActive ? "text-gray-700" : "text-gray-600"}
              `}
            >
              {testimonial.text}
            </p>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100 
            transition-opacity duration-700
            bg-gradient-to-br from-[#4db8a8]/5 via-transparent to-[#5ac8d8]/5
            pointer-events-none
          `}
        />

        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
          style={{ transition: "transform 1.5s ease-in-out" }}
        />

        {/* Corner Decoration */}
        <div
          className={`
            absolute bottom-0 right-0 w-24 h-24
            transition-opacity duration-500
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
        >
          <svg className="w-full h-full text-[#4db8a8]/10" viewBox="0 0 100 100">
            <circle cx="80" cy="80" r="40" fill="currentColor" />
            <circle
              cx="80"
              cy="80"
              r="25"
              fill="currentColor"
              className="opacity-60"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;