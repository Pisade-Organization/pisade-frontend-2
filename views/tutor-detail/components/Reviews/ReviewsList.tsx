import { Review } from "./types";
import ReviewItem from "./ReviewItem";

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="flex flex-col gap-6">

      {reviews.map((value, index) => (
        <div className="flex flex-col gap-6" key={value.id}>
          <ReviewItem 
            review={value}
            />

          { index < reviews.length - 1 && <div className="w-full border-t border-[#CECECE] border-opacity-50" style={{ height: 0, borderWidth: '0.5px 0 0 0' }} /> }
        </div>
      ))}
      

    </div>
  );
}
