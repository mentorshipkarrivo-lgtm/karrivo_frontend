import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FindMentor() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onClickNavigateToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const bgImage =
    "https://www.interfolio.com/wp-content/uploads/Blog_MentoringStudentsGuide-scaled.jpg";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#062117]">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImage}')`,
        }}
      />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Find the Right Mentor for Your Growth
          </h2>

          {/* Sub Heading */}
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold 
            bg-gradient-to-r from-[#4db8a8] via-[#5ac8d8] to-[#4db8a8] bg-clip-text text-transparent">
            Learn • Improve • Scale
          </span>

          {/* Button */}
          <div className="pt-6 sm:pt-10 flex justify-center">
            <button
              onClick={onClickNavigateToLogin}
              className="
                group relative flex items-center justify-center gap-3
                px-8 py-4 sm:px-10 sm:py-5
                rounded-full font-bold text-white text-base sm:text-lg lg:text-xl
                uppercase tracking-wide
                transition-all duration-500 transform
                hover:scale-105 hover:-translate-y-2
                shadow-2xl border-0
                bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8]
                hover:from-[#5ac8d8] hover:to-[#4db8a8]
              "
              style={{
                boxShadow:
                  "0 25px 50px rgba(77, 184, 168, 0.4), 0 0 0 1px rgba(77, 184, 168, 0.2)",
              }}
            >
              <span>Find a Mentor</span>
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-150 bg-white/20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
