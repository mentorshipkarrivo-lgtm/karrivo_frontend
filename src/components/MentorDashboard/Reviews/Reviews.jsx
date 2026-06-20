import React, { useEffect, useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import { useGetReviewsByMentorIdQuery } from "./Reviewsapislice";
import Loader from "../../../global/Loader";

const PAGE_SIZE = 10;
const PREVIEW_LENGTH = 220;

function renderStars(rating, size = 12) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-[#0091c3] text-[#0091c3]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReviewerName(review) {
  return (
    review.user?.name ||
    review.menteeId?.name ||
    review.menteeId?.fullName ||
    "Anonymous"
  );
}

function getReviewerImage(review) {
  return (
    review.user?.profileImage ||
    review.menteeId?.profileImage ||
    review.menteeId?.profilePhoto ||
    null
  );
}

function getReviewText(review) {
  return (
    review.comment ||
    review.review ||
    "This mentorship experience helped me improve my clarity, confidence, and professional growth."
  );
}

function Avatar({ review, size = "w-8 h-8", textSize = "text-xs" }) {
  const img = getReviewerImage(review);
  const name = getReviewerName(review);
  if (img) {
    return (
      <img
        src={img}
        alt={name}
        className={`${size} rounded-full object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${size} rounded-full bg-[#0091c3] text-white flex items-center justify-center ${textSize} font-semibold flex-shrink-0`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function ReviewCard({ review, onOpen }) {
  const text = getReviewText(review);
  const isLong = text.length > PREVIEW_LENGTH;
  const preview = isLong ? `${text.slice(0, PREVIEW_LENGTH).trim()}…` : text;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="mb-3 flex items-center justify-between">
        {renderStars(review.rating)}
      </div>

      <p className="text-xs text-gray-700 leading-relaxed mb-2 font-light">
        {preview}
      </p>

      {isLong && (
        <button
          onClick={() => onOpen(review)}
          className="text-xs font-semibold text-[#0091c3] hover:underline mb-3"
        >
          Read more
        </button>
      )}

      <div className="border-t border-gray-100 pt-3 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar review={review} />
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-[#1a1a2e] truncate">
              {getReviewerName(review)}
            </h4>
            <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {review.isVerified && (
          <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 font-medium flex-shrink-0">
            <span>✓</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar review={review} size="w-10 h-10" textSize="text-sm" />
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-[#1a1a2e] truncate">
                {getReviewerName(review)}
              </h4>
              <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-3">{renderStars(review.rating, 14)}</div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {getReviewText(review)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MentorReviewsUI() {
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(null);

  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data, isLoading, isFetching } = useGetReviewsByMentorIdQuery(
    { mentorId, page, limit: PAGE_SIZE },
    { skip: !mentorId }
  );

  useEffect(() => {
    if (!data?.data?.reviews) return;
    setAllReviews((prev) => {
      if (page === 1) return data.data.reviews;
      const seen = new Set(prev.map((r) => r._id));
      const fresh = data.data.reviews.filter((r) => !seen.has(r._id));
      return [...prev, ...fresh];
    });
  }, [data, page]);

  const total = data?.data?.total ?? allReviews.length;
  const hasMore = data?.data?.hasMore ?? allReviews.length < total;

  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : "0.0";

  const handleViewMore = () => {
    if (isFetching) return;
    setPage((p) => p + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (allReviews.length === 0) {
    return (
      <section className="min-h-screen bg-white p-5 text-gray-700">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">              Success Stories & Feedback
            </h1>
            <p className="text-gray-500 mt-2 text-xs max-w-xl mx-auto">
              Real experiences from professionals who transformed their careers through expert mentorship.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200 max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">No Comments Yet</h3>
            <p className="text-xs text-gray-500">Once reviews are posted, they'll appear here</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-white p-5 text-gray-700">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">                Success Stories & Feedback
              </h1>
              <p className="text-gray-500 mt-2 text-xs">
                Real experiences from professionals who transformed their careers through expert mentorship.
              </p>
            </div>

            <div className="inline-flex items-center gap-4 bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
              <div>
                <div className="text-2xl font-bold text-[#1a1a2e]">{avgRating}</div>
                <div className="text-xs text-gray-500 mt-0.5">out of 5</div>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <div className="flex gap-1 mb-1">{renderStars(Math.round(avgRating))}</div>
                <div className="text-xs font-medium text-gray-600">{total} reviews</div>
              </div>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allReviews.map((review) => (
              <ReviewCard key={review._id} review={review} onOpen={setActiveReview} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleViewMore}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-[#1a1a2e] px-6 py-2.5 rounded font-semibold text-sm transition-all duration-300 hover:bg-gray-50 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isFetching ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Loading…
                  </>
                ) : (
                  "View More"
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
    </>
  );
}