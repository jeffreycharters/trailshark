import { prisma } from "$lib/server/db"

export const getUserSubscriptions = async (userId: string) => {
    const subscriptions = await prisma.networkSubscription.findMany({
        where: {
            userId
        }
    })
    return subscriptions;
}

export const toggleSubscriptionStatus = async (userId: string, trailNetworkId: string) => {
    const subscription = await prisma.networkSubscription.findUnique({
        where: {
            userId_trailNetworkId: {
                userId, trailNetworkId
            }
        }
    })

    if (!subscription) {
        const newSubscription = await prisma.networkSubscription.create({
            data: {
                userId, trailNetworkId
            }
        })
        return true;
    } else {
        await prisma.networkSubscription.delete({
            where: {
                userId_trailNetworkId: {
                    userId, trailNetworkId
                }
            }
        });
        return false;
    }

}