// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosBase, { AxiosError } from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: Role;
    onboardingStatus?: string;
    fullName?: string;
    avatarUrl?: string;
  }
  interface Session {
    user: User;
    access_token: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: Role;
    onboardingStatus?: string;
    fullName?: string;
    avatarUrl?: string;
    access_token?: string;
    refresh_token?: string;
    exp?: number;
    error?: string;
    _revalidateAt?: number;
  }
}

// --------- Axios (server-side) ----------
const api = axiosBase.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 7_000,
  headers: { "Content-Type": "application/json" },
});

// --------- Types from your backend ----------
export type Role = "STUDENT" | "TUTOR" | "ADMIN";

type BackendUser = {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: Role;
  onboardingStatus?: string;
};

type BackendAuthResponse = {
  access_token: string;
  refresh_token: string;
  user: BackendUser;
};

type Decoded = {
  exp: number; // seconds since epoch
  sub?: string;
  email?: string;
  role?: Role;
  onboardingStatus?: string;
  jti?: string;
};

// --------- Constants ----------
const SKEW = 90; // refresh 90s before exp
const REVALIDATE_EVERY = 60; // re-check user existence every 60s
const MAX_EXP_VALUE = 253402300799; // Year 9999 in seconds (to detect millisecond timestamps)
const EPOCH_THRESHOLD = 1e12; // Threshold to differentiate seconds vs milliseconds

// --------- Logging helper ----------
function logAuth(level: "info" | "warn" | "error", message: string, data?: any) {
  const prefix = "[NextAuth]";
  const timestamp = new Date().toISOString();
  const logMessage = `${prefix} [${timestamp}] ${message}`;
  
  if (data) {
    switch (level) {
      case "error":
        console.error(logMessage, data);
        break;
      case "warn":
        console.warn(logMessage, data);
        break;
      default:
        console.log(logMessage, data);
    }
  } else {
    switch (level) {
      case "error":
        console.error(logMessage);
        break;
      case "warn":
        console.warn(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }
}

// --------- Exp normalization ----------
function normalizeExp(exp: number | undefined): number | undefined {
  if (!exp || exp <= 0) return undefined;
  
  // If exp looks like milliseconds (larger than threshold), convert to seconds
  if (exp > EPOCH_THRESHOLD) {
    logAuth("warn", "Exp value appears to be in milliseconds, converting to seconds", { original: exp });
    return Math.floor(exp / 1000);
  }
  
  // If exp is impossibly large, it's likely a mistake
  if (exp > MAX_EXP_VALUE) {
    logAuth("error", "Exp value is impossibly large, rejecting", { exp });
    return undefined;
  }
  
  return exp;
}

// --------- Refresh stampede gate with proper error handling ----------
let refreshPromise: Promise<BackendAuthResponse> | null = null;
let refreshTokenInUse: string | null = null;

async function refreshTokenOnce(refresh_token: string): Promise<BackendAuthResponse> {
  // If same token is already being refreshed, return existing promise
  if (refreshPromise && refreshTokenInUse === refresh_token) {
    logAuth("info", "Refresh already in progress for this token, reusing promise");
    return refreshPromise;
  }
  
  // If different token, wait for current refresh or start new one
  if (refreshPromise && refreshTokenInUse !== refresh_token) {
    logAuth("warn", "Different refresh token detected, waiting for current refresh to complete");
    try {
      await refreshPromise;
    } catch {
      // Ignore - we'll start our own refresh
    }
  }
  
  // Start new refresh
  refreshTokenInUse = refresh_token;
  refreshPromise = (async () => {
    try {
      logAuth("info", "Starting token refresh");
      const { data } = await api.post<BackendAuthResponse>("/auth/refresh", { refresh_token });
      
      // Validate response structure
      if (!data?.access_token || !data?.refresh_token) {
        throw new Error("Invalid refresh response: missing tokens");
      }
      
      // If user is not included, we'll use existing token data
      if (!data.user) {
        logAuth("warn", "Refresh response missing user object, will preserve existing user data");
      }
      
      logAuth("info", "Token refresh successful");
      return data;
    } catch (err) {
      const ax = err as AxiosError;
      const errorMessage = ax.response?.data || ax.message || "Unknown error";
      const statusCode = ax.response?.status;
      
      logAuth("error", "Token refresh failed", {
        status: statusCode,
        error: errorMessage,
        message: ax.message,
      });
      
      // Clear tokens on permanent failures (401, 403, 400)
      if (statusCode === 401 || statusCode === 403 || statusCode === 400) {
        throw new Error(`RefreshTokenPermanentFailure: ${statusCode}`);
      }
      
      // Re-throw for retry on temporary failures
      throw err;
    } finally {
      refreshPromise = null;
      refreshTokenInUse = null;
    }
  })();
  
  return refreshPromise;
}

// --------- Early refresh + revalidation ----------
function shouldRefresh(exp?: number): boolean {
  if (!exp) {
    logAuth("info", "No exp value found, should refresh");
    return true;
  }
  
  const normalizedExp = normalizeExp(exp);
  if (!normalizedExp) {
    logAuth("warn", "Invalid exp value after normalization, should refresh");
    return true;
  }
  
  const now = dayjs().unix();
  const timeUntilExp = normalizedExp - now;
  const shouldRefreshNow = now >= normalizedExp - SKEW;
  
  if (shouldRefreshNow) {
    logAuth("info", "Token should be refreshed", {
      timeUntilExp,
      exp: normalizedExp,
      now,
      skew: SKEW,
    });
  }
  
  return shouldRefreshNow;
}

function needsRevalidate(nextAt?: number): boolean {
  if (!nextAt) {
    logAuth("info", "No revalidate timestamp, needs revalidation");
    return true;
  }
  
  const now = dayjs().unix();
  const needs = now >= nextAt;
  
  if (needs) {
    logAuth("info", "User revalidation needed", { nextAt, now });
  }
  
  return needs;
}

async function revalidateUser(token: any): Promise<any> {
  if (!token?.access_token) {
    logAuth("error", "Cannot revalidate: no access token");
    return token;
  }
  
  try {
    logAuth("info", "Revalidating user profile");
    const { data } = await api.get<BackendUser>("/profile/me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });

    // ✅ overwrite profile fields so frontend always sees latest info
    const updates: Partial<typeof token> = {};
    if (data.email) updates.email = data.email;
    if (data.role) updates.role = data.role;
    if (data.onboardingStatus !== undefined) updates.onboardingStatus = data.onboardingStatus;
    if (data.fullName !== undefined) updates.fullName = data.fullName;
    if (data.avatarUrl !== undefined) updates.avatarUrl = data.avatarUrl;
    
    Object.assign(token, updates);
    token._revalidateAt = dayjs().add(REVALIDATE_EVERY, "second").unix();
    
    logAuth("info", "User revalidation successful", { updatedFields: Object.keys(updates) });
    return token;
  } catch (err) {
    const ax = err as AxiosError;
    const statusCode = ax.response?.status;
    const errorMessage = ax.response?.data || ax.message || "Unknown error";
    
    // Differentiate between permanent and temporary errors
    if (statusCode === 401 || statusCode === 403) {
      // Permanent: user deleted, disabled, or token invalid
      logAuth("error", "User revalidation failed: permanent error", {
        status: statusCode,
        error: errorMessage,
      });
      token.error = "UserDeletedOrInvalid";
      delete token.access_token;
      delete token.refresh_token;
      delete token.exp;
      return token;
    } else {
      // Temporary: network error, 500, etc. - preserve token but log
      logAuth("warn", "User revalidation failed: temporary error, preserving token", {
        status: statusCode,
        error: errorMessage,
      });
      // Extend revalidate time to retry sooner
      token._revalidateAt = dayjs().add(30, "second").unix();
      return token;
    }
  }
}

// --------- Providers (backend owns auth) ----------
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Force JWT callback to run every 10 minutes
    // This ensures refresh logic is evaluated regularly
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 10 * 60, // Update session every 10 minutes (triggers jwt callback)
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: "magicLink",
      name: "Magic Link",
      credentials: { token: { label: "Token", type: "text" } },
      async authorize(credentials) {
        const token = credentials?.token?.trim();
        if (!token) {
          logAuth("warn", "Magic link authorization: no token provided");
          return null;
        }
        try {
          const { data } = await api.get<BackendAuthResponse>("/auth/verify-magic-link", {
            params: { token },
          });
          if (!data?.access_token || !data?.refresh_token || !data?.user) {
            logAuth("error", "Magic link authorization: invalid response structure", {
              hasAccessToken: !!data?.access_token,
              hasRefreshToken: !!data?.refresh_token,
              hasUser: !!data?.user,
            });
            return null;
          }
          logAuth("info", "Magic link authorization successful", { userId: data.user.id });
          return { ...data.user, _access_token: data.access_token, _refresh_token: data.refresh_token } as any;
        } catch (err) {
          const ax = err as AxiosError;
          logAuth("error", "Magic link authorization failed", {
            status: ax.response?.status,
            error: ax.response?.data || ax.message,
          });
          return null;
        }
      },
    }),

    // Backend handles Google; we just pass the one-time googleToken to exchange
    CredentialsProvider({
      id: "google",
      name: "Google",
      credentials: { googleToken: { label: "Google Token", type: "text" } },
      async authorize(credentials) {
        const googleToken = credentials?.googleToken?.trim();
        if (!googleToken) {
          logAuth("warn", "Google authorization: no token provided");
          return null;
        }
        try {
          const { data } = await api.post<BackendAuthResponse>("/auth/google/callback", { googleToken });
          if (!data?.access_token || !data?.refresh_token || !data?.user) {
            logAuth("error", "Google authorization: invalid response structure", {
              hasAccessToken: !!data?.access_token,
              hasRefreshToken: !!data?.refresh_token,
              hasUser: !!data?.user,
            });
            return null;
          }
          logAuth("info", "Google authorization successful", { userId: data.user.id });
          return { ...data.user, _access_token: data.access_token, _refresh_token: data.refresh_token } as any;
        } catch (err) {
          const ax = err as AxiosError;
          logAuth("error", "Google authorization failed", {
            status: ax.response?.status,
            error: ax.response?.data || ax.message,
          });
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      logAuth("info", "JWT callback invoked", {
        trigger,
        hasUser: !!user,
        hasRefreshToken: !!token.refresh_token,
        hasAccessToken: !!token.access_token,
        currentExp: token.exp,
      });

      // Initial sign-in from either credentials provider
      if (user && (user as any)._access_token) {
        const access_token = (user as any)._access_token as string;
        const refresh_token = (user as any)._refresh_token as string;
        
        let decoded: Decoded;
        try {
          decoded = jwtDecode<Decoded>(access_token);
        } catch (err) {
          logAuth("error", "Failed to decode JWT on initial sign-in", { error: err });
          throw err;
        }

        const normalizedExp = normalizeExp(decoded.exp);

        token.id = (user as any).id ?? decoded.sub;
        token.email = (user as any).email ?? decoded.email;
        token.role = (user as any).role ?? decoded.role;
        token.onboardingStatus = (user as any).onboardingStatus ?? decoded.onboardingStatus;
        token.fullName = (user as any).fullName;
        token.avatarUrl = (user as any).avatarUrl;

        token.access_token = access_token;
        token.refresh_token = refresh_token;
        token.exp = normalizedExp;
        token.error = undefined;
        token._revalidateAt = dayjs().add(REVALIDATE_EVERY, "second").unix();
        
        logAuth("info", "Initial sign-in token set", {
          userId: token.id,
          email: token.email,
          exp: token.exp,
        });
        
        return token;
      }

      // Early refresh if close to expiry
      if (shouldRefresh(token.exp) && token.refresh_token) {
        try {
          const data = await refreshTokenOnce(token.refresh_token as string);
          let decoded: Decoded;
          try {
            decoded = jwtDecode<Decoded>(data.access_token);
          } catch (err) {
            logAuth("error", "Failed to decode refreshed JWT", { error: err });
            throw new Error("Invalid refreshed token");
          }

          const normalizedExp = normalizeExp(decoded.exp);

          token.access_token = data.access_token;
          token.refresh_token = data.refresh_token;
          token.exp = normalizedExp;
          token.error = undefined;

          // ✅ hydrate profile fields from backend refresh response (if user object exists)
          if (data.user) {
            token.email = data.user.email ?? token.email;
            token.role = data.user.role ?? token.role;
            token.onboardingStatus = data.user.onboardingStatus ?? token.onboardingStatus;
            token.fullName = data.user.fullName ?? token.fullName;
            token.avatarUrl = data.user.avatarUrl ?? token.avatarUrl;
            logAuth("info", "Token refreshed with user data", {
              exp: token.exp,
              updatedFields: Object.keys(data.user),
            });
          } else {
            logAuth("info", "Token refreshed but no user data in response, preserving existing", {
              exp: token.exp,
            });
          }
        } catch (err) {
          const ax = err as AxiosError;
          const errorMessage = err instanceof Error ? err.message : String(err);
          
          // Check if this is a permanent failure
          if (errorMessage.includes("RefreshTokenPermanentFailure")) {
            logAuth("error", "Refresh failed with permanent error, invalidating session", {
              error: errorMessage,
            });
            token.error = "RefreshAccessTokenError";
            delete token.access_token;
            delete token.refresh_token;
            delete token.exp;
          } else {
            logAuth("error", "Refresh failed with temporary error, preserving token for retry", {
              error: errorMessage,
              status: ax.response?.status,
            });
            token.error = "RefreshAccessTokenError";
            // Don't delete tokens on temporary errors - allow retry
          }
          return token;
        }
      }

      // Periodic server-side user revalidation
      if (needsRevalidate(token._revalidateAt)) {
        token = await revalidateUser(token);
      }

      return token;
    },

    async session({ session, token }) {
      // Validate token has required fields
      if (!token.id || !token.email || !token.role) {
        logAuth("error", "Session callback: token missing required fields", {
          hasId: !!token.id,
          hasEmail: !!token.email,
          hasRole: !!token.role,
        });
      }

      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as Role,
        onboardingStatus: token.onboardingStatus,
        fullName: token.fullName,
        avatarUrl: token.avatarUrl,
      };
    
      (session as any).access_token = token.access_token;
      (session as any).error = token.error;
    
      // 🔑 Force session expiry to track JWT expiry (use normalized exp)
      if (token.exp) {
        const normalizedExp = normalizeExp(token.exp);
        if (normalizedExp) {
          session.expires = new Date(normalizedExp * 1000).toISOString();
        } else {
          logAuth("warn", "Session callback: invalid exp, setting default expiry");
          // Fallback: set expiry to 1 hour from now if exp is invalid
          session.expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        }
      } else {
        logAuth("warn", "Session callback: no exp in token, setting default expiry");
        session.expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      }

      if (token.error) {
        logAuth("warn", "Session has error", { error: token.error });
      }
    
      return session;
    },
  },
    

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout"
    // error: "/auth/error",
  },

  events: {
    // Optional: revoke refresh token on signOut
    async signOut({ token }) {
      const rt = token?.refresh_token as string | undefined;
      if (!rt) {
        logAuth("info", "Sign out: no refresh token to revoke");
        return;
      }
      try {
        logAuth("info", "Revoking refresh token on sign out");
        await api.post("/auth/logout", { refresh_token: rt });
        logAuth("info", "Refresh token revoked successfully");
      } catch (err) {
        const ax = err as AxiosError;
        logAuth("warn", "Failed to revoke refresh token on sign out (non-critical)", {
          status: ax.response?.status,
          error: ax.message,
        });
        // ignore; session is gone anyway
      }
    },
  },
};
