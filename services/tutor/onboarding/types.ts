import { OnboardingStepOnePayload } from "@/types/onboarding";

/* ======================
      REQUEST DTOs
   ====================== */

// POST: client submits onboarding step one fields
// userId/tutorId is auto-attached by axios interceptor
export type OnboardingStepOneDto = Partial<OnboardingStepOnePayload>;

/* ======================
      RESPONSES
   ====================== */

// GET response: server returns stored step-one fields + current step
export interface OnboardingStepOneGetResponse extends OnboardingStepOnePayload {
  currentStep: number;
}

// POST response: server returns saved object with metadata
export interface OnboardingStepOnePostResponse extends OnboardingStepOnePayload {
  id: string;
  tutorId: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

/* ======================
      ERROR SHAPE
   ====================== */

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
