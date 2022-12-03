import { prisma } from '$lib/server/db'
import slugify from 'slugify';

export const addTrailSystem = async (name: string, userId: string) => {
    const newTrailSystem = await prisma.trailSystem.create({
        data: {
            name,
            userId,
            slug: slugify(name, { lower: true })
        }
    })
    return newTrailSystem;
}

export const getLatestTrailSystems = async (count: number) => {
    const latestTrails = await prisma.trailSystem.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: count
    })
    return latestTrails;
}