import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { PaginatedTutorCards } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

const DEFAULT_LIMIT = 12;

export function useCurrentTutorCards(limit = DEFAULT_LIMIT, enabled = true) {
  return useInfiniteQuery<PaginatedTutorCards, AxiosError>({
    queryKey: [...dashboardQueryKeys.currentTutorCards(), limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      DashboardService.getCurrentTutors({
        page: Number(pageParam),
        limit,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
    enabled,
    retry: 1,
  });
}
