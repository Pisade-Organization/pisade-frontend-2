import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepFiveDto, OnboardingStepFivePostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepFive() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepFivePostResponse, AxiosError, OnboardingStepFiveDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepFive(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-five"]})
    }
  })
}

