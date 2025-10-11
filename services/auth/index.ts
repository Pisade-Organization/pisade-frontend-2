import apiInstancePublic from "../apiInstancePublic";
import { servicePath } from "../servicePath";
import type {
  SendMagicLinkDto,
  VerifyMagicLinkDto,
  RefreshTokenDto,
  VerifyMagicLinkResponse,
} from "./types";

export const AuthService = {
  /**
   * Send a magic link to the user's email.
   */
  async sendMagicLink(data: SendMagicLinkDto): Promise<void> {
    await apiInstancePublic.post(servicePath.auth.sendMagicLink, data);
  },

  /**
   * Verify a magic link token and get tokens + user data.
   */
  async verifyMagicLink(data: VerifyMagicLinkDto): Promise<VerifyMagicLinkResponse> {
    const res = await apiInstancePublic.post<VerifyMagicLinkResponse>(
      servicePath.auth.verifyMagicLink,
      data
    );
    return res.data;
  },

  /**
   * Refresh expired access token.
   */
  async refreshToken(data: RefreshTokenDto): Promise<VerifyMagicLinkResponse> {
    const res = await apiInstancePublic.post<VerifyMagicLinkResponse>(
      servicePath.auth.refresh,
      data
    );
    return res.data;
  },
};
