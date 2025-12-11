import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepSixDto, OnboardingStepSixPostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepSix() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepSixPostResponse, AxiosError, OnboardingStepSixDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepSix(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-six"]})
    }
  })
}
