import { TUTOR_RANKING } from "@/types/tutorRanking.enum";
export interface TutorCardProps {
    view?: "list" | "grid";
    id: string;
    fullName: string;
    isActive: boolean;
    avatarUrl: string;
    flagUrl: string;
    bio: string;
    baseRate: number;
    specialties: string[];
    subject: string;
    languages: string[];
    avgRating: number;
    tutorRanking: TUTOR_RANKING;
    studentsCount: number;
    lessonsCount: number;
    availability: {
        [key: string]: Array<{ start: string; end: string }>;
    };
    videoUrl: string;
    videoThumbnailUrl: string;
}
