import { addTrailNetwork, getLatestTrailNetworks, getTrailNetworkPage } from '$lib/server/api/trails';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validateUser()
    const getApprovedOnly = !session.user?.isAdmin;
    const latestNetworks = getLatestTrailNetworks(3, getApprovedOnly);
    const networksPerPage = 2;
    let currentPage = 1;
    const trailNetworkList = getTrailNetworkPage(networksPerPage, currentPage);
    return {
        latestNetworks,
        trailNetworkList
    }
}

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        if (body.name.length <= 2) return fail(400, { message: "Name must be greater than 2 characters." });

        try {
            const session = await locals.validateUser();
            if (!session?.user) throw redirect(302, "/login");

            if (!body.name) return fail(400, { message: 'Name is required' })
            const newTrail = await addTrailNetwork(body.name.toString(), session.user.userId)

            return {
                trail: newTrail,
                success: true
            }
        } catch (err) {
            const error = err as Error;
            if (error.message.includes("unique")) return fail(400, { message: 'System already exists!' })
            return {
                message: error.message
            }
        }

    }
};