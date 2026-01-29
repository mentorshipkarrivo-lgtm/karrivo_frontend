import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, Star, MapPin, Phone, Mail, User } from 'lucide-react';
import { useGetUserDetailsQuery } from './mentorDashboardapislice';

const MentorDashboardSection = () => {
  const [mentorId, setMentorId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setMentorId(parsedUser?._id);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);

  const { data: userDetails, isLoading, isError, error } =
    useGetUserDetailsQuery(mentorId, {
      skip: !mentorId,
    });

  // ✅ API response is { success, data }
  const user = userDetails?.data;

  // ✅ Store mentorId in localStorage when user data is available
  useEffect(() => {
    if (user?.mentorId) {
      try {
        localStorage.setItem('mentorId', user.mentorId);
        console.log('Mentor ID stored in localStorage:', user.mentorId);
      } catch (error) {
        console.error('Error storing mentorId in localStorage:', error);
      }
    }
  }, [user]);

  // ✅ API sends ISO string dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl">
          {error?.data?.message || 'Failed to load user details'}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-xl">No user data available</div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Welcome Header */}
      <div className="mb-6">
        <h2 className="text-white text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Mentor'}!
        </h2>
        <p className="text-gray-400">
          Here's what's happening with your mentorship today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Bookings</h3>
            <Calendar className="w-5 h-5 text-[#0098cc]" />
          </div>
          <p className="text-white text-3xl font-bold">
            {user?.totalBookings || 0}
          </p>
        </div>

        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Completed Sessions</h3>
            <Star className="w-5 h-5 text-[#0098cc]" />
          </div>
          <p className="text-white text-3xl font-bold">
            {user?.completedBookings || 0}
          </p>
        </div>

        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Wallet Balance</h3>
            <TrendingUp className="w-5 h-5 text-[#0098cc]" />
          </div>
          <p className="text-white text-3xl font-bold">
            ₹{user?.Inr || 0}
          </p>
        </div>

        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Account Status</h3>
            <Users className="w-5 h-5 text-[#0098cc]" />
          </div>
          <p className="text-white text-3xl font-bold">
            {user?.isActive ? 'Active' : 'Inactive'}
          </p>
          <p className={`text-sm mt-2 ${user?.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
            {user?.isVerified ? '✓ Verified' : '⚠ Not Verified'}
          </p>
        </div>

      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <div className="bg-[#062117] border border-[#0098cc]/30 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Profile Information</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#0098cc] mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white font-medium">{user?.name || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#0098cc] mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{user?.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#0098cc] mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">
                  +{user?.countryCode} {user?.phone || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#0098cc] mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-medium">{user?.username || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MentorDashboardSection;