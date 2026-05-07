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
        reviews.reduce((t, i) => t + i.rating, 0) / reviews.length
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

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e] leading-snug">
            Read Reviews,<br />
            <span className="text-[#0098cc]">Learn With Confidence</span>
          </h1>

          <p className="text-gray-500 mt-3 text-xs md:text-sm max-w-xl mx-auto">
            Trusted feedback from learners helps you understand real mentor experience.
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

            <div className="text-lg font-semibold text-[#1a1a2e]">
              {avgRating}/5
            </div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(avgRating)
                      ? "fill-[#0098cc] text-[#0098cc]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <button className="bg-[#1a1a2e] text-white px-3 py-1 rounded-lg text-xs">
              {reviews.length} Reviews
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="text-4xl text-[#0098cc] mb-3">“</div>

            <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3 leading-snug">
              What Learners Say
            </h2>

            <p className="text-xs text-gray-500 leading-relaxed">
              Real feedback from mentees who improved skills and gained confidence through mentorship.
            </p>
          </div>

          {/* REVIEWS */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">

            {reviews.slice(0, 4).map((review) => (
              <div
                key={review._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition"
              >

                {/* COMMENT */}
                <p className="text-xs text-gray-600 leading-relaxed mb-4 min-h-[70px]">
                  {review.comment}
                </p>

                {/* STARS */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-[#0098cc] text-[#0098cc]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* USER */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0098cc] text-white flex items-center justify-center text-xs font-semibold">
                      {review.menteeName?.charAt(0) || "U"}
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-[#1a1a2e]">
                        {review.menteeName}
                      </h3>
                      <p className="text-[10px] text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {review.isVerified && (
                    <span className="text-[10px] text-[#0098cc] bg-gray-100 px-2 py-0.5 rounded-full">
                      Verified
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