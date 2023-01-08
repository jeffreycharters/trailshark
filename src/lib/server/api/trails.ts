import { prisma } from '$lib/server/db'
import slugify from 'slugify';


export const addTrailNetwork = async (name: string, userId: string) => {
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

export const getUnusedNetworks = async () => {
    const emptyNetworks = await prisma.trailNetwork.findMany({
        where: {
            trails: { none: {} },
            statuses: {
                none: {}
            },
            NetworkSubscription: {
                none: {}
            }
        }
    })
    return emptyNetworks;
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

export const removeTrailNetworkById = async (networkId: string) => {
    await prisma.trailNetwork.update({
        where: {
            id: networkId,
        },
        data: {
            userId: undefined
        }
    });
    const deletedNetwork = await prisma.trailNetwork.delete({
        where: {
            id: networkId
        }
    })
    return deletedNetwork;
}

export const toggleTrailNetworkApproval = async (isApproved: boolean, network: string) => {
    const updatedNetwork = await prisma.trailNetwork.update({
        where: {
            id: network
        },
        data: {
            isApproved,
        }
    });
    return updatedNetwork;
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

export const getTrailsFor = async (trailNetworkId: string, approvedOnly: boolean = true) => {
    const trails = await prisma.trail.findMany({
        where: {
            trailNetworkId,
            isApproved: approvedOnly ?? undefined
        },
        orderBy: {
            name: "asc"
        }
    });
    return trails.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
}

export const getUnapprovedTrails = async () => {
    const unapprovedTrails = await prisma.trail.findMany({
        where: {
            isApproved: false
        },
        orderBy: [{
            trailNetwork: {
                slug: "asc"
            }
        },
        { name: "asc" }
        ],
        include: {
            trailNetwork: true
        }
    });

    return unapprovedTrails;
}



export const toggleTrailApproval = async (isApproved: boolean, trail: string) => {
    const updatedTrail = await prisma.trail.update({
        where: {
            id: trail
        },
        data: {
            isApproved,
        }
    });
    return updatedTrail;
}