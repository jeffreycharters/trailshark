import { getStatusCountsPerNetwork } from '$lib/server/api/statuses';
import { getAllTrailNetworks } from '$lib/server/api/trails';
import type { TrailNetwork } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { getUserSubscriptions, toggleSubscriptionStatus } from '$lib/server/api/subscriptions';
import { redirect, type Actions, fail } from '@sveltejs/kit';

interface statusCountAndSubsrciption {
    statusCount?: number;
    subscribed?: boolean;
}

export const load = (async ({ locals }) => {
    const trailNetworkList: (TrailNetwork & statusCountAndSubsrciption)[] | undefined = await getAllTrailNetworks();
    const statusCounts = await getStatusCountsPerNetwork();

    statusCounts.forEach(s => {
        const currentNetwork = trailNetworkList.find(n => n.id === s.trailNetworkId);
        if (currentNetwork) currentNetwork.statusCount = s._count.trailNetworkId
    })

    const { user } = await locals.validateUser();
    if (!user) throw redirect(302, 'login');

    const subscriptions = await getUserSubscriptions(user.userId);
    subscriptions.forEach(s => {
        const currentNetwork = trailNetworkList.find(n => n.id === s.trailNetworkId);
        if (currentNetwork) currentNetwork.subscribed = true;
    })

    return {
        trailNetworkList
    };
}) satisfies PageServerLoad;

export const actions = ({
    default: async ({ request, locals }) => {
        const data = await request.formData();

        const networkId = data.get('network-id');
        const subscribeString = data.get('subscribe');

        let subscribe: boolean | undefined;
        if (subscribeString === 'true') subscribe = true;
        if (subscribeString === 'false') subscribe = false;
        if (subscribe === undefined) return { message: 'Error saving' }

        const { user } = await locals.validateUser();
        if (!user) throw redirect(302, 'login')
        if (!networkId) throw fail(400, { message: 'Error subscribing to network' });

        await toggleSubscriptionStatus(user?.userId, networkId.toString())

    }
}) satisfies Actions;