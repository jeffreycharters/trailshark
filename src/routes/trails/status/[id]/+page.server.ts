import { addTrailStatus, getNetworkStatus, getTrailComments, getTrailStatusesByNetworkId } from "$lib/server/api/statuses";
import { getTrailsFor } from "$lib/server/api/trails";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const statusId = params.id;
    const networkStatus = await getNetworkStatus(statusId);
    if (!networkStatus) throw redirect(302, '/trails/latest');
    const trailList = await getTrailsFor(networkStatus?.network.id);

    const comments = await getTrailComments();

    const existingTrailStatuses = await getTrailStatusesByNetworkId(statusId);

    const { user } = await locals.validateUser();
    const isAuthor = networkStatus?.author.id === user?.userId;


    return {
        networkStatus,
        isAuthor,
        trailList,
        comments,
        existingTrailStatuses
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const trail = data.get('trail')?.toString();
        const comment = data.get('comment')?.toString();
        const networkId = data.get('network-status-id')?.toString();

        if (!networkId) return fail(400, { trail, comment, message: "Couldn't find trail network ID" })
        if (!trail || !comment) return fail(400, { trail, comment, message: 'Missing trail or comment' })

        const newStatus = await addTrailStatus(networkId, trail, comment)

        if (!newStatus) return fail(400, { trail, comment, message: "Error creating status" })

        return {
            success: true,
            newStatus
        }

    }
}