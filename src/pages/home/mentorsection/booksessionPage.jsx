import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { useFetchMentorByIdQuery } from "./mentorsectionapislice";
import BookingModal from "./BookModal.jsx";

const BookSessionPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mentorId = searchParams.get("mentorId");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch mentor data
  const {
    data: mentor,
    isLoading,
    isError,
    error,
  } = useFetchMentorByIdQuery(mentorId, {
    skip: !mentorId,
  });

  // Open modal once mentor data is loaded
  useEffect(() => {
    if (mentor && !isLoading) {
      setIsModalOpen(true);
    }
  }, [mentor, isLoading]);

  // Handle modal close - navigate back
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Navigate back to previous page or mentor profile
    navigate(-1);
  };

  // No mentorId provided
  if (!mentorId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#062117] mb-2">
            Invalid Request
          </h2>
          <p className="text-[#062117]/70 mb-6">
            No mentor ID provided. Please select a mentor to book a session.
          </p>
          <button
            onClick={() => navigate("/mentors")}
            className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Mentors
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#0098cc] animate-spin mx-auto mb-4" />
          <p className="text-[#062117] font-semibold text-lg">
            Loading mentor details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#062117] mb-2">
            Error Loading Mentor
          </h2>
          <p className="text-[#062117]/70 mb-6">
            {error?.data?.message || "Failed to load mentor details. Please try again."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="border-2 border-[#0098cc] text-[#0098cc] font-bold py-3 px-6 rounded-lg hover:bg-[#0098cc]/10 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render booking modal
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
      {mentor && (
        <BookingModal
          mentor={mentor}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default BookSessionPage;