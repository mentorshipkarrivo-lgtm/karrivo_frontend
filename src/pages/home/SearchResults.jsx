// pages/search/SearchResults.js - Using Redux API Slice
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Loader2, Search, ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import { useLazySearchMentorsQuery } from './mentorSearchApiSlice';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🔥 Using Redux API Slice
  const [triggerSearch, { data: mentors, isLoading, isError, error }] = useLazySearchMentorsQuery();

  // Get search query from URL and trigger search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    console.log('🔍 Search Results - Query from URL:', query);
    setSearchQuery(query || '');
    
    // Trigger search with query (empty string will fetch all mentors)
    console.log('📡 Triggering API search for:', query || 'all mentors');
    triggerSearch(query || '');
  }, [location.search, triggerSearch]);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('authToken');

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('🔍 Manual search triggered:', searchQuery);
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Handle book session click
  const handleBookSession = (mentor) => {
    console.log('📅 Book session clicked for:', mentor._id);
    
    if (!isLoggedIn) {
      console.log('❌ User not logged in, redirecting to login');
      navigate(`/login?mentorId=${mentor._id}`);
    } else {
      console.log('✅ User logged in, going to booking page');
      navigate(`/book-session?mentorId=${mentor._id}`);
    }
  };

  // Handle view profile click
  const handleViewProfile = (mentor) => {
    console.log('👤 View profile clicked for:', mentor._id);
    navigate(`/mentor-profile/${mentor._id}`);
  };

  // Convert mentors to array
  const mentorsList = Array.isArray(mentors) ? mentors : [];

  console.log('📊 Current state:', {
    searchQuery,
    isLoading,
    isError,
    mentorsCount: mentorsList.length,
    error: error?.data?.message || error?.message
  });

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
                placeholder="Search by skills, role, company..."
                className="w-full bg-transparent border-2 border-white/30 rounded-full pl-12 pr-4 py-3.5 text-white placeholder-white/60 focus:outline-none focus:border-[#4db8a8] transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] hover:from-[#5ac8d8] hover:to-[#4db8a8] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        {searchQuery && (
          <div className="max-w-6xl mx-auto mb-6">
            <h2 className="text-2xl font-bold text-white">
              Search results for "{searchQuery}"
            </h2>
            {!isLoading && mentorsList.length > 0 && (
              <p className="text-white/70 mt-2">
                Found {mentorsList.length} mentor{mentorsList.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-white mb-4" />
            <p className="text-white/70">Searching for mentors...</p>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="max-w-6xl mx-auto text-center py-20">
            <p className="text-red-400 text-lg mb-4">
              Failed to load mentors. Please try again later.
            </p>
            <p className="text-white/50 text-sm mb-4">
              Error: {error?.data?.message || error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => triggerSearch(searchQuery)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !isError && mentorsList.length === 0 && (
          <div className="max-w-6xl mx-auto text-center py-20">
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
              className="mt-6 bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] hover:from-[#5ac8d8] hover:to-[#4db8a8] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Mentors Grid */}
        {!isLoading && !isError && mentorsList.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#0098cc] hover:shadow-2xl transition-all hover:scale-105"
                  >
                    {/* Profile Image */}
                    <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-[#0098cc]/20 to-[#4db8a8]/20">
                      {mentor.profileImage ? (
                        <img
                          src={mentor.profileImage}
                          alt={mentor.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-[#0098cc] text-white flex items-center justify-center text-3xl font-bold">
                            {mentor.fullName?.charAt(0) || '?'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      {/* Name */}
                      <h3 className="text-[#062117] font-bold text-lg mb-1 truncate">
                        {mentor.fullName || 'Unknown Mentor'}
                      </h3>

                      {/* Role */}
                      <div className="flex items-start gap-1 mb-1">
                        <Briefcase className="w-4 h-4 text-[#062117]/60 mt-0.5 flex-shrink-0" />
                        <p className="text-[#062117]/70 text-sm truncate">
                          {mentor.currentRole || 'Role not specified'}
                        </p>
                      </div>

                      {/* Company */}
                      {mentor.companyName && (
                        <p className="text-[#062117]/60 text-xs mb-2 truncate">
                          {mentor.companyName}
                        </p>
                      )}

                      {/* Location */}
                      {mentor.location && (
                        <div className="flex items-start gap-1 mb-3">
                          <MapPin className="w-3 h-3 text-[#062117]/50 mt-0.5 flex-shrink-0" />
                          <p className="text-[#062117]/50 text-xs truncate">
                            {mentor.location}
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-3 min-h-[60px]">
                        {skillsArray.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-[#0098cc]/20 rounded-full text-[#0098cc] truncate max-w-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {skillsArray.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                            +{skillsArray.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-[#062117] font-semibold">5.0</span>
                        </div>
                        <span className="text-sm text-[#062117]/70">
                          {mentor.yearsOfExperience || 0}+ yrs
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleViewProfile(mentor)}
                          className="w-full border-2 border-[#0098cc] text-[#0098cc] hover:bg-[#0098cc] hover:text-white font-semibold py-2 rounded-lg transition-all"
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