import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Resend from "next-auth/providers/resend";

interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    plan: string;
    phone?: string;
  }

const prisma = new PrismaClient()
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    debug: true,
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    providers: [
      Resend({
        from: process.env.RESEND_FROM,
      }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    pages: {
    },
    callbacks: {
        async jwt({ user, token }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
        async session({ session, token }: any) {
          if (token.user) {
            const user: User = {
              id: token.user.id,
              email: token.user.email,
              name: token.user.name,
              image: token.user.image,
              plan: token.user.plan,
              phone: token.user.phone,
            };
            session.user = user;
          }
          return session;
        },
    },
});