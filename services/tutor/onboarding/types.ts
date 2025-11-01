export interface OnboardingStepOnePayload {
  firstName?: string;
  lastName?: string;
  countryOfBirth?: string;
  nationality?: string;
  countryCode?: string;
  phoneNumber?: string;
  isOver18?: boolean;
  subject?: string;
  languages?: {
    language: string;
    level: string;
  }[];
}

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


export interface OnboardingStepTwoPayload {
  file?: Buffer;
}

export type OnboardingStepTwoDto = Partial<OnboardingStepTwoPayload>;

export interface OnboardingStepTwoGetResponse extends OnboardingStepTwoPayload {
  currentStep: number;
}

export interface OnboardingStepTwoPostResponse extends OnboardingStepTwoPayload {
  id: string;
}


/* ======================
      ERROR SHAPE
   ====================== */

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
