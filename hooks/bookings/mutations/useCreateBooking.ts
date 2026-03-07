import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { CreateBookingDto, CreateBookingResponse } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation<CreateBookingResponse, AxiosError, CreateBookingDto>({
    mutationFn: (payload) => BookingsService.create(payload),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKeys.all });
      queryClient.setQueryData(bookingsQueryKeys.detail(booking.id), booking);
    },
  });
}
