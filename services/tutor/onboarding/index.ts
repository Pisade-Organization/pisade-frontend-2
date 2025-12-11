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

  // STEP 3
  OnboardingStepThreeDto,
  OnboardingStepThreeGetResponse,
  OnboardingStepThreePostResponse,

  // STEP 4
  OnboardingStepFourDto,
  OnboardingStepFourGetResponse,
  OnboardingStepFourPostResponse,

  // STEP 5
  OnboardingStepFiveDto,
  OnboardingStepFiveGetResponse,
  OnboardingStepFivePostResponse,

  // STEP 6
  OnboardingStepSixDto,
  OnboardingStepSixGetResponse,
  OnboardingStepSixPostResponse,

  // STEP 7
  OnboardingStepSevenDto,
  OnboardingStepSevenGetResponse,
  OnboardingStepSevenPostResponse,

  // STEP 8
  OnboardingStepEightDto,
  OnboardingStepEightGetResponse,
  OnboardingStepEightPostResponse,

  // STEP 9
  OnboardingStepNineDto,
  OnboardingStepNineGetResponse,
  OnboardingStepNinePostResponse,

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
  },

  // GET STEP SIX
  async getOnboardingStepSix(): Promise<OnboardingStepSixGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepSix);
    return res.data;
  },

  // SAVE STEP SIX
  async saveOnboardingStepSix(data: OnboardingStepSixDto): Promise<OnboardingStepSixPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepSix, data);
    return res.data;
  },

  // GET STEP SEVEN
  async getOnboardingStepSeven(): Promise<OnboardingStepSevenGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepSeven);
    return res.data;
  },

  // SAVE STEP SEVEN
  async saveOnboardingStepSeven(data: OnboardingStepSevenDto): Promise<OnboardingStepSevenPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepSeven, data);
    return res.data;
  },

  // GET STEP EIGHT
  async getOnboardingStepEight(): Promise<OnboardingStepEightGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepEight);
    return res.data;
  },

  // SAVE STEP EIGHT
  async saveOnboardingStepEight(data: OnboardingStepEightDto): Promise<OnboardingStepEightPostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepEight, data);
    return res.data;
  },

  // GET STEP NINE
  async getOnboardingStepNine(): Promise<OnboardingStepNineGetResponse> {
    const res = await apiInstanceClient.get(servicePath.onboarding.getOnboardingStepNine);
    return res.data;
  },

  // SAVE STEP NINE
  async saveOnboardingStepNine(data: OnboardingStepNineDto): Promise<OnboardingStepNinePostResponse> {
    const res = await apiInstanceClient.post(servicePath.onboarding.saveOnboardingStepNine, data);
    return res.data;
  },

}