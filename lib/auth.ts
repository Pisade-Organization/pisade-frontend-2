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
    await api.get("/users/me", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
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

        token.access_token = access_token;            // exposed to client (session) OK
        token.refresh_token = refresh_token;          // SERVER ONLY (in JWT), not exposed to client
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
          // keep user props fresh if backend encodes them
          token.email = decoded.email ?? token.email;
          token.role = decoded.role ?? token.role;
          token.onboardingStatus = decoded.onboardingStatus ?? token.onboardingStatus;
        } catch (err) {
          const ax = err as AxiosError;
          token.error = "RefreshAccessTokenError";
          // don’t delete tokens yet; client will signOut on seeing the error
          return token;
        }
      }

      // Periodic server-side user revalidation to kill zombie sessions
      if (needsRevalidate(token._revalidateAt as number)) {
        token = await revalidateUser(token);
      }

      return token;
    },

    async session({ session, token }) {
      // Minimal data to client. DO NOT leak refresh_token.
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        role: token.role as Role,
        onboardingStatus: token.onboardingStatus as string | undefined,
      };
      (session as any).access_token = token.access_token;
      (session as any).error = token.error; // client can act (e.g., signOut) on this
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout"
    // error: "/auth/error", // optional: read ?error=
  },

  events: {
    // Optional: revoke refresh token on signOut (best effort)
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
