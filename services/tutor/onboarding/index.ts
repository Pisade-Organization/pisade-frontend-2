import apiInstanceClient from "@/services/apiInstanceClient";
import { servicePath } from "@/services/servicePath";
import type {
  OnboardingStepOneDto,
  OnboardingStepOneGetResponse,
  OnboardingStepOnePostResponse
} from './types'

export const TutorOnboardingService = {
  
  async getOnboardingStepOne(): Promise<OnboardingStepOneGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepOne);
    return res.data;
  },

  async saveOnboardingStepOne(data: OnboardingStepOneDto): Promise<OnboardingStepOnePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepOne, data);
    return res.data;
  }
}