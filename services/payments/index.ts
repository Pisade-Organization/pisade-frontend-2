import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  SavedPaymentMethod,
  SavePaymentMethodDto,
  SetDefaultPaymentMethodDto,
} from "./types";

export const PaymentsService = {
  /**
   * Get all saved payment methods for the current user.
   */
  async getMethods(): Promise<SavedPaymentMethod[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<SavedPaymentMethod[]> | SavedPaymentMethod[]
    >(servicePath.payments.getMethods);

    return unwrapApiResponse(response.data);
  },

  /**
   * Save a new payment method.
   */
  async saveMethod(payload: SavePaymentMethodDto): Promise<SavedPaymentMethod> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<SavedPaymentMethod> | SavedPaymentMethod
    >(servicePath.payments.saveMethod, payload);

    return unwrapApiResponse(response.data);
  },

  /**
   * Remove a saved payment method.
   */
  async removeMethod(paymentMethodId: string): Promise<{ success: boolean }> {
    const path = servicePath.payments.removeMethod.replace(":id", paymentMethodId);
    const response = await apiInstanceClient.delete<
      ApiSuccessResponse<{ success: boolean }> | { success: boolean }
    >(path);

    return unwrapApiResponse(response.data);
  },

  /**
   * Get the default payment method.
   */
  async getDefaultMethod(): Promise<SavedPaymentMethod | null> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<SavedPaymentMethod | null> | SavedPaymentMethod | null
    >(servicePath.payments.getDefaultMethod);

    return unwrapApiResponse(response.data);
  },

  /**
   * Set a payment method as the default.
   */
  async setDefaultMethod(payload: SetDefaultPaymentMethodDto): Promise<SavedPaymentMethod> {
    const response = await apiInstanceClient.put<
      ApiSuccessResponse<SavedPaymentMethod> | SavedPaymentMethod
    >(servicePath.payments.setDefaultMethod, payload);

    return unwrapApiResponse(response.data);
  },
};

// Re-export types for convenience
export * from "./types";
