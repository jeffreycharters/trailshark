import { prisma } from '$lib/server/db'
import type { TrailNetwork } from '@prisma/client';
import { invalid } from '@sveltejs/kit';
import slugify from 'slugify';


export const addTrailNetwork = async (name: string, userId: string) => {
    if (name.length <= 2) return invalid(400, { mesage: "Name too short" });

    const newTrailNetwork = await prisma.trailNetwork.create({
        data: {
            name,
            userId,
            slug: slugify(name, { lower: true })
        }
    })


    return newTrailNetwork;
}

export const getLatestTrailNetworks = async (count: number, approvedOnly: boolean = true) => {
    const latestTrails = await prisma.trailNetwork.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: count,
        where: approvedOnly ? { isApproved: true } : undefined
    })
    return latestTrails;
}

export const getTrailNetworkPage = async (perPage: number = 25, page: number = 1) => {
    const systems = await prisma.trailNetwork.findMany({
        skip: (page - 1) * perPage,
        take: +perPage,
        orderBy: {
            name: "asc"
        }
    })

    return systems;
};

export const getAllTrailNetworks = async (approvedOnly: boolean = true) => {
    const trailNetworks = await prisma.trailNetwork.findMany({
        where: {
            isApproved: approvedOnly ? true : undefined
        },
        orderBy: {
            slug: "desc"
        }
    })
    return trailNetworks;
}

export const toggleTrailNetworkApproval = async (isApproved: boolean, systems: string[]) => {
    const updateCount = await prisma.trailNetwork.updateMany({
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
    trailNetworkId: string;
    userId: string;
}

export const addTrail = async (params: TrailAddParams) => {
    const { name, trailNetworkId, userId } = params
    const newTrail = await prisma.trail.create({
        data: {
            name, trailNetworkId, userId
        }
    })
    if (!newTrail) throw new Error("Couldn't create new trail");

    return newTrail;
}