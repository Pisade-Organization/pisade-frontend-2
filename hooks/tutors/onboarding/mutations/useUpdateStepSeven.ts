import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepSevenDto, OnboardingStepSevenPostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepSeven() {
  const queryClient = useQueryClient();

  return useMutation<OnboardingStepSevenPostResponse, AxiosError, OnboardingStepSevenDto>({
    mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepSeven(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-seven"]})
    }
  })
}
