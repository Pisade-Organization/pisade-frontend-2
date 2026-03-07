import type { GetBookingsParams } from "@/services/bookings/types";

export const bookingsQueryKeys = {
  all: ["bookings"] as const,
  list: (params: GetBookingsParams) => [...bookingsQueryKeys.all, "list", params] as const,
  detail: (bookingId: string) => [...bookingsQueryKeys.all, "detail", bookingId] as const,
};
