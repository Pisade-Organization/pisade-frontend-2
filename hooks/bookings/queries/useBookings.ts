import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { GetBookingsParams, GetBookingsResponse } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

export function useBookings(params: GetBookingsParams = {}) {
  return useQuery<GetBookingsResponse, AxiosError>({
    queryKey: bookingsQueryKeys.list(params),
    queryFn: () => BookingsService.getAll(params),
    retry: 1,
  });
}
