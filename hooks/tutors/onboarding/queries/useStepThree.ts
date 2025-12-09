import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OnboardingStepThreeGetResponse } from "@/services/tutor/onboarding/types";
import { TutorOnboardingService } from "@/services/tutor/onboarding";

export function useStepThree() {
  return useQuery<OnboardingStepThreeGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-three"],
    queryFn: () => TutorOnboardingService.getOnboardingStepThree(),
    staleTime: Infinity, // Data never becomes stale, so it won't refetch automatically
    refetchOnWindowFocus: false, // Don't refetch when window regains focus (app switch)
    refetchOnReconnect: false, // Don't refetch when network reconnects
    retry: 1,
  })
}