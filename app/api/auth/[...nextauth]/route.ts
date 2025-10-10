import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// 🔁 Helper function for refreshing token
async function refreshAccessToken(token: any) {
  try {
    const res = await axios.post("http://localhost:4000/auth/refresh", {
      refresh_token: token.refresh_token,
    });

    const data = res.data;

    // Decode new token to get expiry & role
    const decoded: any = jwtDecode(data.access_token);

    return {
      ...token,
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? token.refresh_token, // if backend doesn’t rotate
      role: decoded.role ?? token.role,
      exp: decoded.exp, // backend-provided expiry (UNIX)
    };
  } catch (error: any) {
    console.error("❌ Refresh token failed:", error.response?.data || error.message);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials: any) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        try {
          const res = await axios.post("http://localhost:4000/auth/local/signin", {
            email,
            password,
          });

          const data = res.data;
          const decoded: any = jwtDecode(data.access_token);

          console.log(decoded);

          return {
            id: decoded.sub || email,
            email,
            role: decoded.role || "STUDENT",
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            exp: decoded.exp, // expiry timestamp from backend JWT
          };
        } catch (err: any) {
          console.error("❌ Login error:", err.response?.data || err.message);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // 💡 Handles initial sign-in & token refresh
    async jwt({ token, user }) {
      // Initial login → attach tokens
      if (user) {
        token.id = (user as any).id; // ✅ add this line
        token.access_token = (user as any).access_token;
        token.refresh_token = (user as any).refresh_token;
        token.role = (user as any).role;
        token.exp = (user as any).exp;
        return token;
      }
      

      // Still valid → return as is
      const isExpired = dayjs().unix() > (token.exp ?? 0);
      if (!isExpired) {
        return token;
      }

      // Expired → refresh
      return await refreshAccessToken(token);
    },

    // 💡 Makes session available client-side
    async session({ session, token }) {
      // Move id and role under session.user
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
      };
    
      // Keep the tokens at top level
      (session as any).access_token = token.access_token;
      (session as any).refresh_token = token.refresh_token;
      (session as any).error = token.error;
    
      return session;
    }
    
  },
});

export const { GET, POST } = handlers;
