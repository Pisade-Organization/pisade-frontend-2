export interface Review {
  id: string;
  avatarUrl: string;
  fullName: string;
  rating: number;
  date: string;
  review: string;
}

export interface ReviewSummary {
  avgRating: number;
  totalReviews: number;
}

export interface ReviewsProps {
  reviews: Review[];
  summary: ReviewSummary;
}
