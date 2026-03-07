import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  GetWalletTransactionsParams,
  Wallet,
  WalletSummary,
  WalletTransactionsResponse,
} from "./types";

export const WalletService = {
  async getMyWallet(): Promise<Wallet> {
    const response = await apiInstanceClient.get<ApiSuccessResponse<Wallet> | Wallet>(
      servicePath.wallet.getMyWallet,
    );

    return unwrapApiResponse(response.data);
  },

  async getMyWalletSummary(): Promise<WalletSummary> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<WalletSummary> | WalletSummary
    >(servicePath.wallet.getMyWalletSummary);

    return unwrapApiResponse(response.data);
  },

  async getMyWalletTransactions(
    params: GetWalletTransactionsParams = {},
  ): Promise<WalletTransactionsResponse> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<WalletTransactionsResponse> | WalletTransactionsResponse
    >(servicePath.wallet.getMyWalletTransactions, {
      params,
    });

    return unwrapApiResponse(response.data);
  },
};
