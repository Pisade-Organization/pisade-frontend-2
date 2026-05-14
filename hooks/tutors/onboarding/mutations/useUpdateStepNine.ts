import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepNineDto, OnboardingStepNinePostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepNine() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepNinePostResponse, AxiosError, OnboardingStepNineDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepNine(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["tutor-onboarding", "current-step"], {
        currentStep: Math.min(response.currentStep + 1, 9),
      })
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-nine"]})
    }
  })
}
