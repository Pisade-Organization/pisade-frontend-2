import { Star } from "lucide-react";
import { Review } from "./types";
import Image from "next/image";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "text-[#FFB130] fill-#FFB130"
            : "text-neutral-100"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col justify-center items-start gap-5">

      <div className="flex justify-center items-center gap-4">

        <Image
          src={review.avatarUrl}
          alt={`Profile image of ${review.fullName}`}
          width={70}
          height={70}
        />
        <div className="flex flex-col justify-center items-start gap-1">

          <h1 className="text-title-2 text-neutral-900">
            {review.fullName}
          </h1>

          <div className="flex justify-center items-center gap-1">
            {renderStars(review.rating)}
          </div>

          <div className="text-body-4 text-neutral-300">
            {review.date}
          </div>

        </div>
      </div>


        <div className="text-body-2 text-neutral-500 [&>*:not(:first-child)]:mt-3 line-clamp-2 lg:line-clamp-none overflow-hidden">
          {typeof review.review === "string"
            ? review.review.split('\n').map((line, idx) => <div key={idx}>{line}</div>)
            : review.review}
        </div>


    </div>
  );
}
  