export interface UserProfile {
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  timezone: string | null;
  countryOfBirth: string | null;
  nationality: string | null;
}

export interface MyProfile {
  id: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile | null;
}

export interface UpdateMyProfileDto {
  fullName?: string;
  avatarUrl?: string;
  bio?: string;
  timezone?: string;
  countryOfBirth?: string;
  nationality?: string;
}

export interface UpdateMyProfileResponse {
  profile: {
    id?: string;
    userId?: string;
    fullName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    timezone?: string | null;
    countryOfBirth?: string | null;
    nationality?: string | null;
    createdAt?: string;
    updatedAt?: string;
    user?: {
      id: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
    };
  };
}

export interface UpdateMyPhoneNumberDto {
  phoneNumber: string;
}

export interface UpdateMyPhoneNumberResponse {
  id: string;
  phoneNumber: string;
}

export interface DeleteMyAccountResponse {
  message: string;
  recoverUntil: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  content: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface MyNotificationsResponse {
  total: number;
  unreadCount: number;
  notifications: NotificationItem[];
}

export interface NotificationPreferences {
  isReceivedEmailNotification: boolean;
  isReceivedSMSNotification: boolean;
}

export interface UpdateNotificationPreferencesDto {
  isReceivedEmailNotification?: boolean;
  isReceivedSMSNotification?: boolean;
}

export interface LinkedProvider {
  id: string;
  provider: "GOOGLE" | "LOCAL" | "FACEBOOK" | string;
  providerId?: string | null;
  email?: string | null;
  createdAt?: string;
}

export interface LinkGoogleProviderDto {
  googleToken: string;
}

export interface LinkGoogleProviderResponse {
  message: string;
  provider: LinkedProvider;
}

export interface UnlinkProviderResponse {
  message: string;
}
