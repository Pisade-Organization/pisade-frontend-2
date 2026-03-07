import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { CheckoutBookingDto } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

export function useCheckoutBooking(bookingId?: string) {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, CheckoutBookingDto>({
    mutationFn: (payload) => BookingsService.checkout(bookingId as string, payload),
    onSuccess: () => {
      if (bookingId) {
        queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.detail(bookingId) });
      }
      queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.all });
    },
  });
}
