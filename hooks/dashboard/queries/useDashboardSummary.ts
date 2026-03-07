import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { StudentDashboardSummary } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useDashboardSummary() {
  return useQuery<StudentDashboardSummary, AxiosError>({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: () => DashboardService.getSummary(),
    retry: 1,
  });
}
