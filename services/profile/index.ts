import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import { resolveMediaUrl } from "@/lib/media";
import type {
  DeleteMyAccountResponse,
  LinkGoogleProviderDto,
  LinkGoogleProviderResponse,
  LinkedProvider,
  NotificationPreferences,
  MyProfile,
  MyNotificationsResponse,
  UnlinkProviderResponse,
  UpdateNotificationPreferencesDto,
  UpdateMyPhoneNumberDto,
  UpdateMyPhoneNumberResponse,
  UpdateMyProfileDto,
  UpdateMyProfileResponse,
} from "./types";

export const ProfileService = {
  async getMyProfile(): Promise<MyProfile> {
    const response = await apiInstanceClient.get<ApiSuccessResponse<MyProfile> | MyProfile>(
      servicePath.profile.getMyProfile,
    );

    const profile = unwrapApiResponse(response.data);

    return {
      ...profile,
      profile: profile.profile
        ? {
            ...profile.profile,
            avatarUrl: resolveMediaUrl(profile.profile.avatarUrl),
          }
        : null,
    };
  },

  async updateMyProfile(payload: UpdateMyProfileDto): Promise<UpdateMyProfileResponse> {
    const response = await apiInstanceClient.patch<
      ApiSuccessResponse<UpdateMyProfileResponse> | UpdateMyProfileResponse
    >(servicePath.profile.updateMyProfile, payload);

    const result = unwrapApiResponse(response.data);

    return {
      ...result,
      profile: result.profile
        ? {
            ...result.profile,
            avatarUrl: resolveMediaUrl(result.profile.avatarUrl),
          }
        : result.profile,
    };
  },

  async updateMyPhoneNumber(
    payload: UpdateMyPhoneNumberDto,
  ): Promise<UpdateMyPhoneNumberResponse> {
    const response = await apiInstanceClient.patch<
      ApiSuccessResponse<UpdateMyPhoneNumberResponse> | UpdateMyPhoneNumberResponse
    >(servicePath.profile.updateMyPhoneNumber, payload);

    return unwrapApiResponse(response.data);
  },

  async deleteMyAccount(): Promise<DeleteMyAccountResponse> {
    const response = await apiInstanceClient.delete<
      ApiSuccessResponse<DeleteMyAccountResponse> | DeleteMyAccountResponse
    >(servicePath.profile.deleteMyAccount);

    return unwrapApiResponse(response.data);
  },

  async getMyNotifications(): Promise<MyNotificationsResponse> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<MyNotificationsResponse> | MyNotificationsResponse
    >(servicePath.profile.getMyNotifications);

    return unwrapApiResponse(response.data);
  },

  async getMyNotificationPreferences(): Promise<NotificationPreferences> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<NotificationPreferences> | NotificationPreferences
    >(servicePath.profile.getMyNotificationPreferences);

    return unwrapApiResponse(response.data);
  },

  async updateMyNotificationPreferences(
    payload: UpdateNotificationPreferencesDto,
  ): Promise<NotificationPreferences> {
    const response = await apiInstanceClient.patch<
      ApiSuccessResponse<NotificationPreferences> | NotificationPreferences
    >(servicePath.profile.updateMyNotificationPreferences, payload);

    return unwrapApiResponse(response.data);
  },

  async getMyProviders(): Promise<LinkedProvider[]> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<LinkedProvider[]> | LinkedProvider[]
    >(servicePath.profile.getMyProviders);

    return unwrapApiResponse(response.data);
  },

  async linkGoogleProvider(
    payload: LinkGoogleProviderDto,
  ): Promise<LinkGoogleProviderResponse> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<LinkGoogleProviderResponse> | LinkGoogleProviderResponse
    >(servicePath.profile.linkGoogleProvider, payload);

    return unwrapApiResponse(response.data);
  },

  async unlinkProvider(providerId: string): Promise<UnlinkProviderResponse> {
    const response = await apiInstanceClient.delete<
      ApiSuccessResponse<UnlinkProviderResponse> | UnlinkProviderResponse
    >(servicePath.profile.unlinkProvider.replace(':providerId', providerId));

    return unwrapApiResponse(response.data);
  },
};
