import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { StudentLesson } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useTodayLessons() {
  return useQuery<StudentLesson[], AxiosError>({
    queryKey: dashboardQueryKeys.todayLessons(),
    queryFn: () => DashboardService.getTodayLessons(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    retry: 1,
  });
}
