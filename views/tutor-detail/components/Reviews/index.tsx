import { ReviewsProps } from "./types";
import NoReview from "./NoReview";
import ReviewsList from "./ReviewsList";
import { Star } from "lucide-react";

export default function Review({ reviews, summary }: ReviewsProps) {
  const hasReviews = reviews.length > 0;

  return (
    <div className="w-full flex justify-center items-center gap-6 px-4 lg:px-20">

      <div className="flex flex-col justify-center items-start gap-6">
        <div className="flex justify-center items-center gap-2">

          <Star size={28} fill="#FFB130" color="#FFB130" />

          <div className="flex justify-center items-center gap-2">
            <h1 className="text-headline-2 text-neutral-900">

              {summary.totalReviews > 0 ? summary.avgRating : "--"}/5

            </h1>

            {summary.totalReviews > 0 && 
              <h3 className="text-body-2 text-neutral-600">
                Based on {summary.totalReviews} reviews
              </h3>
            }
          </div>

        </div>

        {hasReviews ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <NoReview />
        )}
      </div>
    </div>
  );
}

export { type Review, type ReviewSummary } from "./types";
