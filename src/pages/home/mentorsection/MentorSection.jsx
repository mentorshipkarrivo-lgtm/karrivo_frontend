import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useFetchTopMentorsQuery } from "./mentorsectionapislice";

const MentorsSection = () => {
  const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 4 });

  console.log("API response:", data);

  const mentors = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="bg-[#062117] py-16 text-center text-white">
        Loading top mentors...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#062117] py-16 text-center text-red-500">
        Failed to load mentors
      </div>
    );
  }

  if (!mentors.length) {
    return (
      <div className="bg-[#062117] py-16 text-center text-white">
        No mentors found
      </div>
    );
  }

  return (
    <div className="bg-[#062117] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-[#ffffff] bg-clip-text text-transparent mb-3">
              Meet Our Top Mentors
            </h2>
            <p className="text-white/80">
              Learn from industry experts at leading tech companies
            </p>
          </motion.div>

          {/* Mentor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => {
              // Safely parse currentSkills as string and split
              let skillsArray = [];
              if (mentor.currentSkills) {
                skillsArray = mentor.currentSkills
                  .split(/[\n,;]+/)
                  .map((s) => s.trim())
                  .filter(Boolean);
              }

              return (
                <motion.div
                  key={mentor._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-xl transition-all"
                >
                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden">
                    <img
                      src={mentor.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"}
                      alt={mentor.fullName || "Mentor"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-[#062117] font-bold text-lg mb-1">
                      {mentor.fullName || "Unknown Mentor"}
                    </h3>
                    <p className="text-[#062117]/70 text-sm mb-2">
                      {mentor.currentRole || "Role not specified"}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skillsArray.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-[#062117] font-semibold">5.0</span>
                      </div>
                      <span className="text-sm text-[#062117]/70">
                        {mentor.yearsOfExperience || 0}+ yrs exp
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <button className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all">
                        Book Session
                      </button>
                      <button className="w-full border border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white py-2 rounded-lg transition-all">
                        Apply Scholarship
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;
