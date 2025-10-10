// lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// Helper to refresh token
async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post("http://localhost:4000/auth/refresh", {
      refresh_token: token.refresh_token,
    });
    const data = response.data;
    const decoded: any = jwtDecode(data.access_token);

    return {
      ...token,
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? token.refresh_token,
      role: decoded.role ?? token.role,
      exp: decoded.exp,
    };
  } catch (error: any) {
    console.error("Refresh token failed:", error.response?.data ?? error.message);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        const { email, password } = credentials;
        if (!email || !password) return null;

        try {
          const res = await axios.post("http://localhost:4000/auth/local/signin", {
            email,
            password,
          });
          const data = res.data;
          const decoded: any = jwtDecode(data.access_token);

          return {
            id: decoded.sub ?? email,
            email,
            role: decoded.role ?? "STUDENT",
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            exp: decoded.exp,
          };
        } catch (err: any) {
          console.error("Login error:", err.response?.data ?? err.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // On sign in, user is populated
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.access_token = (user as any).access_token;
        token.refresh_token = (user as any).refresh_token;
        token.exp = (user as any).exp;
        return token;
      }

      // Check expiration
      const now = dayjs().unix();
      if (token.exp && now < token.exp) {
        return token;
      }

      // Expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }: any) {
      // Put custom fields on session
      session.user = {
        ...session.user,
        id: typeof token.id === "string" ? token.id : String(token.id ?? ""),
      };
      (session as any).role = token.role;
      (session as any).access_token = token.access_token;
      (session as any).refresh_token = token.refresh_token;
      (session as any).error = token.error;
      return session;
    },

    // Optional: redirect logic on login / errors
    redirect: async ({ url, baseUrl }: any) => {
      // For example, redirect to login if error
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler };
