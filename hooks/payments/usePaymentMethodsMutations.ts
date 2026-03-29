import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentsService, type SavedPaymentMethod, type SavePaymentMethodDto } from "@/services/payments";
import { paymentsQueryKeys } from "./queryKeys";

/**
 * Hook to save a new payment method.
 */
export function useSavePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation<SavedPaymentMethod, Error, SavePaymentMethodDto>({
    mutationFn: (payload) => PaymentsService.saveMethod(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.methods() });
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.defaultMethod() });
    },
  });
}

/**
 * Hook to remove a saved payment method.
 */
export function useRemovePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (paymentMethodId) => PaymentsService.removeMethod(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.methods() });
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.defaultMethod() });
    },
  });
}

/**
 * Hook to set a payment method as default.
 */
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation<SavedPaymentMethod, Error, string>({
    mutationFn: (paymentMethodId) => 
      PaymentsService.setDefaultMethod({ paymentMethodId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.methods() });
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.defaultMethod() });
    },
  });
}
