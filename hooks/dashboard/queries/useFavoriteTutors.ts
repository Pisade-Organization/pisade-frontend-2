import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { FavoriteTutor } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useFavoriteTutors() {
  return useQuery<FavoriteTutor[], AxiosError>({
    queryKey: dashboardQueryKeys.favoriteTutors(),
    queryFn: () => DashboardService.getFavoriteTutors(),
    retry: 1,
  });
}
