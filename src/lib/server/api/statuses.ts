import { prisma } from "$lib/server/db";


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

export const addNetworkStatus = async (userId: string, networkId: string, stateId: number, comment: string) => {
    const newStatus = await prisma.networkStatus.create({
        data: {
            userId,
            trailNetworkId: networkId,
            trailStateId: stateId,
            comments: comment ?? ""
        }
    })

    return newStatus;
}

export const getNetworkStatus = async (statusId: string) => {
    const networkStatus = await prisma.networkStatus.findUnique({
        where: {
            id: statusId
        },
        include: {
            network: true,
            author: true,
            state: true
        }
    })
    return networkStatus;
}