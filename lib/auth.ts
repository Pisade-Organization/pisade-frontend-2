import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // Magic Link
    CredentialsProvider({
      id: "magicLink",
      name: "Magic Link",
      credentials: { token: { label: "Token", type: "text" } },
      async authorize(credentials) {
        const res = await axios.get(`${process.env.BACKEND_URL}/auth/verify-magic-link`, {
          params: { token: credentials?.token },
        });
        return res.data;
      },
    }),

    // Google OAuth (backend redirect)
    CredentialsProvider({
      id: "google",
      name: "Google",
      credentials: { googleToken: { label: "Google Token", type: "text" } },
      async authorize(credentials) {
        const res = await axios.post(`${process.env.BACKEND_URL}/auth/google/callback`, {
          googleToken: credentials?.googleToken,
        });
        return res.data; // { access_token, refresh_token, user }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      // If login via Google
      if (account?.provider === "google") {
        const res = await axios.post(`${process.env.BACKEND_URL}/auth/google/callback`, {
          access_token: account.access_token,
        });
        const data = res.data;
        const decoded: any = jwtDecode(data.access_token);

        token.access_token = data.access_token;
        token.refresh_token = data.refresh_token;
        token.role = decoded.role;
        token.id = data.user.id;
        token.exp = decoded.exp;
        return token;
      }

      // Magic Link
      if (user && user.access_token) {
        const decoded: any = jwtDecode(user.access_token);
        return {
          ...token,
          id: user.user?.id ?? user.id,
          role: decoded.role,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          exp: decoded.exp,
        };
      }

      const now = dayjs().unix();
      if (token.exp && now < token.exp) return token;

      // Refresh
      const res = await axios.post(`${process.env.BACKEND_URL}/auth/refresh`, {
        refresh_token: token.refresh_token,
      });
      const data = res.data;
      const decoded: any = jwtDecode(data.access_token);
      token.access_token = data.access_token;
      token.refresh_token = data.refresh_token;
      token.exp = decoded.exp;
      return token;
    },

    async session({ session, token }: any) {
      session.user = { ...session.user, id: token.id, role: token.role };
      (session as any).access_token = token.access_token;
      (session as any).refresh_token = token.refresh_token;
      return session;
    },
  },
};
