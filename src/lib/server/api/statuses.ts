import { prisma } from "$lib/server/db";
import type { NetworkStatus } from "@prisma/client";


export const addTrailState = async (description: string, textColour: string) => {
    const newState = await prisma.trailState.create({
        data: {
            description,
            textColour
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
    const newComment = await prisma.trailStatusComment.create({
        data: {
            comment, trailStateId
        }
    })
    return newComment;
}

export const getTrailComments = async () => {
    const comments = await prisma.trailStatusComment.findMany({
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

export const getTrailStatusesByNetworkId = async (networkStatusId: string) => {
    const trailStatuses = await prisma.trailStatus.findMany({
        where: {
            networkStatusId
        },
        include: {
            trail: true,
            comment: {
                include: {
                    state: true
                }
            }
        }
    })

    const sortedTrailStatuses = trailStatuses.sort((a, b) => {
        return a.trail.name < b.trail.name ? -1 : 1;
    })

    return sortedTrailStatuses;
}

export const addTrailStatus = async (networkStatusId: string, trailId: string, commentId: string) => {
    const newStatus = await prisma.trailStatus.create({
        data: {
            networkStatusId,
            trailId,
            trailStatusCommentId: commentId,
        },
        include: {
            trail: true,
            comment: {
                include: {
                    state: true,
                }
            }
        }
    })

    return newStatus;
}

const completeStatusOptions = {
    network: true,
    author: true,
    trailStatuses: {
        include: {
            trail: true,
            comment: {
                include: {
                    state: true
                }
            }
        }
    },
    state: true
}

export const getLatestStatusesForUser = async (userId: string) => {
    const userSubscriptions = await prisma.networkSubscription.findMany({
        where: {
            userId
        }
    })

    let subscribedTrails: string[] = [];
    if (userSubscriptions.length > 0) {
        userSubscriptions.forEach(s => {
            subscribedTrails.push(s.trailNetworkId);
        });
    }
    let latestStatuses = await prisma.networkStatus.findMany({
        where: subscribedTrails.length > 0 ? {
            trailNetworkId: {
                in: subscribedTrails
            }
        } : undefined,
        include: completeStatusOptions,
        orderBy: {
            updatedAt: "desc"
        },
        distinct: ["trailNetworkId"]
    });

    latestStatuses.forEach(s => {
        if (s.trailStatuses.length > 0) {
            s.trailStatuses.sort((a, b) => a.comment.state.id < b.comment.state.id ? -1 : 1)
        }
    })

    return latestStatuses;
}

export const getStatusCountsPerNetwork = async () => {
    const statusCounts = await prisma.networkStatus.groupBy({
        by: ["trailNetworkId"],
        _count: {
            trailNetworkId: true,
        }
    })
    return statusCounts
}

export const getLatestNetworkStatuses = async () => {
    const latestUpdates = await prisma.networkStatus.findMany({
        orderBy: {
            updatedAt: "desc",
        },
        take: 15,
        include: completeStatusOptions,
        distinct: ["trailNetworkId"]
    })
    return latestUpdates;
}