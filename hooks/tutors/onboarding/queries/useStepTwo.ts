import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiInstanceClient from "@/services/apiInstanceClient";
import { servicePath } from "@/services/servicePath";

export function useStepTwo() {
    return useQuery<string, AxiosError>({
        queryKey: ["tutor-onboarding", "step-two"],
        queryFn: async () => {
            const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepTwo);
            // API returns the URL string directly
            return res.data as string;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}