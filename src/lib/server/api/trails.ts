import { prisma } from '$lib/server/db'
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

export const getTrailSystemPage = async (perPage: number = 25, page: number = 1) => {
    const systems = await prisma.trailSystem.findMany({
        skip: (page - 1) * perPage,
        take: +perPage,
        orderBy: {
            name: "asc"
        }
    })

    return systems;
};

export const getAllTrailSystems = async (approvedOnly: boolean = true) => {
    const trailSystems = await prisma.trailSystem.findMany({
        where: {
            isApproved: approvedOnly ? true : undefined
        },
        orderBy: {
            slug: "desc"
        }
    })
    return trailSystems;
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

export interface TrailAddParams {
    name: string;
    trailSystemId: string;
    userId: string;
}

export const addTrail = async (params: TrailAddParams) => {
    const { name, trailSystemId, userId } = params
    const newTrail = await prisma.trail.create({
        data: {
            name, trailSystemId, userId
        }
    })
    if (!newTrail) throw new Error("Couldn't create new trail");

    return newTrail;
}