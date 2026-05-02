// pages/search/SearchResults.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Loader2, Search, ArrowLeft, Briefcase } from "lucide-react";
import { useLazySearchMentorsQuery } from "./MentorsecApiSlice";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const [triggerSearch, { data: response, isLoading, isError, error }] =
    useLazySearchMentorsQuery();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    setSearchQuery(query || "");
    triggerSearch(query || "");
  }, [location.search, triggerSearch]);

  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleViewProfile = (mentor) => {
    navigate(`/mentor-profile/${mentor.userId}`);
  };

  const mentorsList =
    response?.data && Array.isArray(response.data) ? response.data : [];

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#1a1a2e] hover:text-[#0098cc] mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0098cc] w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skills, role, company, location..."
                className="w-full bg-white border border-[#d9e2ec] rounded-full pl-12 pr-4 py-4 text-[#1a1a2e] placeholder-gray-500 focus:outline-none focus:border-[#0098cc] transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1a1a2e] hover:bg-[#111120] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        {searchQuery && !isLoading && (
          <div className="max-w-7xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e]">
              Search results for{" "}
              <span className="text-[#0098cc]">"{searchQuery}"</span>
            </h2>
            {mentorsList.length > 0 && (
              <p className="text-gray-500 mt-2">
                Found {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#0098cc] mb-4" />
            <p className="text-gray-500">Searching for mentors...</p>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">
              Failed to load mentors. Please try again later.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {error?.data?.message || error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => triggerSearch(searchQuery)}
              className="bg-[#1a1a2e] text-white px-6 py-3 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !isError && mentorsList.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#1a1a2e] text-lg font-medium">
              {searchQuery
                ? `No mentors found matching "${searchQuery}"`
                : "No mentors available at the moment"}
            </p>
            <p className="text-gray-500 mt-2">
              Try different keywords or browse all mentors.
            </p>
          </div>
        )}

        {/* Mentor Cards */}
        {!isLoading && !isError && mentorsList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentorsList.map((mentor, index) => {
              const guidanceAreas = Array.isArray(mentor.guidanceAreas) ? mentor.guidanceAreas : [];
              const initials = mentor.fullName
                ? mentor.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
                : "?";
              const profilePhoto =
                mentor.profilePhoto || mentor["profile Photo"] || mentor.profileImage || "";
              const rating = mentor.rating || 5.0;

              return (
                <motion.article
                  key={mentor._id || index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden
                             hover:border-blue-400 hover:shadow-md transition-all duration-200
                             flex items-stretch h-[180px]"
                >
                  {/* LEFT: Image */}
                  <div className="relative w-[160px] h-full bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 overflow-hidden">
                    {profilePhoto ? (
                      <>
                        <img
                          src={profilePhoto}
                          alt={mentor.fullName}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center">
                          <span className="text-4xl font-bold text-blue-400">{initials}</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-400">{initials}</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white shadow-md rounded-full px-2 py-0.5 flex items-center gap-0.5 border border-slate-100">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold text-slate-800">{rating.toFixed(1)}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                  </div>

                  {/* RIGHT: Content */}
                  <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
                    <div className="mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight truncate">
                        {mentor.fullName || "Unknown Mentor"}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        <span className="text-[#0098cc] font-medium">{mentor.currentRole || "Mentor"}</span>
                        {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience}+ yrs` : ""}
                      </p>
                      {mentor.companyName && (
                        <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 truncate">
                          <Briefcase className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{mentor.companyName}</span>
                        </p>
                      )}
                    </div>

                    {guidanceAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {guidanceAreas.slice(0, 2).map((area, i) => (
                          <span key={i} className="inline-block text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm">
                            {area}
                          </span>
                        ))}
                        {guidanceAreas.length > 2 && (
                          <span className="text-[8px] text-slate-400 px-1.5 py-0.5">+{guidanceAreas.length - 2}</span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleViewProfile(mentor)}
                      className="w-full py-1.5 rounded-lg font-semibold text-xs text-white
                                 transition-all duration-150 active:scale-[0.97] shadow-sm
                                 bg-[#1a1a2e] hover:bg-[#0098cc]"
                    >
                      View Profile
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}


      </div>
    </div>
  );
};

export default SearchResults;