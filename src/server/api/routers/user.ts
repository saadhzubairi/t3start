import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            // Check if the user has the ADMIN role
            if (ctx.session.user.role !== 'ADMIN' && ctx.session.user.role !== 'PREUSER') {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'You are not authorized to perform this action.',
                });
            }

            // If authorized, fetch all users from the database.
            // We use `select` to only return non-sensitive fields.
            const users = await ctx.db.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    active: true,
                    createdAt: true,
                    image: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return users;
        }),

    updatePreUserToUser: protectedProcedure
        .input(z.object({
            username: z.string().min(3).max(15),
            bio: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { username, bio } = input;
            const currentUserId = ctx.session.user.id;
            const currentUserRole = ctx.session.user.role;
            // Security check: Only allow users with the PREUSER role to call this.
            if (currentUserRole !== 'PREUSER') {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Only pre-users can perform this action.',
                });
            }
            // Update the user's role in the database
            const updatedUser = await ctx.db.user.update({
                where: {
                    id: currentUserId,
                },
                data: {
                    role: 'USER', // Directly setting the new role
                    username: username,
                    bio: bio
                },
            });

            return updatedUser;
        }),

    isUniqueUsername: publicProcedure
        .input(z.object({
            username: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const { username } = input;
            const user = await ctx.db.user.findUnique({
                where: {
                    username: username.toLowerCase()
                }
            })
            return user === null
        })
});