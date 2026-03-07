export type StudentTransactionStatus = "Completed" | "Processing" | "Cancel";

export interface StudentTransaction {
  id: string;
  transaction: string;
  amount: number;
  paymentMethod: string | null;
  date: string;
  status: StudentTransactionStatus;
}

export interface StudentDashboardSummary {
  completedLessons: number;
  scheduledLessons: number;
  skippedLessons: number;
}

export interface StudentLesson {
  id: string;
  scheduledAt: string;
  status: string;
  meetLink: string | null;
  duration: number;
  timezone: string;
  tutor: {
    id: string;
    user: {
      id: string;
      profile: {
        fullName: string;
        avatarUrl: string | null;
      } | null;
    };
  };
}

export interface WeeklyPlanDay {
  date: string;
  lessons: StudentLesson[];
}

export interface FavoriteTutor {
  id: string;
  user: {
    id: string;
    profile: {
      fullName: string;
      avatarUrl: string | null;
    } | null;
  };
  subjects: Array<{
    id: string;
    subject: {
      id: string;
      name: string;
    };
  }>;
  languages: Array<{
    id: string;
    language: {
      id: string;
      name: string;
    };
    level: string;
  }>;
}
