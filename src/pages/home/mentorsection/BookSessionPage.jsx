import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { useFetchMentorByIdQuery } from "./Mentorapislice";
import BookingModal from "./BookingModal";

import karrivoLogo from "../../../assets/KarivoLogo.jpg";

const TIPS = [
  "Mentees give updates to their mentors on a daily basis to stay consistent",
  "Set clear goals with your mentor at the start of each session",
  "Ask for feedback regularly to accelerate your growth",
  "Consistency is more important than intensity in mentorship",
];
const BookSessionPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mentorId = searchParams.get("mentorId");


  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);



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


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % TIPS.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          zIndex: 1000,
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Logo Image replaces the SVG icon */}
        <div
          style={{
            marginBottom: "24px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <img
            src={karrivoLogo}
            alt="Karivo"
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 12px 0",
            letterSpacing: "0.01em",
          }}
        >
          Loading Mentors            </h2>

        {/* Tip Text — clean, no quotes or symbols */}
        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
            maxWidth: "420px",
            textAlign: "center",
            lineHeight: "1.6",
            padding: "0 24px",
            margin: 0,
            transition: "opacity 0.4s ease",
            opacity: fade ? 1 : 0,
          }}
        >
          {TIPS[tipIndex]}
        </p>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: "6px", marginTop: "32px" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#3B4FE8",
                animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
             @keyframes pulse {
               0%, 100% { transform: scale(1); opacity: 1; }
               50% { transform: scale(1.05); opacity: 0.85; }
             }
             @keyframes dot-bounce {
               0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
               40% { transform: translateY(-6px); opacity: 1; }
             }
           `}</style>
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