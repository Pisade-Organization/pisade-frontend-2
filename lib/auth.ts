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

// --------- Refresh stampede gate ----------
let refreshPromise: Promise<BackendAuthResponse> | null = null;
async function refreshTokenOnce(refresh_token: string) {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { data } = await api.post<BackendAuthResponse>("/auth/refresh", { refresh_token });
      return data;
    })().finally(() => (refreshPromise = null));
  }
  return refreshPromise;
}

// --------- Early refresh + revalidation ----------
const SKEW = 90; // refresh 90s before exp
const REVALIDATE_EVERY = 60; // re-check user existence every 60s

function shouldRefresh(exp?: number) {
  if (!exp) return true;
  const now = dayjs().unix();
  return now >= exp - SKEW;
}
function needsRevalidate(nextAt?: number) {
  const now = dayjs().unix();
  return !nextAt || now >= nextAt;
}

async function revalidateUser(token: any) {
  try {
    if (!token?.access_token) throw new Error("no access token");
    const { data } = await api.get<BackendUser>("/profile/me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });

    // ✅ overwrite profile fields so frontend always sees latest info
    token.email = data.email ?? token.email;
    token.role = data.role ?? token.role;
    token.onboardingStatus = data.onboardingStatus ?? token.onboardingStatus;
    token.fullName = data.fullName ?? token.fullName;
    token.avatarUrl = data.avatarUrl ?? token.avatarUrl;

    token._revalidateAt = dayjs().add(REVALIDATE_EVERY, "second").unix();
    return token;
  } catch {
    // user deleted / disabled / token invalid → tear down
    token.error = "UserDeletedOrInvalid";
    delete token.access_token;
    delete token.refresh_token;
    delete token.exp;
    return token;
  }
}

// --------- Providers (backend owns auth) ----------
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: "magicLink",
      name: "Magic Link",
      credentials: { token: { label: "Token", type: "text" } },
      async authorize(credentials) {
        const token = credentials?.token?.trim();
        if (!token) return null;
        try {
          const { data } = await api.get<BackendAuthResponse>("/auth/verify-magic-link", {
            params: { token },
          });
          if (!data?.access_token || !data?.refresh_token || !data?.user) return null;
          return { ...data.user, _access_token: data.access_token, _refresh_token: data.refresh_token } as any;
        } catch {
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
        if (!googleToken) return null;
        try {
          const { data } = await api.post<BackendAuthResponse>("/auth/google/callback", { googleToken });
          if (!data?.access_token || !data?.refresh_token || !data?.user) return null;
          return { ...data.user, _access_token: data.access_token, _refresh_token: data.refresh_token } as any;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in from either credentials provider
      if (user && (user as any)._access_token) {
        const access_token = (user as any)._access_token as string;
        const refresh_token = (user as any)._refresh_token as string;
        const decoded = jwtDecode<Decoded>(access_token);

        token.id = (user as any).id ?? decoded.sub;
        token.email = (user as any).email ?? decoded.email;
        token.role = (user as any).role ?? decoded.role;
        token.onboardingStatus = (user as any).onboardingStatus ?? decoded.onboardingStatus;
        token.fullName = (user as any).fullName;
        token.avatarUrl = (user as any).avatarUrl;

        token.access_token = access_token;
        token.refresh_token = refresh_token;
        token.exp = decoded.exp;
        token.error = undefined;
        token._revalidateAt = dayjs().add(REVALIDATE_EVERY, "second").unix();
        return token;
      }

      // Early refresh if close to expiry
      if (shouldRefresh(token.exp as number) && token.refresh_token) {
        try {
          const data = await refreshTokenOnce(token.refresh_token as string);
          const decoded = jwtDecode<Decoded>(data.access_token);

          token.access_token = data.access_token;
          token.refresh_token = data.refresh_token;
          token.exp = decoded.exp;
          token.error = undefined;

          // ✅ hydrate profile fields from backend refresh response
          token.email = data.user.email ?? token.email;
          token.role = data.user.role ?? token.role;
          token.onboardingStatus = data.user.onboardingStatus ?? token.onboardingStatus;
          token.fullName = data.user.fullName ?? token.fullName;
          token.avatarUrl = data.user.avatarUrl ?? token.avatarUrl;
        } catch (err) {
          const ax = err as AxiosError;
          console.error("[JWT Refresh Error]", ax.response?.data || ax.message);
          token.error = "RefreshAccessTokenError";
          return token;
        }
      }

      // Periodic server-side user revalidation
      if (needsRevalidate(token._revalidateAt as number)) {
        token = await revalidateUser(token);
      }

      return token;
    },

    async session({ session, token }) {
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
    
      // 🔑 Force session expiry to track JWT expiry
      if (token.exp) {
        session.expires = new Date(token.exp * 1000).toISOString();
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
      if (!rt) return;
      try {
        await api.post("/auth/logout", { refresh_token: rt });
      } catch {
        // ignore; session is gone anyway
      }
    },
  },
};
