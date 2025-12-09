import { useQuery } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepTwoGetResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useStepTwo() {
  return useQuery<OnboardingStepTwoGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-two"],
    queryFn: () => TutorOnboardingService.getOnboardingStepTwo(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}