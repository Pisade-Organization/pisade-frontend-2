import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import {
  MyTutorProfile,
  TutorTransaction,
  SubmitTutorOnboardingResponse,
  UpdateMyTutorProfileDto,
} from "./types";

export const TutorService = {
  async getMyTutorProfile(): Promise<MyTutorProfile> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<MyTutorProfile> | MyTutorProfile
    >(servicePath.tutor.getMyTutorProfile);

    return unwrapApiResponse(response.data);
  },

  async updateMyTutorProfile(payload: UpdateMyTutorProfileDto): Promise<MyTutorProfile> {
    const response = await apiInstanceClient.patch<
      ApiSuccessResponse<MyTutorProfile> | MyTutorProfile
    >(servicePath.tutor.updateMyTutorProfile, payload);

    return unwrapApiResponse(response.data);
  },

  async getMyTutorTransactions(): Promise<TutorTransaction[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<TutorTransaction[]> | TutorTransaction[]
    >(servicePath.tutor.getMyTutorTransactions);

    return unwrapApiResponse(response.data);
  },

  async submitOnboarding(): Promise<SubmitTutorOnboardingResponse> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<SubmitTutorOnboardingResponse> | SubmitTutorOnboardingResponse
    >(servicePath.tutor.submitOnboarding);

    return unwrapApiResponse(response.data);
  },
};
