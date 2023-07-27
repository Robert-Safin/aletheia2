import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
  status: "authenticated" | "unauthenticated" | "loading"
  data: {
    accessToken: string;
    expires: string;
    user: {
      id: string;
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          scope: "openid https://www.googleapis.com/auth/business.manage",
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
        accessToken: token.accessToken
      };
    },

    jwt: ({token, user, account, profile}) => {

      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl + '/'
    }
  },

};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
