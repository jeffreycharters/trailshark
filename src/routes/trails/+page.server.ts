import { addTrail, getAllTrailNetworks } from '$lib/server/api/trails';
import type { Trail } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
    const trailNetworkList = await getAllTrailNetworks();
    const trailNamesAndIds = trailNetworkList.map(n => {
        return {
            name: n.name,
            id: n.id
        }
    });

    return {
        trailNetworkList: trailNamesAndIds
    }
}

export const actions: Actions = {
    default: async ({ locals, request }) => {

        const body = Object.fromEntries(await request.formData());
        let newTrail: Trail;
        try {
            const session = await locals.getSessionUser();
            if (!session?.user) throw redirect(302, "/login");

            if (!body.name) return fail(400, { message: 'Name is required' })

            const newTrailObj = {
                name: body.name.toString(),
                trailNetworkId: body.network.toString(),
                userId: session.user.userId,
            }
            newTrail = await addTrail(newTrailObj);

        } catch (err) {
            const error = err as Error;
            if (error.message === "alreadyExists") {
                return {
                    message: 'Trail already exists on this network.'
                }
            }
            return {
                message: 'Could not add new trail network'
            }
        }

        throw redirect(303, "/trails/latest/");
    }
};