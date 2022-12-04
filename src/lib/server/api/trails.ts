import { prisma } from '$lib/server/db'
import type { TrailSystem } from '@prisma/client';
import slugify from 'slugify';


export const addTrailSystem = async (name: string, userId: string): Promise<TrailSystem | null> => {
    if (name.length <= 2) return null;

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

export const toggleTrailSystemApproval = async (system: TrailSystem) => {
    const updatedTrail = await prisma.trailSystem.update({
        where: {
            id: system.id
        },
        data: {
            isApproved: !system.isApproved,
            updatedAt: new Date()
        }
    });
    return updatedTrail;
}