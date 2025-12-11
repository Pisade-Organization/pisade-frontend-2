export interface GetCurrentStepResponse {
  currentStep: number;
}

// STEP 1
// POST DTO
export interface OnboardingStepOneDto {
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

// GET RESPONSE
export interface OnboardingStepOneGetResponse {
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
  currentStep: number;
}

// POST RESPONSE
export interface OnboardingStepOnePostResponse {
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
  id: string;
  tutorId: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

// STEP 2
export interface OnboardingStepTwoDto {
  key?: string;
}

// GET RESPONSE
export interface OnboardingStepTwoGetResponse {
  avatarUrl: string;
}

// POST DTO
// (same as STEP 2 - OnboardingStepTwoDto)

// POST RESPONSE
export interface OnboardingStepTwoPostResponse {
  key?: string;
  id: string;
  avatarUrl: string;
}

export interface CertificationDto {
  certificationName: string;
  description: string;
  issuedBy: string;
  startYear: number;
  endYear: number;
  certificateFileKey?: string;
}

export interface CertificationResponse {
  certificationName: string;
  description: string;
  issuedBy: string;
  startYear: number;
  endYear: number;
  certificateFileUrl?: string;
}

// STEP 3
// POST DTO
export interface OnboardingStepThreeDto {
  hasTeachingCertificate?: boolean;
  certifications?: CertificationDto[];
}

// GET RESPONSE
export interface OnboardingStepThreeGetResponse {
  hasTeachingCertificate?: boolean;
  subject?: string;
  certifications?: CertificationResponse[];
}

// POST RESPONSE
export interface OnboardingStepThreePostResponse {
  id: string;
  tutorId: string;
  currentStep: number;
  message: string;
  hasTeachingCertificate: boolean;
  certificationsCount: boolean;
  certifications: CertificationResponse[];
}

export enum Degree {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  ASSOCIATE = "ASSOCIATE",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
}

export interface EducationDto {
  universityName: string;
  degree: Degree;
  fieldOfStudy: string;
  specialization: string;
  yearStart: number;
  yearEnd?: number;
  currentlyStudying?: boolean;
  fileUrl?: string;
  diplomaFileKey?: string;
}

// STEP 4
// POST DTO
export interface OnboardingStepFourDto {
  hasDiploma?: boolean;
  educations?: EducationDto[];
}

// GET RESPONSE
export interface OnboardingStepFourGetResponse {
  hasDiploma?: boolean;
  diplomas?: EducationDto[];
}

// POST RESPONSE
export interface OnboardingStepFourPostResponse {
  message: string;
  id: string;
  tutorId: string;
  currentStep: number;
  hasDiploma?: boolean;
  diplomasCreated?: number;
}

// STEP 5
// POST DTO
export interface OnboardingStepFiveDto {
  introduceYourself?: string;
  teachingExperience?: string;
  motivatePotentialStudents?: string;
  catchyHeadline?: string;
}

// GET RESPONSE
export interface OnboardingStepFiveGetResponse {
  introduceYourself?: string;
  teachingExperience?: string;
  motivatePotentialStudents?: string;
  catchyHeadline?: string;
  currentStep: number;
}

// POST RESPONSE
export interface OnboardingStepFivePostResponse {
  introduceYourself?: string;
  teachingExperience?: string;
  motivatePotentialStudents?: string;
  catchyHeadline?: string;
  message: string;
  onboardingId: string;
  currentStep: number;
}

// STEP 6
// POST DTO
export interface OnboardingStepSixDto {
  videoKey?: string;
  thumbnailKey?: string | null;
}

//GET RESPONSE
export interface OnboardingStepSixGetResponse {
  videoUrl?: string;
  thumbnailUrl?: string;
}

// POST RESPONSE
export interface OnboardingStepSixPostResponse {
  id: string;
  tutorId: string;
  currentStep: number;
  message: string;
  videoUrl: string;
  thumbnailUrl: string | null;
}

// STEP 7

// HELPERS
export interface AvailabilityDto {
  day: number;
  startTime: string;
}

export interface AvailabilityGetResponse {
  id: string;
  onboardingId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface AvailabilityPostResponse {
  onboardingId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

// POST DTO
export interface OnboardingStepSevenDto {
  timezone: string;
  availabilities: AvailabilityDto[];
}

// GET RESPONSE
export interface OnboardingStepSevenGetResponse {
  timezone: string;
  availabilities: AvailabilityGetResponse[];
}

// POST RESPONSE
export interface OnboardingStepSevenPostResponse {
  id: string;
  tutorId: string;
  currentStep: number;
  timezone: string;
  message: string;
  availabilities: AvailabilityPostResponse[];
}

// STEP 8

// HELPERS
export enum WithdrawalMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  PROMPTPAY = "PROMPTPAY",
}

// POST DTO
export interface OnboardingStepEightDto {
  lessonPrice?: number;
  withdrawalMethod?: WithdrawalMethod;
  withdrawalPhoneNumber?: string;
  bankName?: string;
  bankAccountNumber?: string;
}

// GET RESPONSE
export interface OnboardingStepEightGetResponse {
  lessonPrice?: number | null;
  withdrawalMethod?: string | null;
  withdrawalPhoneNumber?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
}

// POST RESPONSE
export interface OnboardingStepEightPostResponse {
  id: string;
  tutorId: string;
  currentStep: number;
  message: string;
  lessonPrice: number;
  withdrawalMethod: WithdrawalMethod,
  withdrawalPhoneNumber: string,
  bankName: string,
  bankAccountNumber: string,
}

// STEP 9

// HELPERS
export enum DocumentType {
  ID_CARD = 'ID_CARD',
  PASSPORT = 'PASSPORT',
}

// POST DTO
export interface OnboardingStepNineDto {
  documentType?: DocumentType;
  idCardKey?: string;
  passportKey?: string;
}

// GET RESPONSE
export interface OnboardingStepNineGetResponse {
  documentType: DocumentType | null;
  idCardUrl: string | null;
  passportUrl: string | null;
}

// POST RESPONSE
export interface OnboardingStepNinePostResponse {
  id: string;
  tutorId: string;
  currentStep: number;
  message: string;
  documentType: DocumentType;
  idCardUrl: string | null;
  passportUrl: string | null;
}

/* ======================
      ERROR SHAPE
   ====================== */

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
