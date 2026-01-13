// Base props shared across all variants
interface BookingSummaryBaseProps {
  // Tutor information
  tutorName: string;
  countryUrl: string;
  avatarUrl: string;
  subject: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  
  // Cancellation deadline
  cancellationDeadline: Date;
  
  // Lesson information
  lessonName: string;
  date: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  
  // Pricing information
  lessonPrice: number;
  processingFee: number;
  total: number;
}

// Checkout variant (standard display)
export interface BookingSummaryCheckoutProps extends BookingSummaryBaseProps {
  variant: "checkout";
}

// Cancel variant (same as checkout)
export interface BookingSummaryCancelProps extends BookingSummaryBaseProps {
  variant: "cancel";
}

// Reschedule variant (requires reschedule information)
export interface BookingSummaryRescheduleProps extends BookingSummaryBaseProps {
  variant: "reschedule";
  rescheduleDate: Date;
  rescheduleStartTime: string;
  rescheduleEndTime: string;
}

// Discriminated union type
export type BookingSummaryProps = 
  | BookingSummaryCheckoutProps 
  | BookingSummaryCancelProps 
  | BookingSummaryRescheduleProps;
