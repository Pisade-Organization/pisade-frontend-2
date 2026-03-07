import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorService } from "@/services/tutor";
import type { MyTutorProfile, UpdateMyTutorProfileDto } from "@/services/tutor/types";
import { settingsQueryKeys } from "../queryKeys";

export function useUpdateMyTutorProfile() {
  const queryClient = useQueryClient();

  return useMutation<MyTutorProfile, AxiosError, UpdateMyTutorProfileDto>({
    mutationFn: (payload) => TutorService.updateMyTutorProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.tutorProfile() });
    },
  });
}
