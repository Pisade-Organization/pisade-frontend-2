import { useQuery } from '@tanstack/react-query'
import { TutorOnboardingService } from '@/services/tutor/onboarding'
import type { GetCurrentStepResponse } from '@/services/tutor/onboarding/types'
import type { AxiosError } from 'axios'

export function useCurrentStep() {
    return useQuery<GetCurrentStepResponse, AxiosError>({
        queryKey: ["tutor-onboarding", "current-step"],
        queryFn: () => TutorOnboardingService.getCurrentStep(),
        staleTime: Infinity, // Data never becomes stale, so it won't refetch automatically
        refetchOnWindowFocus: false, // Don't refetch when window regains focus (app switch)
        refetchOnReconnect: false, // Don't refetch when network reconnects
        retry: 1
    })
}