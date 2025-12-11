import { useQuery } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepEightGetResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useStepEight() {
  return useQuery<OnboardingStepEightGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-eight"],
    queryFn: () => TutorOnboardingService.getOnboardingStepEight(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
