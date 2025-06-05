/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Correct import
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider
import { supabase } from "~/lib/supabase"; // Import GoogleProvider

import { db } from "~/server/db";
import { ROLE } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Already here, good
      role: ROLE;
      active: boolean;
      createdAt: Date; // Prisma schema has DateTime, which is Date in JS/TS
      updatedAt: Date; // Prisma schema has DateTime
      emailVerified?: Date | null; // Add if you need it on the session user
    } & DefaultSession["user"]; // DefaultSession["user"] provides name, email, image
  }
}

export const authConfig = {
  debug: true,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials", // This is the ID you'll use in signIn('credentials', ...)
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null if credentials are missing
        }

        // Use Supabase to sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error) {
          console.error("Supabase sign-in error:", error.message);
          return null;
        }

        if (data.user) {
          // IMPORTANT: If you want to use the PrismaAdapter,
          // you need to ensure the user exists in your Prisma database.
          // The PrismaAdapter will try to find/create the user and account.
          // NextAuth.js usually handles syncing for OAuth, but for Credentials,
          // you might need to manually ensure the User record exists if it's
          // purely a Supabase Auth user.

          // If you *just* signed up via Supabase's direct signup,
          // the user might not yet exist in your Prisma `User` table.
          // Here's where you'd bridge that gap.
          // Example: Fetch or create the user in your Prisma DB
          // This allows NextAuth.js to link the session to a Prisma User ID.

          // A robust way to handle this is to query your Prisma DB:
          let userInPrisma = await db.user.findUnique({
            where: { email: data.user.email },
          });

          if (!userInPrisma) {
            // If user doesn't exist in Prisma, create them.
            // This happens if they signed up via Supabase's direct email/password and haven't used OAuth.
            userInPrisma = await db.user.create({
              data: {
                email: data.user.email!,
                name: data.user.email?.split('@')[0], // Simple default name
                emailVerified: data.user.email_confirmed_at ? new Date(data.user.email_confirmed_at) : null,
                image: data.user.user_metadata?.avatar_url ?? null, // If Supabase stores profile image
              },
            });
            // Also create an Account entry for this credentials login if you want to track it like an OAuth account
            // This is optional for CredentialsProvider but good for consistency with Prisma Adapter.
            await db.account.create({
              data: {
                userId: userInPrisma.id,
                type: "credentials", // Important for identifying this account type
                provider: "email-password", // Or a custom string like "supabase-credentials"
                providerAccountId: data.user.id, // Supabase user ID as providerAccountId
              },
            });
          }

          // Return the user object. NextAuth.js expects at least 'id' and 'email'.
          return {
            id: userInPrisma.id, // Use the ID from your Prisma user
            email: userInPrisma.email,
            name: userInPrisma.name,
            image: userInPrisma.image,
          };
        }

        return null; // Return null if authentication fails
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    /* jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.active = user.active;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    }, */
    /* session({ session, token }) {
      session.user.role = token.role;
      return session;
    }, */
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    redirect({ url, baseUrl }) {
      const targetUrl = new URL(url, baseUrl);
      if (targetUrl.pathname === '/login' && targetUrl.searchParams.has('error')) {
        return url;
      }
      return `/`;
    },
    async signIn({ user, account, profile }) {
      /* console.log("==================================", user, account, profile); */
      if (account?.provider === "google" || account?.provider === "discord") {
        if (profile?.email_verified === null) {
          await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
    error: "/login",
  },
} satisfies NextAuthConfig;