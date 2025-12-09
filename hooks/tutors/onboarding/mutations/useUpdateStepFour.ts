import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepFourDto, OnboardingStepFourPostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepFour() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepFourPostResponse, AxiosError, OnboardingStepFourDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepFour(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-four"]})
    }
  })
}

