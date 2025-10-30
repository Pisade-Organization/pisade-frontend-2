import { useQuery } from '@tanstack/react-query'
import { TutorOnboardingService } from '@/services/tutor/onboarding'
import type { OnboardingStepOneGetResponse } from '@/services/tutor/onboarding/types'
import type { AxiosError } from 'axios'

export function useStepOne() {
  return useQuery<OnboardingStepOneGetResponse, AxiosError>({
    queryKey: ["tutor-onboarding", "step-one"],
    queryFn: () => TutorOnboardingService.getOnboardingStepOne(),
    staleTime: 1000 * 60 * 5, //cache for 5 minutes,
    retry: 1, // retry once on failure
  })
}