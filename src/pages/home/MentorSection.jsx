import React from "react";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

const mentors = [
  {
    name: "John Anderson",
    role: "Senior Software Engineer",
    company: "Tech Corp",
    rating: "4.9",
    sessions: "150+",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    skills: ["React", "Node.js", "AWS"]
  },
  {
    name: "Sarah Williams",
    role: "Product Manager",
    company: "Innovation Labs",
    rating: "4.8",
    sessions: "200+",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    skills: ["Strategy", "Agile", "UX"]
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    company: "AI Solutions",
    rating: "5.0",
    sessions: "180+",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    skills: ["Python", "ML", "TensorFlow"]
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    company: "Design Studio",
    rating: "4.9",
    sessions: "220+",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    skills: ["Figma", "UI/UX", "Prototyping"]
  }
];

const MentorsSection = () => {
  return (
    <div className="bg-[#062117] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent mb-3 md:mb-4">
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
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/15 hover:border-[#4db8a8]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <div className="relative">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-[#4db8a8]" />
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
            <button className="bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8]/20 hover:to-[#5ac8d8]/20 backdrop-blur-sm text-white border-2 border-white/30 hover:border-[#4db8a8]/50 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base">
              View All Mentors
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;