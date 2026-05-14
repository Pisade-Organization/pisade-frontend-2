import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepThreeDto, OnboardingStepThreePostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepThree() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepThreePostResponse, AxiosError, OnboardingStepThreeDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepThree(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["tutor-onboarding", "current-step"], {
        currentStep: Math.min(response.currentStep + 1, 9),
      })
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-three"]})
    }
  })
}
