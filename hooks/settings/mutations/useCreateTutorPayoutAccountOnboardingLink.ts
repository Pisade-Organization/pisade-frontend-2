import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type {
  CreateTutorPayoutAccountLinkDto,
  TutorPayoutAccountLinkResponse,
} from "@/services/tutor-wallet/types";

export function useCreateTutorPayoutAccountOnboardingLink() {
  return useMutation<
    TutorPayoutAccountLinkResponse,
    AxiosError,
    CreateTutorPayoutAccountLinkDto | undefined
  >({
    mutationFn: (payload) => TutorWalletService.createPayoutAccountOnboardingLink(payload),
  });
}
