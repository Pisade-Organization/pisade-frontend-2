import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepEightDto, OnboardingStepEightPostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepEight() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepEightPostResponse, AxiosError, OnboardingStepEightDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepEight(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-eight"]})
    }
  })
}
