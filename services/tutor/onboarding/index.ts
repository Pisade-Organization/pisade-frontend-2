import apiInstanceClient from "@/services/apiInstanceClient";
import { servicePath } from "@/services/servicePath";
import type {
  // STEP 1
  OnboardingStepOneDto,
  OnboardingStepOneGetResponse,
  OnboardingStepOnePostResponse,

  // STEP 2
  OnboardingStepTwoDto,
  OnboardingStepTwoGetResponse,
  OnboardingStepTwoPostResponse,

  // STEP 5
  OnboardingStepFiveDto,
  OnboardingStepFiveGetResponse,
  OnboardingStepFivePostResponse,
} from './types'

export const TutorOnboardingService = {
  
  // GET STEP 1
  async getOnboardingStepOne(): Promise<OnboardingStepOneGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepOne);
    return res.data;
  },

  // SAVE STEP 1
  async saveOnboardingStepOne(data: OnboardingStepOneDto): Promise<OnboardingStepOnePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepOne, data);
    return res.data;
  },

  // GET STEP 2
  async getOnboardingStepTwo(): Promise<OnboardingStepTwoGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepTwo);
    return res.data;
  },

  // SAVE STEP 2
  async saveOnboardingStepTwo(data: OnboardingStepTwoDto): Promise<OnboardingStepTwoPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepTwo, data);
    return res.data;
  },

  // ....


  // GET STEP FIVE
  async getOnboardingStepFive(): Promise<OnboardingStepFiveGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepFive);
    return res.data;
  },

  async saveOnboardingStepFive(data: OnboardingStepFiveDto): Promise<OnboardingStepFivePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepFive, data);
    return res.data;
  }


}