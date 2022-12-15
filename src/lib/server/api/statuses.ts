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

export const addTrailComment = async (comment: string, trailStateId: number) => {
    const newComment = await prisma.trailStatusComments.create({
        data: {
            comment, trailStateId
        }
    })
    return newComment;
}

export const getTrailComments = async () => {
    const comments = await prisma.trailStatusComments.findMany({
        orderBy: {
            trailStateId: "asc"
        },
        include: {
            state: true
        }
    })

    return comments;
}