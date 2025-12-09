import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OnboardingStepFourGetResponse } from "@/services/tutor/onboarding/types";
import { TutorOnboardingService } from "@/services/tutor/onboarding";

export function useStepFour() {
  return useQuery<OnboardingStepFourGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-four"],
    queryFn: () => TutorOnboardingService.getOnboardingStepFour(),
    staleTime: Infinity, // Data never becomes stale, so it won't refetch automatically
    refetchOnWindowFocus: false, // Don't refetch when window regains focus (app switch)
    refetchOnReconnect: false, // Don't refetch when network reconnects
    retry: 1,
  })
}

