import { addNetworkStatus, getTrailComments, getTrailStates } from "$lib/server/api/statuses";
import { getAllTrailNetworks } from "$lib/server/api/trails";
import type { NetworkStatus } from "@prisma/client";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = () => {
    const allNetworks = getAllTrailNetworks();
    const trailStates = getTrailStates();
    const trailComments = getTrailComments();
    return {
        trailNetworks: allNetworks,
        trailStates,
        trailComments
    }
}


export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const body = Object.fromEntries(data);

        let { network, comment } = body;
        let state = parseInt(body.state.toString());

        const basicReturn = {
            network, state, comment
        }

        if (!network || !state) return fail(400, { ...basicReturn, message: 'Required field is missing!' });
        if (Number.isNaN(state)) return fail(400, { ...basicReturn, message: 'Error determining state' });

        const { user } = await locals.validateUser()

        let newNetworkStatus: NetworkStatus;
        try {
            newNetworkStatus = await addNetworkStatus(user.userId, network.toString(), state, comment.toString());
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            return fail(400, { ...basicReturn, message: 'Unknown error' })

        }
        throw redirect(302, `/trails/status/${newNetworkStatus.id}/`);
    }
}
