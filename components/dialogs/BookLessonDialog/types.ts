export interface TutorI {
  id: string;
  fullName: string;
  avatarUrl: string;

  rating: number;
  studentsCount: number;
  lessonsCount: number;
}

export interface LessonOptionI {
  durationMinutes: number; // 25 | 50
  price: number;           // 10 | 20
  currency: "USD";
}

export interface TimeSlotI {
  startTime: string; // "14:00"
  isAvailable: boolean;
}

export interface DayAvailabilityI {
  date: string; // "2025-09-25"
  weekday: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  slots: TimeSlotI[];
}

export interface BookingDialogI {
  tutor: TutorI;

  lessonOptions: LessonOptionI[];
  selectedLessonDuration: number;

  timezone: string; // "Etc/GMT+11"
  utcOffset: string; // "GMT -11:00"

  weekRange: {
    startDate: string; // "2025-09-24"
    endDate: string;   // "2025-09-30"
  };

  availability: DayAvailabilityI[];

  selectedSlot?: {
    date: string;      // "2025-09-25"
    startTime: string; // "18:00"
  };

  isSubmitting: boolean;
}
