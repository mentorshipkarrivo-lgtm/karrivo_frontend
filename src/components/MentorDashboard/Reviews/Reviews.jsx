import React from "react";
import { Star } from "lucide-react";
import { useGetReviewsByMentorIdQuery } from "./Reviewsapislice";
import Loader from "../../../global/Loader";

export default function MentorReviewsUI() {
  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data, isLoading } = useGetReviewsByMentorIdQuery(mentorId, {
    skip: !mentorId,
  });

  const reviews = data?.data || [];

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, item) => total + item.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] leading-tight">
            Read Reviews,<br />
            <span className="text-[#0098cc]">Learn With Confidence</span>
          </h1>

          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Trusted feedback from learners helps you understand the real mentor experience.
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <div className="text-2xl font-bold text-[#1a1a2e]">
              {avgRating}/5
            </div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < Math.round(avgRating)
                      ? "fill-[#0098cc] text-[#0098cc]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
              Total Reviews ({reviews.length})
            </button>
          </div>
        </div>

        {/* Reviews Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side Content */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="text-6xl text-[#0098cc] mb-4">“</div>

            <h2 className="text-2xl font-bold text-[#1a1a2e] leading-snug mb-4">
              What Our Learners
              <br />
              Are Saying
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed">
              Real feedback from mentees who joined sessions, improved skills,
              and built confidence through mentorship.
            </p>
          </div>

          {/* Review Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review._id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Review Comment */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 min-h-[90px]">
                  {review.comment}
                </p>

                {/* Review Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "fill-[#0098cc] text-[#0098cc]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* User Section */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#0098cc] text-white flex items-center justify-center font-bold text-sm">
                      {review.menteeName?.charAt(0) || "U"}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#1a1a2e]">
                        {review.menteeName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {review.isVerified && (
                    <span className="bg-gray-100 text-[#0098cc] text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
