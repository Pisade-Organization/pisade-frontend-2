export interface BookingSummaryI {
  tutorName: string;
  countryUrl: string;
  subject: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  
  lessonName: string;
  date: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  
  lessonPrice: number;
  processingFee: number;
  total: number;
}