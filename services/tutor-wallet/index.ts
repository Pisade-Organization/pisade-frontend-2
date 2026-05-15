import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  CreateTutorPayoutAccountLinkDto,
  GetTutorWithdrawalsParams,
  TutorPayoutAccount,
  TutorPayoutAccountLinkResponse,
  RequestTutorWithdrawDto,
  RequestTutorWithdrawResponse,
  TutorWalletSummary,
  TutorWithdrawalsResponse,
} from "./types";

export const TutorWalletService = {
  async requestWithdraw(payload: RequestTutorWithdrawDto): Promise<RequestTutorWithdrawResponse> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<RequestTutorWithdrawResponse> | RequestTutorWithdrawResponse
    >(servicePath.tutorWallet.requestWithdraw, payload);

    return unwrapApiResponse(response.data);
  },

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

  async getPayoutAccount(): Promise<TutorPayoutAccount> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<TutorPayoutAccount> | TutorPayoutAccount
    >(servicePath.tutorWallet.getPayoutAccount);

    return unwrapApiResponse(response.data);
  },

  async createPayoutAccountOnboardingLink(
    payload: CreateTutorPayoutAccountLinkDto = {},
  ): Promise<TutorPayoutAccountLinkResponse> {
    const response = await apiInstanceClient.post<
      | ApiSuccessResponse<TutorPayoutAccountLinkResponse>
      | TutorPayoutAccountLinkResponse
    >(servicePath.tutorWallet.createPayoutAccountOnboardingLink, payload);

    return unwrapApiResponse(response.data);
  },

  async createPayoutAccountDashboardLink(): Promise<TutorPayoutAccountLinkResponse> {
    const response = await apiInstanceClient.post<
      | ApiSuccessResponse<TutorPayoutAccountLinkResponse>
      | TutorPayoutAccountLinkResponse
    >(servicePath.tutorWallet.createPayoutAccountDashboardLink);

    return unwrapApiResponse(response.data);
  },
};
