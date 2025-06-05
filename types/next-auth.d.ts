// next-auth.d.ts or in a relevant .ts file included in your tsconfig
import { type DefaultSession } from "next-auth";
import { type ROLE } from "@prisma/client"; // Import your Prisma enum

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: ROLE; // Add your custom fields
      active: boolean;
      // any other fields you want on session.user
    } & DefaultSession["user"]; // Extend the default user fields (name, email, image)
  }

  // Optional: If you want to strongly type the `user` object passed to callbacks
  // This User type is what NextAuth.js internally uses and passes to callbacks.
  // The Prisma adapter typically populates this from your database model.
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    role: ROLE;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}