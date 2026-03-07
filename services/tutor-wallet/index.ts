import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  GetTutorWithdrawalsParams,
  TutorWalletSummary,
  TutorWithdrawalsResponse,
} from "./types";

export const TutorWalletService = {
  async getWithdrawals(
    params: GetTutorWithdrawalsParams = {},
  ): Promise<TutorWithdrawalsResponse> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<TutorWithdrawalsResponse> | TutorWithdrawalsResponse
    >(servicePath.tutorWallet.getWithdrawals, {
      params,
    });

    return unwrapApiResponse(response.data);
  },

  async getSummary(): Promise<TutorWalletSummary> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<TutorWalletSummary> | TutorWalletSummary
    >(servicePath.tutorWallet.getSummary);

    return unwrapApiResponse(response.data);
  },
};
