import { useQuery } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepNineGetResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useStepNine() {
  return useQuery<OnboardingStepNineGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-nine"],
    queryFn: () => TutorOnboardingService.getOnboardingStepNine(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
