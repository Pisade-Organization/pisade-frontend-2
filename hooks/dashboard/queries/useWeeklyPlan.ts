import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { WeeklyPlanDay } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useWeeklyPlan(start: string) {
  return useQuery<WeeklyPlanDay[], AxiosError>({
    queryKey: dashboardQueryKeys.weeklyPlan(start),
    queryFn: () => DashboardService.getWeeklyPlan(start),
    retry: 1,
    enabled: Boolean(start),
  });
}
