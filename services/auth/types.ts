export interface VerifyMagicLinkResponse {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      avatarUrl?: string;
      role: "STUDENT" | "TUTOR" | "ADMIN";
      onboardingStatus?: string;
    };
  }
  
  export interface SendMagicLinkDto {
    email: string;
    intent?: "TUTOR_SIGNUP" | "STUDENT_SIGNUP";
  }
  
  export interface VerifyMagicLinkDto {
    token: string;
  }
  
  export interface RefreshTokenDto {
    refresh_token: string;
  }
  