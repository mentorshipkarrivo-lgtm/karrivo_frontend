// pages/search/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Loader2, Search, ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import { useLazySearchMentorsQuery } from "./MentorsecApiSlice"

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const [triggerSearch, { data: response, isLoading, isError, error }] = useLazySearchMentorsQuery();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');

    setSearchQuery(query || '');
    triggerSearch(query || '');
  }, [location.search, triggerSearch]);

  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

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

  const mentorsList = response?.data && Array.isArray(response.data) ? response.data : [];

  return (
    <div className="min-h-screen bg-[#062117] pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skills, role, company, location..."
                className="w-full bg-[#0a2d20] border-2 border-[#0098cc]/30 rounded-full pl-12 pr-4 py-3.5 text-white placeholder-white/60 focus:outline-none focus:border-[#0098cc] transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#0098cc]/20"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        {searchQuery && !isLoading && (
          <div className="max-w-7xl mx-auto mb-6">
            <h2 className="text-2xl font-bold text-white">
              Search results for "{searchQuery}"
            </h2>
            {mentorsList.length > 0 && (
              <p className="text-white/70 mt-2">
                Found {mentorsList.length} mentor{mentorsList.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#0098cc] mb-4" />
            <p className="text-white/70">Searching for mentors...</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="max-w-7xl mx-auto text-center py-20">
            <p className="text-red-400 text-lg mb-4">
              Failed to load mentors. Please try again later.
            </p>
            <p className="text-white/50 text-sm mb-4">
              Error: {error?.data?.message || error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => triggerSearch(searchQuery)}
              className="bg-[#0098cc]/20 hover:bg-[#0098cc]/30 border border-[#0098cc] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !isError && mentorsList.length === 0 && (
          <div className="max-w-7xl mx-auto text-center py-20">
            <p className="text-white/70 text-lg">
              {searchQuery
                ? `No mentors found matching "${searchQuery}"`
                : 'No mentors available at the moment'
              }
            </p>
            <p className="text-white/50 mt-2">
              Try different keywords or browse all mentors.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Mentors Grid */}
        {!isLoading && !isError && mentorsList.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {mentorsList.map((mentor, index) => {
                const skillsArray = mentor.currentSkills
                  ? mentor.currentSkills.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
                  : [];

                return (
                  <motion.div
                    key={mentor._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-[#0a2d20] border border-[#0098cc]/20 rounded-2xl shadow-lg hover:border-[#0098cc]/60 hover:shadow-2xl hover:shadow-[#0098cc]/10 transition-all duration-300 hover:-translate-y-1 h-[520px] flex flex-col overflow-hidden"
                  >
                    {/* Profile Image */}
                    <div className="h-44 w-full shrink-0 relative bg-gradient-to-br from-[#0098cc]/20 to-[#062117]">
                      {mentor.profileImage ? (
                        <img
                          src={mentor.profileImage}
                          alt={mentor.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-[#0098cc] text-white flex items-center justify-center text-3xl font-bold">
                            {mentor.fullName?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Name */}
                      <h3 className="text-white font-bold text-lg line-clamp-1">
                        {mentor.fullName || 'Unknown Mentor'}
                      </h3>

                      {/* Role */}
                      <p className="text-[#0098cc] text-sm font-semibold mt-1 line-clamp-1">
                        {mentor.currentRole || 'Role not specified'}
                      </p>

                      {/* Company */}
                      {mentor.companyName && (
                        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                          at {mentor.companyName}
                        </p>
                      )}

                      {/* Location */}
                      {mentor.location && (
                        <div className="flex items-start gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-500 text-xs line-clamp-1">
                            {mentor.location}
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skillsArray.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-[#0098cc]/10 text-[#0098cc] rounded-md border border-[#0098cc]/20 line-clamp-1"
                          >
                            {skill}
                          </span>
                        ))}
                        {skillsArray.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded-md">
                            +{skillsArray.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between mt-4 pb-3 border-b border-[#0098cc]/20">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-white">5.0</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {mentor.yearsOfExperience || 0}+ yrs exp
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        <button
                          onClick={() => handleViewProfile(mentor)}
                          className="w-full border-2 border-[#0098cc] text-[#0098cc] font-semibold py-2 rounded-lg transition-all hover:bg-[#0098cc] hover:text-white"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleBookSession(mentor)}
                          className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-semibold py-2 rounded-lg transition-all"
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
        )}
      </div>
    </div>
  );
};

export default SearchResults;