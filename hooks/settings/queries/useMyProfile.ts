import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { MyProfile } from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyProfile() {
  return useQuery<MyProfile, AxiosError>({
    queryKey: settingsQueryKeys.profile(),
    queryFn: () => ProfileService.getMyProfile(),
    retry: 1,
  });
}
