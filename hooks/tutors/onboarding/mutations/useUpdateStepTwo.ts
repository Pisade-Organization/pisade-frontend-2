import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TutorOnboardingService } from "@/services/tutor/onboarding";
import type { OnboardingStepTwoDto, OnboardingStepTwoPostResponse } from "@/services/tutor/onboarding/types";
import type { AxiosError } from "axios";

export function useSaveStepTwo() {
    const queryClient = useQueryClient();

    return useMutation<OnboardingStepTwoPostResponse, AxiosError, OnboardingStepTwoDto>({
        mutationFn: (payload) => TutorOnboardingService.saveOnboardingStepTwo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tutor-onboarding", "step-two"] })
        }
    })
}