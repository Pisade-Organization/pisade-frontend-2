import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepOneDto, OnboardingStepOnePostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepOne() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepOnePostResponse, AxiosError, OnboardingStepOneDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepOne(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["tutor-onboarding", "current-step"], {
        currentStep: Math.min(response.currentStep + 1, 9),
      })
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-one"]})
    }
  })
}
