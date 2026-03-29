import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { PaymentsService, type SavedPaymentMethod } from "@/services/payments";
import { paymentsQueryKeys } from "./queryKeys";

/**
 * Hook to fetch all saved payment methods for the current user.
 */
export function usePaymentMethods() {
  return useQuery<SavedPaymentMethod[], AxiosError>({
    queryKey: paymentsQueryKeys.methods(),
    queryFn: () => PaymentsService.getMethods(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch the default payment method.
 */
export function useDefaultPaymentMethod() {
  return useQuery<SavedPaymentMethod | null, AxiosError>({
    queryKey: paymentsQueryKeys.defaultMethod(),
    queryFn: () => PaymentsService.getDefaultMethod(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
