import Skeleton from "../../form/Skeleton";

function ReviewCard({ review, loading = false }) {
  if (loading) {
    return (
      <div className="border border-gray-200 rounded-2xl p-4 bg-white space-y-2 shadow-sm">
        <Skeleton className="w-32 h-5 mb-2 rounded" /> {/* reviewer name */}
        <Skeleton className="w-48 h-4 mb-2 rounded" /> {/* reviewer email */}
        <Skeleton className="w-24 h-5 mb-2 rounded" /> {/* stars */}
        <Skeleton className="w-full h-12 mb-2 rounded" /> {/* comment */}
        <Skeleton className="w-20 h-3 rounded" /> {/* date */}
      </div>
    );
  }

  const { rating, comment, date, reviewerName, reviewerEmail } = review;

  const stars = Array.from({ length: 5 }, (_, i) => (i < rating ? "⭐" : "☆"));

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white space-y-2 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-base font-medium">{reviewerName}</div>
        <div className="text-xs text-gray-500">{reviewerEmail}</div>
      </div>

      <div className="text-yellow-500 text-lg" aria-label={`Rating: ${rating} out of 5`}>
        {stars.map((star, idx) => (
          <span key={idx} aria-hidden="true">
            {star}
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-700">{rating}/5</span>
      </div>

      <p className="text-sm text-gray-700 break-words">{comment}</p>

      <div className="text-xs text-gray-400">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

export default ReviewCard;
