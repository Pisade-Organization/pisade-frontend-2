export interface BookingCounterparty {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface BookingListItem {
  id: string;
  status: string;
  schedule: {
    startTime: string;
    endTime: string;
  };
  tutor?: BookingCounterparty;
  student?: BookingCounterparty;
  pricing: {
    amount: number;
    currency: string;
  };
  payment: {
    status: string;
  };
  allowedActions: {
    pay: boolean;
    cancel: boolean;
    reschedule: boolean;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface GetBookingsParams {
  view?: "all" | "upcoming" | "past";
  status?: string;
  from?: string;
  to?: string;
  cursor?: string;
  limit?: number;
}

export interface GetBookingsResponse {
  data: BookingListItem[];
  nextCursor?: string;
}

export interface BookingDetail {
  id: string;
  status: string;
  schedule: {
    startTime: string;
    endTime: string;
  };
  tutor: {
    id: string;
    name: string;
    avatarUrl: string | null;
    rating: number;
    studentCount: number;
    lessonCount: number;
  };
  pricing: {
    amount: number;
    currency: string;
  };
  payment: {
    status: string;
  };
  allowedActions: {
    pay: boolean;
    cancel: boolean;
    reschedule: boolean;
  };
  createdAt: string;
  expiresAt?: string;
}

export interface CreateBookingDto {
  tutorId: string;
  startTime: string;
  endTime: string;
}

export interface CreateBookingResponse {
  id: string;
  status: string;
  schedule: {
    startTime: string;
    endTime: string;
  };
  pricing: {
    amount: number;
    currency: string;
  };
  paymentExpiresAt?: string;
  allowedActions: {
    pay: boolean;
    cancel: boolean;
    reschedule: boolean;
  };
}

export interface CheckoutBookingDto {
  method: "PROMPTPAY" | "CARD";
  paymentMethodId?: string;
}

export interface CancelBookingDto {
  reason: string;
}

export interface RescheduleBookingDto {
  startTime: string;
  endTime: string;
}
