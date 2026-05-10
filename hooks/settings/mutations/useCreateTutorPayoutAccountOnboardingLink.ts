import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type { TutorPayoutAccountLinkResponse } from "@/services/tutor-wallet/types";

export function useCreateTutorPayoutAccountOnboardingLink() {
  return useMutation<TutorPayoutAccountLinkResponse, AxiosError>({
    mutationFn: () => TutorWalletService.createPayoutAccountOnboardingLink(),
  });
}
