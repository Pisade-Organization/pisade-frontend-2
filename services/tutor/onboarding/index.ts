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
  OnboardingStepThreeGetResponse,
  OnboardingStepThreeDto,
  OnboardingStepThreePostResponse,
  OnboardingStepFourGetResponse,
  OnboardingStepFourDto,
  OnboardingStepFourPostResponse,
  GetCurrentStepResponse,
} from './types'

export const TutorOnboardingService = {

  // GET CURRENT STEP
  async getCurrentStep(): Promise<GetCurrentStepResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getCurrentStep);
    return res.data;
  },
  
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

  // GET STEP 3
  async getOnboardingStepThree(): Promise<OnboardingStepThreeGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepThree);
    return res.data;
  },

  // SAVE STEP 3
  async saveOnboardingStepThree(data: OnboardingStepThreeDto): Promise<OnboardingStepThreePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepThree, data);
    return res.data;
  },

  // GET STEP 4
  async getOnboardingStepFour(): Promise<OnboardingStepFourGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepFour);
    return res.data;
  },

  // SAVE STEP 4
  async saveOnboardingStepFour(data: OnboardingStepFourDto): Promise<OnboardingStepFourPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepFour, data);
    return res.data;
  },

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