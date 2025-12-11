import { useQuery } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepSevenGetResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useStepSeven() {
  return useQuery<OnboardingStepSevenGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-seven"],
    queryFn: () => TutorOnboardingService.getOnboardingStepSeven(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
