import lucia from 'lucia-auth';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from "$app/environment";
import { prisma as prismaClient } from '$lib/server/db';

export const auth = lucia({
    adapter: prisma(prismaClient),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
        return {
            userId: userData.id,
            isAdmin: userData.isAdmin,
            username: userData.username
        }
    }
});

export type Auth = typeof auth;