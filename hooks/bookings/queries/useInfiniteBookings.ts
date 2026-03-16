import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookingsService } from "@/services/bookings";
import type { GetBookingsParams, GetBookingsResponse } from "@/services/bookings/types";
import { bookingsQueryKeys } from "../queryKeys";

const DEFAULT_LIMIT = 10;

export function useInfiniteBookings(
  params: GetBookingsParams = {},
  enabled = true,
) {
  const { limit = DEFAULT_LIMIT, ...restParams } = params;

  return useInfiniteQuery<GetBookingsResponse, AxiosError>({
    queryKey: bookingsQueryKeys.infiniteList({ ...restParams, limit }),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      BookingsService.getAll({
        ...restParams,
        limit,
        cursor: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
    retry: 1,
  });
}
