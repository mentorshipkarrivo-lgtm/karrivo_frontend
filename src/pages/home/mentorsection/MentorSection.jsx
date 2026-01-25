import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { useFetchTopMentorsQuery } from "./mentorsectionapislice";
import { useNavigate } from "react-router-dom";

const MentorsSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchTopMentorsQuery({ limit: 4 });

  const mentors = Array.isArray(data) ? data : [];
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleBookSession = (mentor) => {
    if (!isLoggedIn) {
      navigate(`/login?mentorId=${mentor._id}`);
    } else {
      navigate(`/book-session?mentorId=${mentor._id}`);
    }
  };

  const handleViewProfile = (mentor) => {
    navigate(`/mentor-profile/${mentor._id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-[#062117] py-16 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
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

  return (
    <div className="bg-[#062117] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0098cc] to-white bg-clip-text text-transparent">
            Meet Our Top Mentors
          </h2>
          <p className="text-white/80 mt-2">
            Learn from experienced industry professionals
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => {
            const skillsArray = mentor.currentSkills
              ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
              : [];

            return (
              <motion.div
                key={mentor._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                  bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl 
                  shadow-lg hover:border-[#0098cc]/60 hover:shadow-2xl hover:shadow-[#0098cc]/10
                  transition-all duration-300 hover:-translate-y-1
                  h-[520px] flex flex-col overflow-hidden
                "
              >
                {/* IMAGE */}
                <div className="h-44 w-full shrink-0 relative bg-gradient-to-br from-[#0098cc]/20 to-[#062117]">
                  <img
                    src={mentor.profileImage || "https://via.placeholder.com/400"}
                    alt={mentor.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-white font-bold text-lg line-clamp-1">
                    {mentor.fullName || "Unknown Mentor"}
                  </h3>

                  <p className="text-[#0098cc] text-sm font-semibold mt-1 line-clamp-1">
                    {mentor.currentRole || "Role not specified"}
                  </p>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skillsArray.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] rounded-md border border-[#0098cc]/20 line-clamp-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* RATING */}
                  <div className="flex items-center justify-between mt-4 pb-3 border-b border-[#0098cc]/20">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">
                        5.0
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {mentor.yearsOfExperience || 0}+ yrs exp
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleViewProfile(mentor)}
                      className="
                        w-full
                        border-2 border-[#0098cc]
                        text-[#0098cc] font-semibold
                        py-2 rounded-lg transition-all
                        hover:bg-[#0098cc] hover:text-white
                      "
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() => handleBookSession(mentor)}
                      className="
                        w-full
                        bg-[#0098cc] hover:bg-[#007fa3]
                        text-white font-semibold
                        py-2 rounded-lg
                        transition-all
                      "
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;