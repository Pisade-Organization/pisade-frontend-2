import apiInstanceClient from "@/services/apiInstanceClient";
import { servicePath } from "@/services/servicePath";
import type {
  OnboardingStepOneDto,
  OnboardingStepOneGetResponse,
  OnboardingStepOnePostResponse,

  OnboardingStepTwoDto,
  OnboardingStepTwoGetResponse,
  OnboardingStepTwoPostResponse,
} from './types'

export const TutorOnboardingService = {
  
  async getOnboardingStepOne(): Promise<OnboardingStepOneGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepOne);
    return res.data;
  },

  async saveOnboardingStepOne(data: OnboardingStepOneDto): Promise<OnboardingStepOnePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepOne, data);
    return res.data;
  },

  async getOnboardingStepTwo(): Promise<OnboardingStepTwoGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepTwo);
    return res.data;
  },

  async saveOnboardingStepTwo(data: OnboardingStepTwoDto): Promise<OnboardingStepTwoPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepTwo, data);
    return res.data;
  }
}