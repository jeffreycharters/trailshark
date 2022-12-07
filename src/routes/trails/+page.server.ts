import { addTrailNetwork, getAllTrailNetworks, getLatestTrailNetworks } from '$lib/server/api/trails';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = () => {
    const latestSystems = getLatestTrailNetworks(3);
    const trailNetworkList = getAllTrailNetworks();
    return {
        trailNetworkList,
        latestSystems
    }
}

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());


        try {
            const session = await locals.getSessionUser();
            if (!session?.user) throw redirect(302, "/login");

            if (!body.name) throw invalid(400, { message: 'Name is required' })
            const newTrail = await addTrailNetwork(body.name.toString(), session.user.userId)
            return {
                trail: newTrail,
                success: true
            }
        } catch (_) {
            return {
                message: 'Could not add new trail system'
            }
        }

    }
};