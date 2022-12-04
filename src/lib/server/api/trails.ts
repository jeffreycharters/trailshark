import { prisma } from '$lib/server/db'
import { getUser } from '@lucia-auth/sveltekit/client';
import type { TrailSystem } from '@prisma/client';
import slugify from 'slugify';


export const addTrailSystem = async (name: string, userId: string): Promise<TrailSystem | null> => {
    if (name.length <= 2) throw new Error("Name too short");

    const newTrailSystem = await prisma.trailSystem.create({
        data: {
            name,
            userId,
            slug: slugify(name, { lower: true })
        }
    })

    return newTrailSystem;
}

export const getLatestTrailSystems = async (count: number, approvedOnly: boolean = true) => {
    const latestTrails = await prisma.trailSystem.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: count,
        where: approvedOnly ? { isApproved: true } : undefined
    })
    return latestTrails;
}

export const toggleTrailSystemApproval = async (isApproved: boolean, systems: string[]) => {
    const updateCount = await prisma.trailSystem.updateMany({
        where: {
            id: { in: systems }
        },
        data: {
            isApproved,
            updatedAt: new Date()
        }
    });
    return updateCount;
}