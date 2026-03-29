export interface Tutor {
  id: string;
  userId: string;
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
  selfIntroduction?: {
    introduceYourself: string;
    teachingExperience: string;
    motivatePotentialStudents: string;
    catchyHeadline: string;
  };
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

export interface MyTutorSubject {
  id: string;
  tutorId: string;
  subjectId: string;
}

export interface MyTutorAvailability {
  id: string;
  tutorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  timezone: string;
  isActive: boolean;
}

export interface MyTutorProfile {
  videoUrl: string | null;
  specialties: string[];
  subjects: MyTutorSubject[];
  baseRate: number;
  availabilities: MyTutorAvailability[];
}

export interface UpdateMyTutorProfileDto {
  videoUrl?: string;
  specialties?: string[];
  subjects?: string[];
  baseRate?: number;
  availability?: string;
  bio?: string;
}

export interface TutorTransaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  fee: number;
  reference: string | null;
  createdAt: string;
}

export interface SubmitTutorOnboardingResponse {
  message: string;
}
