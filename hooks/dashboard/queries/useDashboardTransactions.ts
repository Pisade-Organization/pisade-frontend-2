import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { StudentTransaction } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useDashboardTransactions() {
  return useQuery<StudentTransaction[], AxiosError>({
    queryKey: dashboardQueryKeys.transactions(),
    queryFn: () => DashboardService.getStudentTransactions(),
    retry: 1,
  });
}
