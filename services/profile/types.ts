export interface UserProfile {
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  timezone: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
}

export interface MyProfile {
  id: string;
  email: string;
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
}

export interface UpdateMyProfileResponse {
  profile: {
    id?: string;
    userId?: string;
    fullName?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    timezone?: string | null;
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
