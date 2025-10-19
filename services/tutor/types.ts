export interface Tutor {
  id: string;
  fullName: string;
  avatarUrl: string;
  flagUrl: string;
  bio: string;
  baseRate: number;
  specialties: string[];
  subject: string;
  languages: string[];
  avgRating: number;
  studentsCount: number;
  lessonsCount: number;
  availability: {
    [key: string]: Array<{ start: string; end: string }>;
  };
  videoUrl: string;
  videoThumbnailUrl: string;
  isActive: boolean;
  tutorRanking: "STARTER" | "PRO" | "MASTER";
  reviews?: TutorReview[];
}

export interface TutorReview {
  id: string;
  avatarUrl: string;
  fullName: string;
  rating: number;
  date: string;
  review: string;
}

export interface TutorReviewsSummary {
  avgRating: number;
  totalReviews: number;
}

export interface TutorDetailData extends Tutor {
  reviews: TutorReview[];
  summary: TutorReviewsSummary;
}
