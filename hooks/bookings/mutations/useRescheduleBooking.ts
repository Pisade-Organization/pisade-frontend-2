import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { RescheduleBookingDto } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

export function useRescheduleBooking(bookingId?: string) {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, RescheduleBookingDto>({
    mutationFn: (payload) => BookingsService.reschedule(bookingId as string, payload),
    onSuccess: () => {
      if (bookingId) {
        queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.detail(bookingId) });
      }
      queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.all });
    },
  });
}
