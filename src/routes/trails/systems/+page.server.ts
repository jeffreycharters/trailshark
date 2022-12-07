import { addTrailNetwork, getLatestTrailNetworks, getTrailNetworkPage } from '$lib/server/api/trails';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSessionUser()
    const getApprovedOnly = !session.user?.isAdmin;
    const latestSystems = getLatestTrailNetworks(3, getApprovedOnly);
    const systemsPerPage = 2;
    let currentPage = 1;
    const trailNetworkList = getTrailNetworkPage(systemsPerPage, currentPage);
    return {
        latestSystems,
        trailNetworkList
    }
}

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        if (body.name.length <= 2) return invalid(400, { message: "Name must be greater than 2 characters." });

        try {
            const session = await locals.getSessionUser();
            if (!session?.user) throw redirect(302, "/login");

            if (!body.name) return invalid(400, { message: 'Name is required' })
            const newTrail = await addTrailNetwork(body.name.toString(), session.user.userId)

            return {
                trail: newTrail,
                success: true
            }
        } catch (err) {
            const error = err as Error;
            if (error.message.includes("unique")) return ({ message: 'System already exists!' })
            return {
                message: error.message
            }
        }

    }
};