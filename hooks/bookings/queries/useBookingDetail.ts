import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { BookingDetail } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

export function useBookingDetail(bookingId?: string) {
  return useQuery<BookingDetail, AxiosError>({
    queryKey: bookingsQueryKeys.detail(bookingId ?? ""),
    queryFn: () => BookingsService.getById(bookingId as string),
    enabled: Boolean(bookingId),
    retry: 1,
  });
}
