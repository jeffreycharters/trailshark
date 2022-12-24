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

export const getTrailStatusesById = async (networkStatusId: string) => {
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

export const getLatestStatusesForUser = async (userId: string) => {
    const latestStatuses = await prisma.networkStatus.findMany({
        include: {
            network: true,
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
        },
        orderBy: {
            updatedAt: "desc"
        },
        distinct: ["trailNetworkId"]
    });
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