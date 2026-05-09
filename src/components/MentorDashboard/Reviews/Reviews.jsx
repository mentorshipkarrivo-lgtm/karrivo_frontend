import React, { useState } from "react";
import { Star, X, ChevronRight, MessageCircle } from "lucide-react";
import { useGetReviewsByMentorIdQuery } from "./Reviewsapislice";
import Loader from "../../../global/Loader";

export default function MentorReviewsUI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < rating
              ? "fill-[#0091c3] text-[#0091c3]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  // Empty State - Show heading and side content only
  if (reviews.length === 0) {
    return (
      <section className="bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
              Success Stories & Feedback
            </h1>

            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Real experiences from professionals who transformed their careers through expert mentorship.
            </p>
          </div>

          {/* Content Layout - Left Panel & Empty State */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL */}
            <div className="bg-white p-5">
              <div className="text-2xl text-[#0091c3] mb-3">"</div>

              <h2 className="text-sm font-bold text-[#1a1a2e] mb-2">
                Voices From Learners
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed">
                Honest experiences shared by mentees who transformed their careers and achieved meaningful progress.
              </p>

           
            </div>

            {/* CENTER/RIGHT - No Comments Yet */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full">
                  <MessageCircle size={28} className="text-gray-400" />
                </div>

                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
                  No Comments Yet
                </h3>



                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Once reviews are posted, they'll appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Reviews Exist - Show Real Content
  return (
    <>
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
              Success Stories & Feedback
            </h1>

            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Real experiences from professionals who transformed their careers through expert mentorship.
            </p>

            {/* Rating Summary Card */}
            <div className="mt-8 inline-flex items-center justify-center gap-4 bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm">
              <div>
                <div className="text-2xl font-bold text-[#1a1a2e]">
                  {avgRating}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">out of 5</div>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div>
                <div className="flex gap-1 mb-1">{renderStars(Math.round(avgRating))}</div>
                <div className="text-xs font-medium text-gray-600">
                  {reviews.length} reviews
                </div>
              </div>
            </div>
          </div>

          {/* Comments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL */}
            <div className="bg-white p-5">
              <div className="text-2xl text-[#0091c3] mb-3">"</div>

              <h2 className="text-sm font-bold text-[#1a1a2e] mb-2">
                Voices From Learners
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed">
                Honest experiences shared by mentees who transformed their careers and achieved meaningful progress.
              </p>
            </div>

            {/* REVIEWS GRID */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.slice(0, 4).map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  {/* Rating */}
                  <div className="mb-3 flex gap-0.5">{renderStars(review.rating)}</div>

                  {/* Comment text */}
                  <p className="text-xs text-gray-700 leading-relaxed mb-4 font-light">
                    {review.comment ||
                      "This mentorship experience helped me improve my clarity, confidence, and professional growth."}
                  </p>

                  {/* Author info */}
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0091c3] text-white flex items-center justify-center text-xs font-semibold">
                        {review.menteeName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#1a1a2e]">
                          {review.menteeName || "User"}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>

                    {review.isVerified && (
                      <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 font-medium">
                        <span>✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action - View All Comments */}
          {reviews.length > 4 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#1a1a2e] text-white px-6 py-2.5 rounded font-semibold text-sm transition-all duration-300 hover:bg-opacity-90 active:scale-95"
              >
                Read All Comments
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal - All Comments */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-gray-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e]">
                  All Comments
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {reviews.length} total reviews from verified learners
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto flex-1">
              <div className="space-y-3 p-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Rating */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                      <span className="text-xs font-semibold text-gray-700">
                        {review.rating}.0
                      </span>
                    </div>

                    {/* Comment text */}
                    <p className="text-xs text-gray-700 leading-relaxed mb-4 font-light">
                      {review.comment ||
                        "This mentorship experience helped me improve my clarity, confidence, and professional growth."}
                    </p>

                    {/* Author info */}
                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0091c3] text-white flex items-center justify-center text-xs font-semibold">
                          {review.menteeName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#1a1a2e]">
                            {review.menteeName || "User"}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>

                      {review.isVerified && (
                        <div className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 font-medium">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-[#1a1a2e] text-white rounded text-sm font-semibold hover:bg-opacity-90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}