import { getUnusedNetworks, removeTrailNetworkById } from '$lib/server/api/trails';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    const unusedNetworks = getUnusedNetworks();
    return {
        title: "Remove Trail Networks",
        unusedNetworks
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const networkId = data.get('network-id');
        if (!networkId || typeof networkId != 'string') return { success: false }
        const deletedNetwork = await removeTrailNetworkById(networkId);
        return {
            success: true,
            deletedNetwork
        }
    }
}