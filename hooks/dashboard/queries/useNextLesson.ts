import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService } from "@/services/dashboard";
import type { StudentLesson } from "@/services/dashboard/types";
import { dashboardQueryKeys } from "../queryKeys";

export function useNextLesson() {
  return useQuery<StudentLesson | null, AxiosError>({
    queryKey: dashboardQueryKeys.nextLesson(),
    queryFn: () => DashboardService.getNextLesson(),
    retry: 1,
  });
}
