import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type {
  RequestTutorWithdrawDto,
  RequestTutorWithdrawResponse,
} from "@/services/tutor-wallet/types";

export function useRequestTutorWithdrawal() {
  return useMutation<
    RequestTutorWithdrawResponse,
    AxiosError,
    RequestTutorWithdrawDto
  >({
    mutationFn: (payload) => TutorWalletService.requestWithdraw(payload),
  });
}
