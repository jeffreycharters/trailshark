import { prisma } from "$lib/server/db";

interface TrailStatus {
    trailId: string;
    comment: string;
    state: number;
}

interface TrailNetworkStatus {
    trailNetworkId: string;
    state: number;
    comments: string;
    userId: string;
    trailStatuses: TrailStatus[];
}

export const createTrailNetworkStatus = {}

export const addTrailState = async (description: string, textColor: string) => {
    const newState = await prisma.trailState.create({
        data: {
            description,
            textColor
        }
    });

    return newState;
}

export const getTrailStates = async () => {
    const states = await prisma.trailState.findMany({
        orderBy: {
            id: "asc"
        }
    })
    return states;
}