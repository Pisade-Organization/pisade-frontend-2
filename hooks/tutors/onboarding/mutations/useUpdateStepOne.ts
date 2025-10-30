import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepOneDto, OnboardingStepOnePostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepOne() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepOnePostResponse, AxiosError, OnboardingStepOneDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepOne(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-one"]})
    }
  })
}