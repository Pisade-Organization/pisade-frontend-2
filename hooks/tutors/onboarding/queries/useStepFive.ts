import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OnboardingStepFiveGetResponse } from "@/services/tutor/onboarding/types";
import { TutorOnboardingService } from "@/services/tutor/onboarding";

export function useStepFive() {
  return useQuery<OnboardingStepFiveGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-five"],
    queryFn: () => TutorOnboardingService.getOnboardingStepFive(),
    staleTime: Infinity, // Data never becomes stale, so it won't refetch automatically
    refetchOnWindowFocus: false, // Don't refetch when window regains focus (app switch)
    refetchOnReconnect: false, // Don't refetch when network reconnects
    retry: 1,
  })
}

