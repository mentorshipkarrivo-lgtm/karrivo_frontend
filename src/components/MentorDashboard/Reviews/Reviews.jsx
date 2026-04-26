import React from "react";
import { Star } from "lucide-react";
import { useGetReviewsByMentorIdQuery } from "./Reviewsapislice";
import Loader from "../../../global/Loader";

export default function MentorReviewsUI() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const mentorId = userData?._id;

  const { data, isLoading } = useGetReviewsByMentorIdQuery(mentorId, {
    skip: !mentorId,
  });

  const reviews = data?.data || [];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#031610]">
        <Loader />
      </div>
    );
  }

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-[#031610]  px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-3">
          Read reviews, <br />
          <span className="text-teal-400">ride with confidence.</span>
        </h1>

        {/* Rating */}
        <div className="flex justify-center items-center gap-2 mb-12">
          {/* <span className="font-semibold">{avgRating}/5</span> */}

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(avgRating)
                    ? "fill-teal-400 text-teal-400"
                    : "text-gray-500"
                }
              />
            ))}
          </div>

          <span className="text-teal-400 font-semibold">Reviews</span>
          <span className="text-sm text-gray-400">
            ({reviews.length})
          </span>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Text */}
          <div className="text-left">
            <div className="text-6xl text-teal-800 mb-4">“</div>
            <h2 className="text-2xl font-semibold">
              What our <br /> customers are saying
            </h2>
          </div>

          {/* Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review._id}
                className="rounded-xl p-6 
                bg-gradient-to-br from-[#06221a] to-[#0b3d2e] 
                border border-teal-900 
                shadow-lg hover:shadow-teal-900/40 
                transition-all duration-300"
              >
                {/* Comment */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-teal-400 text-teal-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>

                {/* User */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-sm font-bold">
                    {review.menteeName?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {review.menteeName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Verified */}
                {review.isVerified && (
                  <div className="mt-3 inline-block bg-teal-900 text-teal-300 text-xs px-3 py-1 rounded-full">
                    ✓ Verified
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}