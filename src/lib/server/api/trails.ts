import { prisma } from '$lib/server/db'
import type { TrailNetwork } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import slugify from 'slugify';


export const addTrailNetwork = async (name: string, userId: string) => {
    if (name.length <= 2) return fail(400, { mesage: "Name too short" });

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
    const networks = await prisma.trailNetwork.findMany({
        skip: (page - 1) * perPage,
        take: +perPage,
        orderBy: {
            name: "asc"
        }
    })

    return networks;
};

export const getAllTrailNetworks = async (approvedOnly: boolean = true) => {
    const trailNetworks = await prisma.trailNetwork.findMany({
        where: {
            isApproved: approvedOnly ? true : undefined
        },
        orderBy: {
            slug: "asc"
        }
    })
    return trailNetworks;
}

export const toggleTrailNetworkApproval = async (isApproved: boolean, networks: string[]) => {
    const updateCount = await prisma.trailNetwork.updateMany({
        where: {
            id: { in: networks }
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
    try {

        const newTrail = await prisma.trail.create({
            data: {
                name, trailNetworkId, userId
            }
        })
        return newTrail;
    } catch (err) {
        const error = err as Error;
        if (error.message.includes("Unique")) {
            throw new Error("alreadyExists")
        }
        throw new Error("Couldn't create new trail");
    }

}