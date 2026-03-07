import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { DeleteMyAccountResponse } from "@/services/profile/types";

export function useDeleteMyAccount() {
  return useMutation<DeleteMyAccountResponse, AxiosError>({
    mutationFn: () => ProfileService.deleteMyAccount(),
  });
}
