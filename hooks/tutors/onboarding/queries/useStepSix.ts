import { useQuery } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepSixGetResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useStepSix() {
  return useQuery<OnboardingStepSixGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-six"],
    queryFn: () => TutorOnboardingService.getOnboardingStepSix(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
