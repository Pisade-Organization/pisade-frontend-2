import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { StudentTransaction } from "@/services/dashboard/types";
import { settingsQueryKeys } from "../queryKeys";

export function useStudentTransactions() {
  return useQuery<StudentTransaction[], AxiosError>({
    queryKey: settingsQueryKeys.studentTransactions(),
    queryFn: () => DashboardService.getStudentTransactions(),
    retry: 1,
  });
}
