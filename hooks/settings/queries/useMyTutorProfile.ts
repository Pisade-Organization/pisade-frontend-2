import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorService } from "@/services/tutor/private";
import type { MyTutorProfile } from "@/services/tutor/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyTutorProfile() {
  return useQuery<MyTutorProfile, AxiosError>({
    queryKey: settingsQueryKeys.tutorProfile(),
    queryFn: () => TutorService.getMyTutorProfile(),
    retry: 1,
  });
}
