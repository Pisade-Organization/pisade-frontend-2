import { TUTOR_RANKING } from "@/types/tutorRanking.enum";

export type TutorMenuLink = {
  id: string;
  label: string;
  href: string;
};

export type TutorProfileSummary = {
  avatarUrl?: string;
  fullName?: string;
  email?: string;
  timezone?: string;
  tutorRanking?: TUTOR_RANKING;
  rating?: number;
  studentsCount?: number;
  lessonsCount?: number;
};
