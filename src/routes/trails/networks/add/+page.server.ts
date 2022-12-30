import { addTrailNetwork, getLatestTrailNetworks, getTrailNetworkPage } from '$lib/server/api/trails';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { TrailNetwork } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validateUser()
    const getApprovedOnly = !session.user?.isAdmin;
    console.log(getApprovedOnly);

    const latestNetworks = getLatestTrailNetworks(10, getApprovedOnly);
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
        let newTrail: TrailNetwork | null;
        try {
            const session = await locals.validateUser();
            if (!session?.user) throw redirect(302, "/login");

            if (!body.name) return fail(400, { message: 'Name is required' })
            newTrail = await addTrailNetwork(body.name.toString(), session.user.userId)
        } catch (err) {
            const error = err as Error;
            if (error.message.includes("unique")) return fail(400, { message: 'System already exists!' })
            return {
                message: error.message
            }
        }
        return {
            trail: newTrail,
            success: true
        }
    }
};